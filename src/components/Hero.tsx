import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { useStore } from '../store';
import { useRef, MouseEvent } from 'react';
import GlitchEntrance from './GlitchEntrance';

// Word-by-word reveal component for award-winning typography effect
const RevealText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 + i * 0.1 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Magnetic button component
const MagneticButton = ({ children, onClick, className }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Magnetic pull strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function Hero() {
  const setCursorType = useStore((state) => state.setCursorType);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden bg-zinc-950 text-white pointer-events-none snap-center">
      {/* Background glow removed to let WebGL shine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />

      <GlitchEntrance id="hero-glitch">
        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-auto">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-teal-400 text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Digital Transformation Stack
          </motion.div>
          
          <h1 
            className="text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] tracking-tighter leading-[0.9] mb-8 relative z-10 font-sans"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            <RevealText text="End-to-End" className="font-modern font-black" /> <br />
            <RevealText text="Software" className="font-serif italic font-normal text-zinc-300" /> <span className="font-serif italic font-normal text-teal-500">✳</span><br />
            <RevealText text="Solutions." className="font-display font-black text-transparent [-webkit-text-stroke:2px_#ffffff]" />
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed font-medium"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            We drive massive business growth by engineering custom product development, data science ecosystems, and zero-downtime cloud infrastructure.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="fixed bottom-12 right-12 md:bottom-24 md:right-24 z-50 pointer-events-auto"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            <MagneticButton className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-teal-500 flex items-center justify-center text-black font-black uppercase text-lg md:text-xl transition-shadow hover:shadow-[0_0_80px_rgba(20,184,166,0.5)] cursor-none">
              <div className="absolute inset-0 rounded-full border-2 border-white/50 border-dashed animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border border-teal-200 scale-[1.15]" />
              <div className="text-center leading-tight flex flex-col items-center">
                Launch<br/>Now
                <ArrowRight className="mt-2 w-5 h-5 mx-auto" />
              </div>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Pseudo-Terminal Interface */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="hidden lg:block w-full h-[450px] border border-zinc-800 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl relative"
        >
          <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 border border-red-500/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 border border-green-500/50" />
            <div className="ml-4 font-mono text-xs text-zinc-500 flex items-center gap-2">
              <Terminal size={14} /> build@pravidhi ~
            </div>
          </div>
          <div className="p-8 font-mono text-sm leading-relaxed">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
            >
              <span className="text-teal-400 font-bold">➜</span> <span className="text-blue-400 font-bold">~</span> pnpm execute transformation_bundle
            </motion.div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.6 }}
               className="mt-4 text-zinc-400"
            >
              Initializing high-performance digital team...<br/>
              <span className="text-green-400">✔</span> Analyzing legacy infrastructure<br/>
              <span className="text-green-400">✔</span> Aligning ML & Data Science vectors<br/>
              <span className="text-green-400">✔</span> Deploying managed Kubernetes clusters<br/>
              <span className="text-green-400">✔</span> Migrating BI Reporting suites<br/>
            </motion.div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2.8 }}
               className="mt-6 text-green-400 font-bold"
            >
              EXPERIENCE THE INNOVATION. Deployment Successful.
            </motion.div>
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 3.4 }}
               className="mt-4"
            >
              <span className="text-teal-400 font-bold">➜</span> <span className="text-blue-400 font-bold">~</span> <span className="w-2.5 h-5 bg-zinc-300 inline-block animate-pulse align-middle" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      </GlitchEntrance>
    </section>
  );
}
