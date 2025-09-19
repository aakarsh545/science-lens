import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionData {
  subscribed: boolean;
  tier: 'free' | 'plus' | 'pro';
  product_id: string | null;
  subscription_end: string | null;
  loading: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    tier: 'free',
    product_id: null,
    subscription_end: null,
    loading: true,
  });
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubscription(prev => ({ ...prev, loading: false }));
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscription({
        subscribed: data.subscribed,
        tier: data.tier,
        product_id: data.product_id,
        subscription_end: data.subscription_end,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription(prev => ({ ...prev, loading: false }));
    }
  };

  const createCheckout = async (priceId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Checkout Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to manage your subscription.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Portal Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSubscription();

    // Listen for auth changes
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkSubscription();
      } else if (event === 'SIGNED_OUT') {
        setSubscription({
          subscribed: false,
          tier: 'free',
          product_id: null,
          subscription_end: null,
          loading: false,
        });
      }
    });

    // Auto-refresh every minute
    const interval = setInterval(checkSubscription, 60000);

    return () => {
      authSubscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return {
    ...subscription,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
};