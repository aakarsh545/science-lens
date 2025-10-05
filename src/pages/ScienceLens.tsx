import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Atom, Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatInterface } from '@/components/ChatInterface';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScienceParticles } from '@/components/ScienceParticles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useChats, type ChatMessage } from '@/hooks/useChats';
import type { Message } from '@/types';

export default function ScienceLens() {
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const { toast } = useToast();
  
  const {
    chats,
    currentChat,
    loading,
    isAuthenticated,
    createNewChat,
    addMessage,
    updateChatTitle,
    deleteChat,
    selectChat,
  } = useChats();

  useEffect(() => {
    if (currentChat && !editingTitle) {
      setTitleInput(currentChat.title);
    }
  }, [currentChat, editingTitle]);

  const handleNewChat = async () => {
    await createNewChat('New Chat');
    toast({
      title: "New Chat",
      description: "Started a new conversation!",
    });
  };

  const handleSendMessage = async (content: string, image?: File) => {
    if (!content.trim() && !image) return;

    try {
      // Create new chat if none exists
      let chat = currentChat;
      if (!chat) {
        chat = await createNewChat(content.slice(0, 50));
        if (!chat) {
          toast({
            title: "Error",
            description: "Failed to create chat. Please sign in.",
            variant: "destructive",
          });
          return;
        }
      }

      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content,
        timestamp: Date.now(),
      };
      
      await addMessage(chat.id, userMessage);
      setIsLoading(true);

      // Get AI response
      const { data, error } = await supabase.functions.invoke('ask', {
        body: { prompt: content }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast({
          title: "Error",
          description: "Failed to get AI response.",
          variant: "destructive",
        });
        return;
      }

      if (data?.response) {
        const aiMessage: ChatMessage = {
          role: 'ai',
          content: data.response,
          timestamp: Date.now(),
        };
        
        await addMessage(chat.id, aiMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTitle = async () => {
    if (currentChat && titleInput.trim()) {
      await updateChatTitle(currentChat.id, titleInput.trim());
      setEditingTitle(false);
    }
  };

  const handleCancelEdit = () => {
    setTitleInput(currentChat?.title || '');
    setEditingTitle(false);
  };

  // Convert ChatMessage to Message format for ChatInterface
  const convertMessages = (chatMessages: ChatMessage[]): Message[] => {
    return chatMessages.map((msg, index) => ({
      id: `${msg.role}_${msg.timestamp}_${index}`,
      type: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
      timestamp: msg.timestamp,
      category: 'general',
    }));
  };

  const messages = currentChat ? convertMessages(currentChat.messages) : [];

  return (
    <div className="h-screen w-full flex bg-background overflow-hidden">
      <ScienceParticles />
      
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        isAuthenticated={isAuthenticated}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="h-14 border-b bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {currentChat && (
              editingTitle ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveTitle();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    className="h-8 w-64"
                    autoFocus
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSaveTitle}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 group">
                  <h1 className="text-lg font-semibold">{currentChat.title}</h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditingTitle(true)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
              )
            )}
            {!currentChat && (
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-gradient-cosmic rounded-lg">
                  <Atom className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-lg font-semibold bg-gradient-cosmic bg-clip-text text-transparent">
                  Science Lens
                </h1>
              </div>
            )}
          </div>
          <ThemeToggle />
        </header>

        {/* Chat Content */}
        {!currentChat || messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl w-full space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-gradient-cosmic rounded-2xl">
                    <Atom className="h-16 w-16 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                  How can I help you learn today?
                </h2>
                <p className="text-muted-foreground text-lg">
                  Ask me anything about science, and I'll explain it in a friendly, easy-to-understand way!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { q: "Why is the sky blue?", emoji: "🌤️" },
                  { q: "How do plants make oxygen?", emoji: "🌱" },
                  { q: "What causes rainbows?", emoji: "🌈" },
                  { q: "Why do ice cubes float?", emoji: "🧊" }
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSendMessage(item.q)}
                    className="p-4 bg-muted/50 hover:bg-muted rounded-xl text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {item.q}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              onClearChat={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
}
