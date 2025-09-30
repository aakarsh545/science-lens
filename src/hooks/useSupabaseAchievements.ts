import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Achievement } from '@/types';
import { achievements as achievementsData } from '@/data/achievements';

export const useSupabaseAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAchievements = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setAchievements(achievementsData);
        setLoading(false);
        return;
      }

      const { data: unlockedAchievements, error } = await supabase
        .from('achievements')
        .select('achievement_key, unlocked_at')
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Merge with static achievement data
      const mergedAchievements = achievementsData.map(achievement => {
        const unlocked = unlockedAchievements.find(
          ua => ua.achievement_key === achievement.id
        );
        
        return {
          ...achievement,
          unlocked: !!unlocked,
          unlockedAt: unlocked ? new Date(unlocked.unlocked_at).getTime() : undefined,
        };
      });

      setAchievements(mergedAchievements);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setAchievements(achievementsData);
      setLoading(false);
    }
  };

  const unlockAchievement = async (achievementId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      // Check if already unlocked
      const existing = achievements.find(a => a.id === achievementId);
      if (existing?.unlocked) return false;

      // Supabase client generates a union type for achievement_key; cast to unknown then string to satisfy typings
      const payload = {
        user_id: session.user.id,
        achievement_key: achievementId as unknown as string,
      } as unknown as Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from('achievements').insert([payload as unknown as any]);

      if (error) {
        // If it's a duplicate error, that's fine
        if (error.code === '23505') return false;
        throw error;
      }

      // Update local state
      setAchievements(prev => prev.map(achievement => 
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, unlockedAt: Date.now() }
          : achievement
      ));

      // Show celebration
      const achievement = achievements.find(a => a.id === achievementId);
      if (achievement) {
        toast({
          title: "Achievement Unlocked! 🎉",
          description: `${achievement.icon} ${achievement.title}`,
        });
      }

      return true;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error('Error unlocking achievement:', errMsg);
      return false;
    }
  };

  const checkAndUnlockAchievements = async (stats: {
    totalQuestions?: number;
    photosUploaded?: number;
    streakDays?: number;
    categoryQuestions?: Record<string, number>;
    tier?: string;
  }) => {
    const newlyUnlocked: string[] = [];

    // First steps achievement
    if (stats.totalQuestions === 1) {
      const unlocked = await unlockAchievement('first_steps');
      if (unlocked) newlyUnlocked.push('first_steps');
    }

    // Question milestone achievements
    if (stats.totalQuestions === 10) {
      const unlocked = await unlockAchievement('curious_learner');
      if (unlocked) newlyUnlocked.push('curious_learner');
    }

    if (stats.totalQuestions === 100) {
      const unlocked = await unlockAchievement('knowledge_seeker');
      if (unlocked) newlyUnlocked.push('knowledge_seeker');
    }

    // Upgrade achievements
    if (stats.tier === 'plus') {
      const unlocked = await unlockAchievement('upgrade_unlocked');
      if (unlocked) newlyUnlocked.push('upgrade_unlocked');
    }

    if (stats.tier === 'pro') {
      const unlocked = await unlockAchievement('pro_explorer');
      if (unlocked) newlyUnlocked.push('pro_explorer');
    }

    // Photo upload achievement
    if (stats.photosUploaded && stats.photosUploaded >= 5) {
      const unlocked = await unlockAchievement('pdf_master');
      if (unlocked) newlyUnlocked.push('pdf_master');
    }

    // Category-specific achievements
    if (stats.categoryQuestions) {
      Object.entries(stats.categoryQuestions).forEach(async ([category, count]) => {
        if (count >= 10 && category === 'physics') {
          const unlocked = await unlockAchievement('science_explorer');
          if (unlocked) newlyUnlocked.push('science_explorer');
        }
      });
    }

    return newlyUnlocked;
  };

  useEffect(() => {
    fetchAchievements();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchAchievements();
      } else if (event === 'SIGNED_OUT') {
        setAchievements(achievementsData);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUnlockedCount = () => achievements.filter(a => a.unlocked).length;
  const getTotalBonusCredits = () => 
    achievements
      .filter(a => a.unlocked)
      .reduce((total, a) => total + (a.bonusCredits || 0), 0);

  return {
    achievements,
    loading,
    unlockAchievement,
    checkAndUnlockAchievements,
    getUnlockedCount,
    getTotalBonusCredits,
    refreshAchievements: fetchAchievements,
  };
};