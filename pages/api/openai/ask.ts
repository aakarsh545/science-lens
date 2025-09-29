import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// NOTE: sanitize is implemented in src/utils/sanitize.ts. Import relatively.
import { sanitize } from '../../../src/utils/sanitize';

// Simple in-memory rate limiter per IP. Works for a single server process.
// For serverless or multi-instance deployments replace with Redis or other shared store.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;
const rateMap = new Map<string, { count: number; firstTs: number }>();

async function tryLogToSupabase(payload: { ip?: string; questionPreview?: string }) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRole) return;
  try {
    // import at runtime to avoid hard dependency failures in environments without the package
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    await supabase.from('security_logs').insert([
      {
        user_id: null,
        action: 'openai.ask',
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (e) {
    // don't block the request on logging failures
    // eslint-disable-next-line no-console
    console.warn('Supabase logging failed', e?.message || e);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic content-type and body checks
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(400).json({ error: 'Expected application/json' });
  }

  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  // Rate limiting per IP
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, firstTs: now };
  if (now - entry.firstTs > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.firstTs = now;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  let question: unknown = null;
  try {
    question = req.body?.question;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Missing or invalid `question` string' });
  }

  // enforce max length
  if (question.length > 4000) {
    return res.status(400).json({ error: 'Question too long' });
  }

  const cleaned = sanitize(question).slice(0, 4000);

  // Create OpenAI client using server-side env var. Do NOT commit keys to repo.
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    // Write log to Supabase (best-effort, non-blocking)
    void tryLogToSupabase({ ip, questionPreview: cleaned.slice(0, 200) });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: cleaned }],
      max_tokens: 800,
    });

    // Attempt to read reply from known shapes
    const reply =
      // OpenAI's chat response
      (completion as any)?.choices?.[0]?.message?.content ||
      // fallback to text
      (completion as any)?.choices?.[0]?.text ||
      '';

    return res.status(200).json({ reply });
  } catch (err: any) {
    // Log error server-side and return generic message
    // eslint-disable-next-line no-console
    console.error('OpenAI request failed', err?.message || err);
    return res.status(502).json({ error: 'AI service error' });
  }
}
