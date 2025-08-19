import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Sparkles } from 'lucide-react';

interface QuestionAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function QuestionAnimation({ isVisible, onComplete }: QuestionAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Central Science Atom */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            onAnimationComplete={() => {
              setTimeout(() => onComplete?.(), 800);
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              {/* Glowing background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-cosmic rounded-full blur-xl"
                style={{ width: '120px', height: '120px', transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
              />
              
              {/* Main atom icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative z-10 p-6 bg-gradient-cosmic rounded-full"
              >
                <Atom className="h-12 w-12 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Orbital Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: [
                  window.innerWidth / 2,
                  window.innerWidth / 2 + Math.cos(i * 60 * Math.PI / 180) * 150,
                  window.innerWidth / 2 + Math.cos((i * 60 + 180) * Math.PI / 180) * 150,
                  window.innerWidth / 2
                ],
                y: [
                  window.innerHeight / 2,
                  window.innerHeight / 2 + Math.sin(i * 60 * Math.PI / 180) * 150,
                  window.innerHeight / 2 + Math.sin((i * 60 + 180) * Math.PI / 180) * 150,
                  window.innerHeight / 2
                ],
                scale: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: 1,
                ease: "easeInOut"
              }}
              className="absolute"
            >
              <div className="w-3 h-3 bg-primary rounded-full shadow-glow" />
            </motion.div>
          ))}

          {/* Sparkle Effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 1,
                repeat: 1,
                ease: "easeInOut"
              }}
              className="absolute"
            >
              <Sparkles className="h-4 w-4 text-accent" />
            </motion.div>
          ))}

          {/* Ripple Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-primary rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-secondary rounded-full"
          />
        </div>
      )}
    </AnimatePresence>
  );
}