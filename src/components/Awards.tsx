import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Trophy, Award, Shield, Star, ChevronDown } from 'lucide-react';
import { useStore } from '../store';

const AWARDS = [
  {
    id: "cloud-innovator",
    title: "Global Cloud Innovator",
    year: "2025",
    org: "TechArchitecture Digest",
    desc: "Recognizing excellence in distributed edge architectures and zero-downtime multi-region failover meshes.",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-amber-400/20 to-amber-900/10",
    accent: "text-amber-400",
    border: "border-amber-400/30",
    shadow: "shadow-[0_0_30px_rgba(251,191,36,0.15)]"
  },
  {
    id: "ux-excellence",
    title: "Platform UX Excellence",
    year: "2024",
    org: "Digital Design Awards",
    desc: "Awarded for elevating enterprise conversion rates through highly immersive WebGL experiences.",
    icon: <Award className="w-6 h-6" />,
    color: "from-fuchsia-500/20 to-fuchsia-900/10",
    accent: "text-fuchsia-400",
    border: "border-fuchsia-500/30",
    shadow: "shadow-[0_0_30px_rgba(217,70,239,0.15)]"
  },
  {
    id: "cyber-flagship",
    title: "Cybersecurity Flagship",
    year: "2024",
    org: "Enterprise SecTech",
    desc: "Zero breaches across 50+ enterprise deployments. Absolute operational zero-trust adherence.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-emerald-500/20 to-emerald-900/10",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]"
  },
  {
    id: "fast-50",
    title: "Fast 50 Rising Tech",
    year: "2025",
    org: "Global Business Index",
    desc: "Recognized for massive scale engineering and exceptional operational deployment speeds.",
    icon: <Star className="w-6 h-6" />,
    color: "from-blue-500/20 to-blue-900/10",
    accent: "text-blue-400",
    border: "border-blue-500/30",
    shadow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]"
  }
];

export default function Awards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const setCursorType = useStore((state) => state.setCursorType);

  useEffect(() => {
    let start = Date.now();
    let animationFrameId: number;
    let isMounted = true;
    const DURATION = 5000;

    const tick = () => {
      if (!isMounted) return;
      const now = Date.now();
      const elapsed = now - start;
      const currProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(currProgress);

      if (elapsed >= DURATION) {
        start = now;
        setActiveIndex((prev) => (prev + 1) % AWARDS.length);
        setProgress(0);
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex]);

  const handleManualSelect = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  return (
    <section id="awards" className="relative z-30 py-32 px-6 md:px-12 bg-transparent max-w-7xl mx-auto min-h-screen flex items-center snap-start">
      <div className="w-full flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Side: Copy & Title */}
        <div className="w-full md:w-5/12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-8 uppercase tracking-widest">
             <Trophy size={12} className="text-amber-400" /> Recognized Excellence
          </div>
          
          <h2 className="text-[4rem] md:text-[6rem] font-sans tracking-tighter mb-6 leading-[0.9]">
            <span className="font-black text-transparent [-webkit-text-stroke:2px_#ffffff]">INDUSTRY</span> <br/> 
            <span className="font-serif italic text-zinc-300 font-normal">Acclaimed.</span>
          </h2>
          
          <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-8 max-w-md">
            Our commitment to brutal technical perfection hasn't gone unnoticed. We build systems that win out in the market and set new industry benchmarks.
          </p>
          
          {/* Global Progress Bar */}
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-12 relative">
             <div className="absolute top-0 left-0 h-full bg-zinc-800 w-full" />
             <motion.div 
               className="absolute top-0 left-0 h-full bg-teal-500"
               style={{ width: `${progress}%` }}
             />
          </div>
        </div>

        {/* Right Side: Interactive Auto-Accordion */}
        <div className="w-full md:w-7/12 flex flex-col gap-4">
          {AWARDS.map((award, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={award.id}
                onClick={() => handleManualSelect(idx)}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                layout
                className={`relative rounded-[2rem] border overflow-hidden cursor-pointer transition-all duration-700 ${
                  isActive 
                    ? `bg-black/60 backdrop-blur-xl ${award.border} ${award.shadow} p-6 md:p-8 h-auto` 
                    : 'bg-zinc-950/40 border-zinc-900/50 hover:bg-zinc-900/50 p-6 h-[88px] md:h-[104px]'
                }`}
              >
                {/* Active Background Gradient Glow */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 bg-gradient-to-br ${award.color} pointer-events-none opacity-50`} 
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Header Row (Always visible) */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-black border ' + award.border + ' ' + award.accent : 'bg-zinc-900 text-zinc-600'}`}>
                        {award.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                          {award.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`font-mono text-xs font-bold ${isActive ? award.accent : 'text-zinc-600'}`}>{award.year}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-700" />
                          <span className={`text-xs uppercase tracking-wider font-semibold ${isActive ? 'text-zinc-400' : 'text-zinc-700'}`}>{award.org}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`shrink-0 ${isActive ? 'text-white' : 'text-zinc-700'}`}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-zinc-300 font-medium leading-relaxed max-w-xl pb-2">
                          {award.desc}
                        </p>
                        
                        <div className="mt-4 flex gap-3">
                           <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-md bg-black/40 border border-white/5 text-zinc-400">Awarded for Excellence</span>
                           <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-md bg-black/40 border border-white/5 text-zinc-400">Distinction</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
