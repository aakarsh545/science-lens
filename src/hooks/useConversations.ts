import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Conversation } from '@/types';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadConversations = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setConversations([]);
        setLoading(false);
        return;
      }

      // Load conversations with messages
      const { data: convos, error: convosError } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });

      if (convosError) throw convosError;

      // Load messages for each conversation
      const conversationsWithMessages = await Promise.all(
        (convos || []).map(async (convo) => {
          const { data: messages, error: messagesError } = await supabase
            .from('chat_history')
            .select('*')
            .eq('conversation_id', convo.id)
            .order('created_at', { ascending: true });

          if (messagesError) throw messagesError;

          return {
            id: convo.id,
            title: convo.title,
            timestamp: new Date(convo.created_at).getTime(),
            category: convo.category || 'general',
            messages: (messages || []).map((msg) => ({
              id: msg.id,
              type: msg.message_role as 'user' | 'assistant',
              content: msg.content,
              timestamp: new Date(msg.created_at).getTime(),
              category: convo.category || 'general',
            })),
          } as Conversation;
        })
      );

      setConversations(conversationsWithMessages);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveConversation = async (conversation: Conversation) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // For non-authenticated users, store in localStorage
        const stored = localStorage.getItem('science-lens-conversations');
        const existing = stored ? JSON.parse(stored) : [];
        const updated = [conversation, ...existing.filter((c: Conversation) => c.id !== conversation.id)];
        localStorage.setItem('science-lens-conversations', JSON.stringify(updated));
        setConversations(updated);
        return;
      }

      // Save to Supabase
      const { data: convoData, error: convoError } = await supabase
        .from('conversations')
        .upsert({
          id: conversation.id,
          user_id: session.user.id,
          title: conversation.title,
          category: conversation.category || 'general',
        })
        .select()
        .single();

      if (convoError) throw convoError;

      // Save messages
      const messagesToSave = conversation.messages.map((msg) => ({
        conversation_id: convoData.id,
        user_id: session.user.id,
        message_role: msg.type,
        content: msg.content,
        created_at: new Date(msg.timestamp).toISOString(),
      }));

      // Delete existing messages for this conversation
      await supabase
        .from('chat_history')
        .delete()
        .eq('conversation_id', convoData.id);

      // Insert new messages
      const { error: messagesError } = await supabase
        .from('chat_history')
        .insert(messagesToSave);

      if (messagesError) throw messagesError;

      await loadConversations();
    } catch (error) {
      console.error('Error saving conversation:', error);
      toast({
        title: "Error",
        description: "Failed to save conversation.",
        variant: "destructive",
      });
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const stored = localStorage.getItem('science-lens-conversations');
        const existing = stored ? JSON.parse(stored) : [];
        const updated = existing.filter((c: Conversation) => c.id !== id);
        localStorage.setItem('science-lens-conversations', JSON.stringify(updated));
        setConversations(updated);
        return;
      }

      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation.",
        variant: "destructive",
      });
    }
  };

  return {
    conversations,
    loading,
    saveConversation,
    deleteConversation,
    refreshConversations: loadConversations,
  };
}