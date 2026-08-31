import { motion } from 'motion/react';
import React from 'react';

interface GlitchEntranceProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function GlitchEntrance({ children, id, className = "", delay = 0 }: GlitchEntranceProps) {
  return (
    <motion.div 
      id={id} 
      className={`relative w-full ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
