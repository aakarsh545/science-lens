import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      console.error('No prompt provided');
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    // Check if user is authenticated (optional for public chat)
    const authHeader = req.headers.get('Authorization');
    let authenticatedUserId: string | null = null;
    
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
        
        if (!authError && user) {
          authenticatedUserId = user.id;
          console.log('Authenticated user:', authenticatedUserId);
        }
      } catch (e) {
        console.log('Auth check failed, treating as anonymous:', e);
      }
    }

    if (!authenticatedUserId) {
      console.log('Anonymous user - will skip database logging for privacy');
    }

    // Get Lovable AI API key
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      console.error('Lovable AI API key not found');
      return new Response(JSON.stringify({ error: 'Lovable AI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call Lovable AI (Google Gemini)
    console.log('Calling Lovable AI with model: google/gemini-2.5-flash');
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: `You are Science Lens AI, a friendly and enthusiastic science companion who helps people explore and understand the world around them.

Your personality:
- Talk naturally, like a supportive friend who's excited about science
- Use everyday language and relatable examples
- Show genuine enthusiasm with phrases like "That's a great question!" or "Here's the fascinating part..."
- Be warm, encouraging, and supportive
- Keep explanations clear but conversational
- Use analogies and real-world connections
- Avoid being too formal or textbook-like

Your responses should:
- Start with a friendly acknowledgment
- Break down complex ideas into digestible pieces
- Use concrete examples from daily life
- Encourage curiosity and follow-up questions
- Be concise but thorough (aim for 3-5 paragraphs)
- Add personality without being unprofessional

Remember: You're not just answering questions – you're making science exciting and accessible!` 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
      }),
    });

    console.log('Lovable AI response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lovable AI error status:', response.status, 'data:', errorData);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: 'Failed to get AI response' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Only log to database if user is authenticated (for privacy and security)
    if (authenticatedUserId) {
      console.log('Logging to database for authenticated user');
      const { error: logError } = await supabaseClient
        .from('ai_logs')
        .insert({
          prompt: prompt,
          response: aiResponse,
          user_id: authenticatedUserId
        });

      if (logError) {
        console.error('Database logging error:', logError);
        // Continue anyway - don't fail the request just because logging failed
      }
    }

    return new Response(JSON.stringify({ 
      response: aiResponse
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ask function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});