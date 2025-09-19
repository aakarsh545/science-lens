import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UsageData {
  requestsToday: number;
  maxRequests: number;
  canMakeRequest: boolean;
  loading: boolean;
}

const TIER_LIMITS = {
  free: 5,
  plus: 999999,
  pro: 999999,
};

export const useUsageTracking = (tier: 'free' | 'plus' | 'pro') => {
  const [usage, setUsage] = useState<UsageData>({
    requestsToday: 0,
    maxRequests: TIER_LIMITS[tier],
    canMakeRequest: true,
    loading: true,
  });
  const { toast } = useToast();

  const fetchUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUsage(prev => ({ 
          ...prev, 
          requestsToday: 0, 
          canMakeRequest: tier !== 'free',
          loading: false 
        }));
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      const { data: usageData, error } = await supabase
        .from('usage')
        .select('requests_today')
        .eq('user_id', session.user.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const requestsToday = usageData?.requests_today || 0;
      const maxRequests = TIER_LIMITS[tier];
      const canMakeRequest = requestsToday < maxRequests;

      setUsage({
        requestsToday,
        maxRequests,
        canMakeRequest,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching usage:', error);
      setUsage(prev => ({ ...prev, loading: false }));
    }
  };

  const incrementUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      if (!usage.canMakeRequest) {
        toast({
          title: "Daily Limit Reached",
          description: "You've reached your daily question limit. Upgrade for unlimited questions!",
          variant: "destructive",
        });
        return false;
      }

      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from('usage')
        .upsert({
          user_id: session.user.id,
          date: today,
          requests_today: usage.requestsToday + 1,
        }, {
          onConflict: 'user_id,date',
        });

      if (error) throw error;

      // Update local state
      setUsage(prev => ({
        ...prev,
        requestsToday: prev.requestsToday + 1,
        canMakeRequest: prev.requestsToday + 1 < prev.maxRequests,
      }));

      return true;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      toast({
        title: "Usage Error",
        description: "Failed to track usage. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchUsage();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUsage();
      } else if (event === 'SIGNED_OUT') {
        setUsage({
          requestsToday: 0,
          maxRequests: TIER_LIMITS.free,
          canMakeRequest: true,
          loading: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [tier]);

  return {
    ...usage,
    incrementUsage,
    refreshUsage: fetchUsage,
  };
};