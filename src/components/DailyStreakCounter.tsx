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
        const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
        const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (supabaseUrl && supabaseKey) {
          const sb = createClient(supabaseUrl, supabaseKey);
          await sb.from('streaks').upsert([{ value: next, updated_at: new Date().toISOString() }]);
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
