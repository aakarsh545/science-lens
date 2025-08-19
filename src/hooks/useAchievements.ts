import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { achievements as allAchievements, Achievement } from '@/data/achievements';
import { useCredits } from './useCredits';

interface AchievementStats {
  totalQuestions: number;
  photosUploaded: number;
  streakDays: number;
  lastActiveDate: string;
  categoryQuestions: Record<string, number>;
  specialFlags: Record<string, boolean>;
  timeSpent: number;
}

export function useAchievements() {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('science-lens-achievements', allAchievements);
  const [stats, setStats] = useLocalStorage<AchievementStats>('science-lens-stats', {
    totalQuestions: 0,
    photosUploaded: 0,
    streakDays: 0,
    lastActiveDate: '',
    categoryQuestions: {},
    specialFlags: {},
    timeSpent: 0
  });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const { addBonusCredits } = useCredits();

  const checkAchievements = useCallback((newStats: Partial<AchievementStats>) => {
    const updatedStats = { ...stats, ...newStats };
    const unlockedAchievements: Achievement[] = [];

    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.requirements.type) {
        case 'total_questions':
          shouldUnlock = updatedStats.totalQuestions >= (achievement.requirements.count || 0);
          break;
        case 'questions_in_category':
          if (achievement.requirements.category) {
            const categoryCount = updatedStats.categoryQuestions[achievement.requirements.category] || 0;
            shouldUnlock = categoryCount >= (achievement.requirements.count || 0);
          }
          break;
        case 'photos_uploaded':
          shouldUnlock = updatedStats.photosUploaded >= (achievement.requirements.count || 0);
          break;
        case 'streak_days':
          shouldUnlock = updatedStats.streakDays >= (achievement.requirements.count || 0);
          break;
        case 'special':
          if (achievement.requirements.special) {
            shouldUnlock = updatedStats.specialFlags[achievement.requirements.special] || false;
          }
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: Date.now()
        };
        unlockedAchievements.push(unlockedAchievement);
        
        // Add bonus credits if achievement has them
        if (achievement.bonusCredits) {
          addBonusCredits(achievement.bonusCredits);
        }
        
        return unlockedAchievement;
      }

      return achievement;
    });

    if (unlockedAchievements.length > 0) {
      setAchievements(updatedAchievements);
      setStats(updatedStats);
      
      // Show the first new achievement
      setNewAchievement(unlockedAchievements[0]);
      
      return unlockedAchievements;
    }

    setStats(updatedStats);
    return [];
  }, [achievements, stats, setAchievements, setStats, addBonusCredits]);

  const recordQuestion = useCallback((category: string, content: string, hasPhoto: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    
    // Update streak
    let newStreakDays = stats.streakDays;
    if (stats.lastActiveDate !== today) {
      const lastDate = new Date(stats.lastActiveDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        newStreakDays = stats.streakDays + 1;
      } else if (daysDiff > 1) {
        newStreakDays = 1;
      }
    }

    // Update category questions
    const categoryQuestions = { ...stats.categoryQuestions };
    categoryQuestions[category] = (categoryQuestions[category] || 0) + 1;

    // Check for special flags
    const specialFlags = { ...stats.specialFlags };
    
    // Time-based achievements
    if (currentHour >= 0 && currentHour < 6) {
      specialFlags['early-question'] = true;
    }
    if (currentHour >= 22 || currentHour < 2) {
      specialFlags['night-question'] = true;
    }

    // Weekend achievement
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
      if (dayOfWeek === 0) specialFlags['sunday-question'] = true;
      if (dayOfWeek === 6) specialFlags['saturday-question'] = true;
      if (specialFlags['sunday-question'] && specialFlags['saturday-question']) {
        specialFlags['weekend-questions'] = true;
      }
    }

    // Multi-category achievement
    const uniqueCategories = Object.keys(categoryQuestions).filter(cat => categoryQuestions[cat] > 0);
    if (uniqueCategories.length >= 5) {
      specialFlags['multi-category'] = true;
    }
    if (uniqueCategories.length >= 8) { // Assuming we have 8+ categories
      specialFlags['all-categories'] = true;
    }

    // Content-based special flags (simplified - in real app would use NLP)
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('ocean') || lowerContent.includes('sea') || lowerContent.includes('marine')) {
      specialFlags['ocean'] = true;
    }
    if (lowerContent.includes('plant') || lowerContent.includes('flower') || lowerContent.includes('tree')) {
      specialFlags['plants'] = true;
    }
    if (lowerContent.includes('animal') || lowerContent.includes('mammal') || lowerContent.includes('bird')) {
      specialFlags['animals'] = true;
    }
    
    const newStats = {
      totalQuestions: stats.totalQuestions + 1,
      photosUploaded: hasPhoto ? stats.photosUploaded + 1 : stats.photosUploaded,
      streakDays: newStreakDays,
      lastActiveDate: today,
      categoryQuestions,
      specialFlags,
      timeSpent: stats.timeSpent + 1 // Simplified time tracking
    };

    return checkAchievements(newStats);
  }, [stats, checkAchievements]);

  const dismissNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  const getUnlockedCount = useCallback(() => {
    return achievements.filter(a => a.unlocked).length;
  }, [achievements]);

  const getTotalBonusCredits = useCallback(() => {
    return achievements
      .filter(a => a.unlocked && a.bonusCredits)
      .reduce((total, a) => total + (a.bonusCredits || 0), 0);
  }, [achievements]);

  const getAchievementsByCategory = useCallback(() => {
    const grouped: Record<string, Achievement[]> = {};
    achievements.forEach(achievement => {
      if (!grouped[achievement.category]) {
        grouped[achievement.category] = [];
      }
      grouped[achievement.category].push(achievement);
    });
    return grouped;
  }, [achievements]);

  return {
    achievements,
    stats,
    newAchievement,
    recordQuestion,
    dismissNewAchievement,
    getUnlockedCount,
    getTotalBonusCredits,
    getAchievementsByCategory
  };
}