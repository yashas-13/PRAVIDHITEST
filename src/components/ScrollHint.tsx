import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export default function ScrollHint() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<any>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Don't show at the very bottom
    if (latest < 0.95) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // show after 1.5s of idle scrolling
    }
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center justify-end mix-blend-difference"
    >
      <motion.div 
        animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 5, 0] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-white/80 select-none">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/0 via-white/80 to-white/0" />
      </motion.div>
    </motion.div>
  );
}
