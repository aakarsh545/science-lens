#!/usr/bin/env node
/**
 * Lightweight dev server to expose /api/openai/ask for Vite local development.
 * Mirrors the Next.js API handler behavior in pages/api/openai/ask.ts
 *
 * Usage:
 *   DEV_API_PORT=8787 OPENAI_API_KEY=sk... node server/dev-server.js
 */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const PORT = process.env.DEV_API_PORT ? Number(process.env.DEV_API_PORT) : 8787;

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

// Simple in-memory rate limiter per IP (development only)
const RATE_LIMIT_WINDOW_MS = 60_000; // 60s
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRequestLog = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const entry = ipRequestLog.get(ip) || { count: 0, windowStart: now };
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }
  entry.count += 1;
  ipRequestLog.set(ip, entry);
  return entry.count <= MAX_REQUESTS_PER_WINDOW;
}

function sanitize(input) {
  if (!input) return '';
  return String(input).replace(/<[^>]*>/g, '').trim();
}

app.get('/health', (req, res) => res.json({ ok: true, env: { hasOpenAI: !!process.env.OPENAI_API_KEY } }));

app.post('/api/openai/ask', async (req, res) => {
  try {
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Expected application/json' });
    }

    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
    if (!rateLimit(ip)) {
      return res.status(429).json({ error: 'Too many requests' });
    }

  const { question, difficulty } = req.body || {};
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Missing question string in body' });
    }

    const promptBase = sanitize(question).slice(0, 2000);
    let difficultyPrompt = '';
    if (typeof difficulty === 'string') {
      switch (difficulty) {
        case 'child': difficultyPrompt = "Explain this in very simple terms that a 5-year-old would understand. Use fun analogies and simple words."; break;
        case 'teen': difficultyPrompt = "Explain this at a high school level with clear language and examples."; break;
        case 'expert': difficultyPrompt = "Provide a detailed, technical explanation suitable for an expert, include formulas and precise terminology."; break;
        default: difficultyPrompt = '';
      }
    }
    const prompt = difficultyPrompt ? `${difficultyPrompt}\n\n${promptBase}` : promptBase;

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' });
    }

    const client = new OpenAI({ apiKey: openaiKey });

    const chatReq = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are Science Lens, a helpful assistant that provides clear, step-by-step scientific explanations.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 700,
      temperature: 0.7,
    };

    const completion = await client.chat.completions.create(chatReq);
    const reply = completion?.choices?.[0]?.message?.content || completion?.choices?.[0]?.text || '';

    return res.json({ reply });
  } catch (err) {
    console.error('dev-server /api/openai/ask error:', err);
    return res.status(500).json({ error: (err && err.message) || 'unknown' });
  }
});

app.listen(PORT, () => {
  console.log(`Dev API server listening on http://localhost:${PORT}`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Warning: OPENAI_API_KEY not set — /api/openai/ask will return 500 until it is configured.');
  }
});
