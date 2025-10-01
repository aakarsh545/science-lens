import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const AchievementToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleOpen = () => {
    setIsOpen(true);
    toast({
      title: "Achievement Unlocked!",
      description: "You unlocked a new achievement!",
    });
  };

  return (
    <div>
      <button onClick={handleOpen}>Unlock Achievement</button>
      {isOpen && (
        <div>
          <h1>Congratulations!</h1>
          <p>You unlocked a new achievement!</p>
          <canvas
            className="confetti"
            width={200}
            height={200}
            ref={(canvas) => {
              if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = 'hotpink';
                ctx.fillRect(0, 0, 200, 200);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AchievementToast;
