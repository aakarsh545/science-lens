#!/usr/bin/env node
/* Quick script to test OPENAI_API_KEY from environment locally.
   Usage: OPENAI_API_KEY=sk... node scripts/test-openai.js "What is 2+2?"
*/
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
async function main() {
  if (!apiKey) {
    console.error('OPENAI_API_KEY not set');
    process.exit(2);
  }
  const openai = new OpenAI({ apiKey });
  const question = process.argv[2] || 'Say hello in one line.';
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: question }],
      max_tokens: 200,
    });
    const reply = completion?.choices?.[0]?.message?.content || completion?.choices?.[0]?.text;
    console.log('reply:', reply);
  } catch (e) {
    console.error('OpenAI error:', e?.message || e);
    process.exit(1);
  }
}

main();
