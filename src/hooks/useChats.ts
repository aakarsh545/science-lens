import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadChats();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        loadChats();
      } else {
        setChats([]);
        setCurrentChat(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const loadChats = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setChats([]);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedChats = (data || []).map(chat => ({
        id: chat.id,
        title: chat.title,
        messages: (chat.messages as unknown as ChatMessage[]) || [],
        created_at: chat.created_at,
        updated_at: chat.updated_at,
      }));

      setChats(formattedChats);

      // Auto-load most recent chat
      if (formattedChats.length > 0 && !currentChat) {
        setCurrentChat(formattedChats[0]);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      toast({
        title: "Error",
        description: "Failed to load chat history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = async (firstMessage?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save your chats.",
          variant: "destructive",
        });
        return null;
      }

      const title = firstMessage ? firstMessage.slice(0, 50) : 'New Chat';
      const newChat = {
        user_id: session.user.id,
        title,
        messages: [],
      };

      const { data, error } = await supabase
        .from('chats')
        .insert(newChat)
        .select()
        .single();

      if (error) throw error;

      const formattedChat: Chat = {
        id: data.id,
        title: data.title,
        messages: [],
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      setChats([formattedChat, ...chats]);
      setCurrentChat(formattedChat);
      return formattedChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      toast({
        title: "Error",
        description: "Failed to create new chat.",
        variant: "destructive",
      });
      return null;
    }
  };

  const addMessage = async (chatId: string, message: ChatMessage) => {
    try {
      const chat = chats.find(c => c.id === chatId);
      if (!chat) return;

      const updatedMessages = [...chat.messages, message];

      const { error } = await supabase
        .from('chats')
        .update({ 
          messages: updatedMessages as unknown as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', chatId);

      if (error) throw error;

      const updatedChat = {
        ...chat,
        messages: updatedMessages,
        updated_at: new Date().toISOString(),
      };

      setChats(chats.map(c => c.id === chatId ? updatedChat : c));
      if (currentChat?.id === chatId) {
        setCurrentChat(updatedChat);
      }
    } catch (error) {
      console.error('Error adding message:', error);
      toast({
        title: "Error",
        description: "Failed to save message.",
        variant: "destructive",
      });
    }
  };

  const updateChatTitle = async (chatId: string, newTitle: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ title: newTitle })
        .eq('id', chatId);

      if (error) throw error;

      setChats(chats.map(c => c.id === chatId ? { ...c, title: newTitle } : c));
      if (currentChat?.id === chatId) {
        setCurrentChat({ ...currentChat, title: newTitle });
      }
    } catch (error) {
      console.error('Error updating title:', error);
      toast({
        title: "Error",
        description: "Failed to update chat title.",
        variant: "destructive",
      });
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) throw error;

      setChats(chats.filter(c => c.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(chats[0] || null);
      }

      toast({
        title: "Success",
        description: "Chat deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: "Error",
        description: "Failed to delete chat.",
        variant: "destructive",
      });
    }
  };

  const selectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };

  return {
    chats,
    currentChat,
    loading,
    isAuthenticated,
    createNewChat,
    addMessage,
    updateChatTitle,
    deleteChat,
    selectChat,
    refreshChats: loadChats,
  };
}
