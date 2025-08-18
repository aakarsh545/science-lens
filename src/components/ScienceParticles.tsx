import { motion } from 'framer-motion';
import { Atom, Dna, Microscope, Telescope, Beaker, Zap } from 'lucide-react';

const particles = [
  { Icon: Atom, color: 'text-primary' },
  { Icon: Dna, color: 'text-secondary' },
  { Icon: Microscope, color: 'text-accent' },
  { Icon: Telescope, color: 'text-primary' },
  { Icon: Beaker, color: 'text-secondary' },
  { Icon: Zap, color: 'text-accent' },
];

export function ScienceParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.color} opacity-20`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <particle.Icon className="h-6 w-6" />
        </motion.div>
      ))}
    </div>
  );
}