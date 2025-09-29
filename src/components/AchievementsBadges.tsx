import React, { useState } from 'react';
import { useToast } from 'react-toastify';
import confetti from 'canvas-confetti';

const AchievementBadges = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const toast = useToast();

  const handleUnlock = () => {
    setIsUnlocked(true);
    toast.success('You unlocked a new achievement!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <button onClick={handleUnlock}>Unlock Achievement</button>
      {isUnlocked && <p>Congratulations!</p>}
    </div>
  );
};

export default AchievementBadges;
