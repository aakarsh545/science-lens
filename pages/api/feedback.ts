import { createClient } from '@supabase/supabase-js';

// Use broader types for request/response in this server route. The project ships
// light Next types in src/types/shims.d.ts for editor support. Keep local any to
// avoid forcing installation of full next types in the dev container.
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messageId, helpful } = req.body ?? {};

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRole) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const sb = createClient(supabaseUrl, supabaseServiceRole);
  try {
    await sb.from('feedback').insert([{ message_id: messageId ?? null, helpful: Boolean(helpful), created_at: new Date().toISOString() }]);
    return res.status(200).json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: msg });
  }
}
