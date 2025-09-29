import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const WOWFeatures = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <button onClick={handleUnlock}>Unlock WOW Feature</button>
      {isUnlocked && <p>Congratulations!</p>}
    </div>
  );
};

export default WOWFeatures;
