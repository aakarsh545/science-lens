import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface CreditsData {
  credits: number;
  lastReset: string; // ISO date string
  bonusCredits: number;
  totalEarned: number;
}

const DAILY_CREDITS = 5;
const CREDITS_STORAGE_KEY = 'science-lens-credits';

export function useCredits() {
  const [creditsData, setCreditsData] = useLocalStorage<CreditsData>(CREDITS_STORAGE_KEY, {
    credits: DAILY_CREDITS,
    lastReset: new Date().toISOString().split('T')[0],
    bonusCredits: 0,
    totalEarned: DAILY_CREDITS
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check if credits should be reset (new day)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (creditsData.lastReset !== today) {
      setCreditsData(prev => ({
        ...prev,
        credits: DAILY_CREDITS,
        lastReset: today,
        totalEarned: prev.totalEarned + DAILY_CREDITS
      }));
    }
  }, [creditsData.lastReset, setCreditsData]);

  const useCredit = (): boolean => {
    if (creditsData.credits > 0) {
      setCreditsData(prev => ({
        ...prev,
        credits: prev.credits - 1
      }));
      return true;
    }
    return false;
  };

  const addBonusCredits = (amount: number) => {
    setCreditsData(prev => ({
      ...prev,
      bonusCredits: prev.bonusCredits + amount,
      credits: prev.credits + amount,
      totalEarned: prev.totalEarned + amount
    }));
  };

  const getTimeUntilReset = (): string => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilReset = tomorrow.getTime() - now.getTime();
    const hoursUntilReset = Math.floor(msUntilReset / (1000 * 60 * 60));
    const minutesUntilReset = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursUntilReset > 0) {
      return `${hoursUntilReset}h ${minutesUntilReset}m`;
    }
    return `${minutesUntilReset}m`;
  };

  const hasCredits = creditsData.credits > 0;

  return {
    credits: creditsData.credits,
    bonusCredits: creditsData.bonusCredits,
    totalEarned: creditsData.totalEarned,
    hasCredits,
    useCredit,
    addBonusCredits,
    getTimeUntilReset,
    isLoading
  };
}