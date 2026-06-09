import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorType = useStore((state) => state.cursorType);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '0px solid rgba(255,255,255,0)',
    },
    pointer: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(20, 184, 166, 0.1)',
      border: '1px solid rgba(20, 184, 166, 0.5)',
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 24,
      width: 8,
      height: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference' as any,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference"
      variants={variants}
      animate={cursorType}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}
