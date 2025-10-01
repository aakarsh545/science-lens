import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserPreferences {
  difficulty_level: 'child' | 'teen' | 'expert';
  animation_style: 'minimal' | 'dynamic' | 'cinematic';
  voice_enabled: boolean;
  selected_voice: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  difficulty_level: 'teen',
  animation_style: 'dynamic',
  voice_enabled: false,
  selected_voice: 'alloy',
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setPreferences(DEFAULT_PREFERENCES);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setPreferences({
          difficulty_level: data.difficulty_level as 'child' | 'teen' | 'expert',
          animation_style: data.animation_style as 'minimal' | 'dynamic' | 'cinematic',
          voice_enabled: data.voice_enabled,
          selected_voice: data.selected_voice,
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save your preferences.",
          variant: "destructive",
        });
        return;
      }

      const newPreferences = { ...preferences, ...updates };

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: session.user.id,
          ...newPreferences,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setPreferences(newPreferences);
      toast({
        title: "Preferences Saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    preferences,
    loading,
    updatePreferences,
  };
}