import React from 'react';
import { FileDown, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/types';

interface PDFExportProps {
  messages: Message[];
  conversationTitle?: string;
  isProUser?: boolean;
}

export const PDFExport: React.FC<PDFExportProps> = ({ 
  messages, 
  conversationTitle = 'Science Lens Conversation',
  isProUser = false 
}) => {
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!isProUser) {
      toast({
        title: "Pro Feature",
        description: "PDF export is available for Pro users. Upgrade to unlock!",
        variant: "destructive",
      });
      return;
    }

    try {
      // Build HTML content
      const container = document.createElement('div');
      container.innerHTML = `
        <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111;">
          <h1>${conversationTitle}</h1>
          ${messages.map(m => `<div style="margin-bottom:16px"><strong>${m.type === 'user' ? 'Q' : 'A'}</strong><div>${m.content}</div><div style="font-size:12px;color:#666">${new Date(m.timestamp).toLocaleString()}</div></div>`).join('')}
        </div>`;

      // Try html2pdf if available
      const win = window as unknown as { html2pdf?: unknown };
      const html2pdf = win.html2pdf;
      if (html2pdf && typeof html2pdf === 'function') {
        type Html2PdfInstance = { from: (c: HTMLElement) => { save?: (filename?: string) => Promise<void> } };
        const instance = (html2pdf as unknown) as () => Html2PdfInstance;
        const fromFn = instance().from;
        if (fromFn) {
          await fromFn(container).save?.(`${conversationTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
        }
      } else {
        // Fallback: open printable window
        const w = window.open('', '_blank');
        if (!w) throw new Error('Popup blocked');
        w.document.write(container.innerHTML);
        w.document.close();
        w.print();
      }

      toast({ title: 'Export started' });
      } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error('PDF export error:', errMsg);
      toast({ title: 'Export failed', variant: 'destructive' });
    }
  };

  const handleShare = async () => {
  try {
      // Create a simple share payload and call a share API or navigator.share
      const payload = { title: conversationTitle, messages };
      const nav = navigator as unknown as Navigator & { share?: (data: { title?: string; text?: string }) => Promise<void> };
      if (nav.share && typeof nav.share === 'function') {
        await nav.share({ title: conversationTitle, text: JSON.stringify(payload) });
        toast({ title: 'Shared via Web Share' });
        return;
      }
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(JSON.stringify(payload));
      toast({ title: 'Conversation copied to clipboard' });
    } catch (e) {
      toast({ title: 'Share failed', variant: 'destructive' });
    }
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generatePDF}
      className={`flex items-center space-x-2 ${!isProUser ? 'opacity-50' : ''}`}
      disabled={!isProUser}
    >
      <FileDown className="h-4 w-4" />
      <span>{isProUser ? 'Export PDF' : 'Export PDF (Pro)'}</span>
    </Button>
  );
};