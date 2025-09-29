import React, { useState, useEffect } from 'react';

const DailyQuestionStreakCounter = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const streakData = localStorage.getItem('streak');
    if (streakData) {
      setStreak(JSON.parse(streakData));
    }
  }, []);

  const handleIncrementStreak = () => {
    setStreak(streak + 1);
    localStorage.setItem('streak', JSON.stringify(streak + 1));
  };

  return (
    <div>
      <p>You asked {streak} days in a row!</p>
      <button onClick={handleIncrementStreak}>Increment Streak</button>
    </div>
  );
};

export default DailyQuestionStreakCounter;
