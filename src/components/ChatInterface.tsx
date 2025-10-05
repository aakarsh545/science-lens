import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Loader2, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ScienceExplanation } from '@/components/ScienceExplanation';
import { cn } from '@/lib/utils';
import type { Message } from '@/types';
import { DifficultyToggle, getDifficultyPrompt } from './DifficultyToggle';
import VoiceMode from './VoiceMode';
import { PDFExport } from './PDFExport';
import InlineFeedback from './InlineFeedbackForAIResponses';

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
  const [difficulty, setDifficulty] = useState<'child' | 'teen' | 'expert'>('teen');

  // Filter out undefined/null messages and add debug logging
  const validMessages = messages?.filter((message) => {
    if (!message) {
      console.warn('ChatInterface: Found undefined/null message, filtering out');
      return false;
    }
    if (!message.id || !message.type || !message.content) {
      console.warn('ChatInterface: Found invalid message structure:', message);
      return false;
    }
    return true;
  }) || [];

  console.log('ChatInterface: Rendering with messages:', validMessages.length);

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
    // Append difficulty prompt if selected
  const difficultyPrompt = getDifficultyPrompt(difficulty) || '';
    const payload = difficultyPrompt ? `${difficultyPrompt}\n\n${input.trim()}` : input.trim();
    onSendMessage(payload, selectedImage || undefined);
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
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between gap-4 p-4 border-b">
        <DifficultyToggle difficulty={difficulty} onChange={(d) => setDifficulty(d)} />
        <div className="flex items-center space-x-2">
          <VoiceMode onTranscribe={(text) => { setInput((s) => s + ' ' + text); }} />
          <PDFExport messages={messages} conversationTitle="Science Lens Conversation" isProUser={true} />
        </div>
      </div>

      {/* Messages Container */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {validMessages.length === 0 && !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Start a conversation</p>
              <p className="text-sm">Ask any science question to begin learning!</p>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {validMessages.map((message, index) => {
              try {
                const isUser = message.type === 'user';
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "flex gap-4",
                      isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-cosmic flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                    )}
                    
                    <Card className={cn(
                      "p-4 max-w-[85%]",
                      isUser 
                        ? "bg-gradient-to-br from-primary/90 to-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted/50 rounded-tl-none"
                    )}>
                      {message.image && (
                        <img 
                          src={message.image} 
                          alt="Uploaded content"
                          className="rounded-lg mb-3 max-h-64 object-cover"
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
                      <div className={cn(
                        "text-xs mt-2",
                        isUser ? "opacity-70" : "text-muted-foreground"
                      )}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </Card>

                    {isUser && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">You</span>
                      </div>
                    )}
                  </motion.div>
                );
              } catch (error) {
                const errMsg = error instanceof Error ? error.message : String(error);
                console.error('ChatInterface: Error rendering message:', message, errMsg);
                return null;
              }
            })}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 justify-start"
            >
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-cosmic flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <Card className="p-4 bg-muted/50 rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 shadow-lg">
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
                placeholder="Ask any science question..."
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
                    Photo
                  </Button>
                  
                  {validMessages.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onClearChat}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
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
      </div>
    </div>
  );
}