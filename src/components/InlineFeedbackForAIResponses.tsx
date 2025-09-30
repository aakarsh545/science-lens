import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface InlineFeedbackProps {
  messageId?: string;
}

const InlineFeedback = ({ messageId }: InlineFeedbackProps) => {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const { toast } = useToast();

  const sendFeedback = async (helpful: boolean) => {
    setIsHelpful(helpful);
    try {
      // Never use SUPABASE_SERVICE_ROLE_KEY on the client. Use a safe server endpoint instead.
      const resp = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messageId, helpful }) });
      if (resp.ok) {
        toast({ title: 'Thanks for the feedback!' });
      } else {
        const body = await resp.json().catch(() => ({}));
        console.error('Feedback API error', body);
        toast({ title: 'Feedback failed', variant: 'destructive' });
      }
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
