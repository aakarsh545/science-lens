import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

interface DailyStreakCounterProps {
  onMilestone?: (streak: number) => void;
}

const MILESTONES = [3, 7, 14, 30];

const DailyStreakCounter: React.FC<DailyStreakCounterProps> = ({ onMilestone }) => {
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const streakData = localStorage.getItem('streak');
    if (streakData) {
      setStreak(JSON.parse(streakData));
    }
  }, []);

  const handleIncrementStreak = async () => {
    const next = streak + 1;
    setStreak(next);
    localStorage.setItem('streak', JSON.stringify(next));

    // If milestone, notify
    if (MILESTONES.includes(next)) {
      toast({ title: `Streak milestone: ${next} days!`, description: 'You earned bonus credits!' });
      if (onMilestone) onMilestone(next);
      // Sync to Supabase if available (best-effort)
      try {
        // Use client anon supabase if configured in lib/supabase.ts
        // This avoids exposing a service role key in the browser.
        // eslint-disable-next-line import/no-unresolved
        const { supabase } = await import('@/lib/supabase');
        if (supabase) {
          await supabase.from('streaks').upsert([{ value: next, updated_at: new Date().toISOString() }]);
        } else {
          // Fallback to server endpoint that performs the secure update
          await fetch('/api/streak', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: next }) });
        }
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div>
      <p>You asked {streak} days in a row!</p>
      <button onClick={handleIncrementStreak}>Increment Streak</button>
    </div>
  );
};

export default DailyStreakCounter;
