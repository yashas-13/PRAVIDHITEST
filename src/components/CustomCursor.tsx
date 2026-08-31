import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useStore } from '../store';

export default function CustomCursor() {
  const cursorType = useStore((state) => state.cursorType);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 500, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only bind on pointer:fine devices (desktop mouse) to save CPU/battery on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: cursorType === 'pointer' ? -24 : cursorType === 'text' ? -4 : -8,
        translateY: cursorType === 'pointer' ? -24 : cursorType === 'text' ? -24 : -8,
        width: cursorType === 'pointer' ? 48 : cursorType === 'text' ? 8 : 16,
        height: cursorType === 'pointer' ? 48 : cursorType === 'text' ? 48 : 16,
        backgroundColor: cursorType === 'pointer' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 1)',
        border: cursorType === 'pointer' ? '1px solid rgba(20, 184, 166, 0.6)' : 'none',
        willChange: 'transform',
      }}
    />
  );
}
