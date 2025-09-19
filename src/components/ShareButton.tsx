import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/types';

interface ShareButtonProps {
  messages: Message[];
  conversationTitle?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  messages, 
  conversationTitle = 'Science Lens Conversation' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Create a shareable summary of the conversation
  const createShareableContent = () => {
    const lastExchange = messages.slice(-2); // Get last question and answer
    if (lastExchange.length < 2) return '';

    const question = lastExchange.find(m => m.type === 'user')?.content || '';
    const answer = lastExchange.find(m => m.type === 'assistant')?.content || '';

    return `🧪 Science Lens Q&A\n\n❓ Question: ${question}\n\n🤖 Answer: ${answer.substring(0, 200)}${answer.length > 200 ? '...' : ''}\n\n🔗 Explore more science at Science Lens!`;
  };

  const createShareableUrl = () => {
    const content = createShareableContent();
    const encoded = encodeURIComponent(content);
    return `${window.location.origin}?share=${btoa(encoded)}`;
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = createShareableUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Link Copied! 🔗",
        description: "Share this link to show others your science discovery!",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = async () => {
    try {
      const content = createShareableContent();
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Text Copied! 📋",
        description: "Paste this anywhere to share your science discovery!",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareNative = async () => {
    const content = createShareableContent();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: conversationTitle,
          text: content,
          url: createShareableUrl(),
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      handleCopyText();
    }
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Share Your Discovery</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview */}
            <div className="p-4 bg-muted/50 rounded-lg border">
              <Label className="text-xs text-muted-foreground">Preview</Label>
              <div className="mt-2 text-sm whitespace-pre-wrap">
                {createShareableContent().substring(0, 150)}...
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleShareNative}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share with Apps
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Copy Shareable Link
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleCopyText}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copy as Text
              </Button>
            </div>

            {/* Shareable URL Display */}
            <div className="space-y-2">
              <Label htmlFor="share-url" className="text-xs text-muted-foreground">
                Shareable URL
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="share-url"
                  value={createShareableUrl()}
                  readOnly
                  className="text-xs"
                />
                <Button size="icon" variant="outline" onClick={handleCopyLink}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start space-x-2">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">🚀</div>
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Science spreads when shared!</strong> Your discoveries might inspire others to explore the fascinating world of science.
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};