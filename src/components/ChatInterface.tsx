import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ScienceExplanation } from '@/components/ScienceExplanation';
import type { Message } from '@/types';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string, image?: File) => void;
  isLoading: boolean;
  onClearChat: () => void;
}

export function ChatInterface({ messages, onSendMessage, isLoading, onClearChat }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!input.trim() && !selectedImage) return;
    
    onSendMessage(input.trim(), selectedImage || undefined);
    setInput('');
    handleRemoveImage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Messages */}
      <div className="space-y-4 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-4 ${
                message.type === 'user' 
                  ? 'ml-auto max-w-[80%] bg-primary text-primary-foreground' 
                  : 'mr-auto max-w-[90%]'
              }`}>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="Uploaded content"
                    className="rounded-lg mb-2 max-h-64 object-cover"
                  />
                )}
                {message.type === 'assistant' ? (
                  <ScienceExplanation 
                    content={message.content} 
                    category={message.category || 'general'} 
                  />
                ) : (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                )}
                <div className="text-xs opacity-70 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mr-auto max-w-[90%]"
          >
            <Card className="p-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Analyzing your question...
                </span>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <Card className="p-4 shadow-science">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Selected"
                className="h-20 w-20 object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={handleRemoveImage}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
        
        <div className="space-y-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask any science question... (e.g., 'Why is the sky blue?' or 'How do plants make oxygen?')"
            className="min-h-[80px] resize-none border-0 focus:ring-0 text-base"
            disabled={isLoading}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
              
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearChat}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Chat
                </Button>
              )}
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="bg-gradient-cosmic hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}