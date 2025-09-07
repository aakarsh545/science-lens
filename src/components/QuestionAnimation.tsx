import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

interface QuestionAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const scienceColors = [
  'hsl(217 91% 60%)', // primary blue
  'hsl(142 76% 55%)', // science green
  'hsl(45 93% 58%)', // chemistry yellow
  'hsl(260 60% 65%)', // cosmic purple
  'hsl(30 100% 50%)', // earth orange
];

export function QuestionAnimation({ isVisible, onComplete }: QuestionAnimationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    // Create science-themed particles
    const newParticles: Particle[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const radius = 50 + Math.random() * 30;
      
      newParticles.push({
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        color: scienceColors[Math.floor(Math.random() * scienceColors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: Math.cos(angle) * (2 + Math.random() * 3),
          y: Math.sin(angle) * (2 + Math.random() * 3)
        }
      });
    }
    
    setParticles(newParticles);

    // Clean up after animation
    const timeout = setTimeout(() => {
      setParticles([]);
      onComplete();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Central glow pulse */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0] }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-xl"
      />

      {/* Science particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: particle.x + particle.velocity.x * 100,
              y: particle.y + particle.velocity.y * 100,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 20px ${particle.color}`,
              borderRadius: particle.id % 3 === 0 ? '50%' : '2px'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Science symbols floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.2], rotate: [0, 180, 360] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
      >
        🔬
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-primary/50 rounded-full"
      />
      
      <motion.div
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-accent/30 rounded-full"
      />
    </div>
  );
}