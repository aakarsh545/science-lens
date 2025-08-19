import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/data/achievements';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

interface CelebrationAnimationProps {
  achievement: Achievement | null;
  onComplete: () => void;
}

const confettiColors = [
  'hsl(217 91% 60%)', // primary
  'hsl(260 60% 65%)', // secondary  
  'hsl(142 76% 55%)', // accent
  'hsl(45 93% 58%)', // yellow
  'hsl(0 84% 60%)', // red
  'hsl(120 60% 50%)', // green
];

export function CelebrationAnimation({ achievement, onComplete }: CelebrationAnimationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!achievement) return;

    // Create confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 3 + 2
        }
      });
    }
    setConfetti(pieces);
    setShowBadge(true);

    // Clean up after animation
    const timeout = setTimeout(() => {
      setConfetti([]);
      setShowBadge(false);
      onComplete();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [achievement, onComplete]);

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: piece.rotation,
              scale: 0
            }}
            animate={{
              x: piece.x + piece.velocity.x * 200,
              y: window.innerHeight + 100,
              rotate: piece.rotation + 720,
              scale: 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 4,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.size % 3 === 0 ? '50%' : '2px'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Achievement Badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: -100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-gradient-cosmic text-white p-8 rounded-2xl shadow-glow text-center max-w-sm mx-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, repeat: 2 }}
                className="text-6xl mb-4"
              >
                {achievement.icon}
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-xl font-bold mb-2"
              >
                Achievement Unlocked!
              </motion.h2>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-lg font-semibold mb-2"
              >
                {achievement.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-sm opacity-90 mb-3"
              >
                {achievement.description}
              </motion.p>

              {achievement.bonusCredits && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, type: "spring" }}
                  className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">🎁</span>
                  <span className="text-sm font-medium">+{achievement.bonusCredits} Credits</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow effect */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-cosmic"
          />
        )}
      </AnimatePresence>
    </div>
  );
}