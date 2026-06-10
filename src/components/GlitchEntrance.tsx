import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface GlitchEntranceProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function GlitchEntrance({ children, id, className = "", delay = 0 }: GlitchEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Trigger animation whenever the section enters the viewport
  const isInView = useInView(ref, {
    once: false, // Trigger whenever it is snapped or scrolled back into view
    amount: 0.15, // Trigger when 15% of the section is visible
  });

  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchCounter, setGlitchCounter] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Trigger a brief 600ms high-intensity glitch sequence on snap-in
      setIsGlitching(true);
      setGlitchCounter((prev) => prev + 1);
      
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Dynamic glitch frame keyframes for Framer Motion
  // These represent fractional offsets, chromatic skews, and clip-paths
  const glitchX = isGlitching ? [0, -15, 20, -10, 15, -5, 0] : 0;
  const glitchY = isGlitching ? [0, 8, -12, 6, -6, 3, 0] : 0;
  const glitchSkew = isGlitching ? [0, -12, 16, -6, 8, -3, 0] : 0;
  const glitchScale = isGlitching ? [1, 1.03, 0.98, 1.02, 1, 1.01, 1] : 1;
  const glitchFilter = isGlitching 
    ? [
        'none',
        'hue-rotate(60deg) saturate(180%) contrast(120%) brightness(120%)',
        'hue-rotate(-45deg) saturate(130%) bloom(2) invert(5%)',
        'hue-rotate(180deg) saturate(200%) contrast(150%)',
        'hue-rotate(0deg)'
      ]
    : 'none';

  // Sliced polygon clipping representing blocky horizontal displacement deconstruction
  const glitchClip = isGlitching
    ? [
        'inset(0% 0% 0% 0%)',
        'inset(12% 0% 55% 0%)',
        'inset(45% 0% 8% 0%)',
        'inset(85% 0% 2% 0%)',
        'inset(30% 0% 30% 0%)',
        'inset(0% 0% 0% 0%)',
      ]
    : 'inset(0% 0% 0% 0%)';

  return (
    <div 
      ref={ref} 
      id={id} 
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Absolute floating HTML system glitch overlays */}
      {isGlitching && (
        <>
          {/* Neon chromatic scanning horizontal bar */}
          <motion.div 
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-teal-400 to-indigo-500 z-50 pointer-events-none opacity-80 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
          />
          <motion.div 
            initial={{ top: "110%" }}
            animate={{ top: "-10%" }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent z-50 pointer-events-none opacity-60 shadow-[0_0_10px_rgba(244,63,94,0.6)]"
          />

          {/* Random binary data debris fragments */}
          <div className="absolute inset-x-0 top-1/4 flex justify-between px-12 z-50 font-mono text-[9px] text-teal-400 opacity-40 pointer-events-none select-none">
            <span>SYS_SNAP_LOCK_{id?.toUpperCase()}</span>
            <span>DECONSTRUCT_REASSEMBLE_INIT</span>
            <span>ERROR:0x93FA</span>
          </div>
          <div className="absolute inset-x-0 bottom-1/4 flex justify-between px-20 z-50 font-mono text-[9px] text-indigo-400 opacity-35 pointer-events-none select-none">
            <span>GLITCH_FILTER_TRUE</span>
            <span>RATIO: 0.85</span>
            <span>GRID_RECONSTRUCTION_OK</span>
          </div>
        </>
      )}

      {/* SVG turbulence noise filter loaded once and animated dynamically */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`glitch-turbulence-${id || 'generic'}`}>
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.08" 
              numOctaves="1" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={isGlitching ? 15 : 0} 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Main content with Framer Motion animated glitch attributes */}
      <motion.div
        animate={{
          x: glitchX,
          y: glitchY,
          skewX: glitchSkew,
          scale: glitchScale,
          clipPath: glitchClip,
        }}
        transition={{
          duration: 0.6,
          ease: "linear",
          delay: delay,
        }}
        style={{
          filter: isGlitching ? `url(#glitch-turbulence-${id || 'generic'})` : 'none',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
