import React, { useState, useEffect } from 'react';

const ProgressiveUnlocking = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlockedData = localStorage.getItem('unlocked');
    if (unlockedData) {
      setIsUnlocked(JSON.parse(unlockedData));
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('unlocked', JSON.stringify(true));
  };

  return (
    <div>
      {isUnlocked ? (
        <p>Advanced topic unlocked!</p>
      ) : (
        <button onClick={handleUnlock}>Unlock Advanced Topic</button>
      )}
    </div>
  );
};

export default ProgressiveUnlocking;
