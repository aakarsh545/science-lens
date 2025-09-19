import React from 'react';
import { motion } from 'framer-motion';

const ScienceUniverse: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating Atoms */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`atom-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -40, 40, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-8 h-8">
              {/* Nucleus */}
              <div className="absolute inset-0 w-3 h-3 bg-primary/40 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              
              {/* Electron orbits */}
              <motion.div
                className="absolute inset-0 border border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute w-1 h-1 bg-primary/60 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2" />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 border border-primary/20 rounded-full transform rotate-45"
                animate={{ rotate: [45, 405] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute w-1 h-1 bg-primary/60 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Rockets */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`rocket-${i}`}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.div>
        ))}
      </div>

      {/* Floating Satellites */}
      <div className="absolute inset-0">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`satellite-${i}`}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, -80, 80, 0],
              y: [0, 50, -50, 0],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🛰️
          </motion.div>
        ))}
      </div>

      {/* DNA Helixes */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`dna-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 85}%`,
              top: `${Math.random() * 85}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-6 h-12">
              <motion.div
                className="absolute inset-0 border-l-2 border-r-2 border-primary/30"
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* DNA base pairs */}
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-full h-0.5 bg-primary/40"
                  style={{ top: `${j * 25}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Molecules */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`molecule-${i}`}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 18 + Math.random() * 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⚗️
          </motion.div>
        ))}
      </div>

      {/* Floating Numbers and Formulas */}
      <div className="absolute inset-0">
        {['E=mc²', 'π', '∞', 'Δ', '∫', '∑'].map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-sm font-mono text-primary/20 select-none"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScienceUniverse;