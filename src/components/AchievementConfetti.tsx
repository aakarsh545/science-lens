import React, { useState } from 'react';
import { useToast } from 'react-toastify';
import confetti from 'canvas-confetti';

const AchievementConfetti = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleOpen = () => {
    setIsOpen(true);
    toast.success('You unlocked a new achievement!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <button onClick={handleOpen}>Unlock Achievement</button>
      {isOpen && <p>Congratulations!</p>}
    </div>
  );
};

export default AchievementConfetti;
