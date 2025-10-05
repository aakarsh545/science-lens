import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Library,
  FolderKanban,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Chat } from '@/hooks/useChats';
import { supabase } from '@/integrations/supabase/client';

interface ChatSidebarProps {
  chats: Chat[];
  currentChat: Chat | null;
  onNewChat: () => void;
  onSelectChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string) => void;
  isAuthenticated: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ChatSidebar({
  chats,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isAuthenticated,
  collapsed = false,
  onToggleCollapse,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userTier, setUserTier] = useState('free');

  useEffect(() => {
    loadUserInfo();
  }, [isAuthenticated]);

  const loadUserInfo = async () => {
    if (!isAuthenticated) return;
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUserEmail(session.user.email || '');
      
      // Load user tier from profiles
      const { data } = await supabase
        .from('profiles')
        .select('tier')
        .eq('user_id', session.user.id)
        .single();
      
      if (data) {
        setUserTier(data.tier);
      }
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('chat-search')?.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      onNewChat();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  }, []);

  if (collapsed) {
    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 56 }}
        className="h-screen border-r bg-muted/30 backdrop-blur-sm flex flex-col items-center py-4 space-y-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          className="hover:bg-muted"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 280 }}
      className="h-screen border-r bg-muted/30 backdrop-blur-sm flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Science Lens</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-cosmic hover:opacity-90 text-white"
          disabled={!isAuthenticated}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="chat-search"
            placeholder="Search chats (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Library Section */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Library className="h-4 w-4" />
          <span>Library</span>
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center space-x-2 text-sm font-medium mb-2">
          <FolderKanban className="h-4 w-4" />
          <span>Projects</span>
        </div>
        <div className="space-y-1 pl-6">
          <div className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors py-1">
            3D modelling
          </div>
          <div className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors py-1">
            Website making
          </div>
        </div>
      </div>

      {/* Chats List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          <div className="px-2 text-xs font-medium text-muted-foreground mb-2">
            Chats
          </div>
          <AnimatePresence>
            {!isAuthenticated ? (
              <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                Sign in to save your chats
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                {searchQuery ? 'No chats found' : 'No chats yet'}
              </div>
            ) : (
              filteredChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group relative"
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left hover:bg-muted/50 transition-all",
                      currentChat?.id === chat.id && "bg-muted"
                    )}
                    onClick={() => onSelectChat(chat)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate flex-1 text-sm">
                      {chat.title}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* User Info Footer */}
      {isAuthenticated && (
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-cosmic flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {userEmail.split('@')[0]}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {userTier} Plan
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
