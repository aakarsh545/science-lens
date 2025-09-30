import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

interface InlineFeedbackProps {
  messageId?: string;
}

const InlineFeedback = ({ messageId }: InlineFeedbackProps) => {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const { toast } = useToast();

  const sendFeedback = async (helpful: boolean) => {
    setIsHelpful(helpful);
    try {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL || window.__SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || window.__SUPABASE_SERVICE_ROLE_KEY;
      if (!supabaseUrl || !supabaseKey) {
        // Try client-side anon insert via function
        await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messageId, helpful }) });
      } else {
        const sb = createClient(supabaseUrl, supabaseKey);
        await sb.from('feedback').insert([{ message_id: messageId, helpful }]);
      }
      toast({ title: 'Thanks for the feedback!' });
    } catch (e) {
      console.error('Feedback send failed', ((e as unknown) as Error)?.message || e);
      toast({ title: 'Feedback failed', variant: 'destructive' });
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <button className={`px-2 py-1 rounded ${isHelpful === true ? 'bg-green-100' : 'bg-gray-100'}`} onClick={() => sendFeedback(true)}>Helpful</button>
      <button className={`px-2 py-1 rounded ${isHelpful === false ? 'bg-red-100' : 'bg-gray-100'}`} onClick={() => sendFeedback(false)}>Not Helpful</button>
    </div>
  );
};

export default InlineFeedback;
