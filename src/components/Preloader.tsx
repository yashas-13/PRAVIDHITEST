import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store';

export default function Preloader() {
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500); // Wait a bit before fully removing
          return 100;
        }
        // Randomize the loading step a bit for organic feel
        const inc = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + inc, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-10vh' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="absolute top-10 left-10 md:top-12 md:left-12 font-mono text-zinc-500 text-sm">
            INITIALIZING_SYSTEM
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <div className="overflow-hidden">
               <motion.div
                 initial={{ y: '100%' }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500"
               >
                 {progress}%
               </motion.div>
            </div>
            
            <div className="w-64 h-px bg-zinc-800 relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-white"
                 animate={{ width: `${progress}%` }}
                 transition={{ ease: 'linear', duration: 0.2 }}
               />
            </div>
          </div>
          
          <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12 font-mono text-zinc-500 text-sm text-right">
            PRAVIDHI // <br /> GLOBAL_TEAMS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
