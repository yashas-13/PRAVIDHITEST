import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Trophy, Award, Shield, Star, ChevronDown } from 'lucide-react';
import GlitchEntrance from './GlitchEntrance';
import { useStore } from '../store';

const AWARDS = [
  {
    id: "cloud-innovator",
    title: "Global Cloud Innovator",
    year: "2025",
    org: "TechArchitecture Digest",
    desc: "Recognizing excellence in distributed edge architectures and zero-downtime multi-region failover meshes.",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-amber-400/20 to-emerald-500/10",
    accent: "text-amber-600",
    border: "border-amber-400/30",
    shadow: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
    bg: "bg-white"
  },
  {
    id: "ux-excellence",
    title: "Platform UX Excellence",
    year: "2024",
    org: "Digital Design Awards",
    desc: "Awarded for elevating enterprise conversion rates through highly immersive WebGL experiences.",
    icon: <Award className="w-6 h-6" />,
    color: "from-fuchsia-500/20 to-emerald-500/10",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-500/30",
    shadow: "shadow-[0_0_30px_rgba(217,70,239,0.15)]",
    bg: "bg-fuchsia-50/50"
  },
  {
    id: "cyber-flagship",
    title: "Cybersecurity Flagship",
    year: "2024",
    org: "Enterprise SecTech",
    desc: "Zero breaches across 50+ enterprise deployments. Absolute operational zero-trust adherence.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-teal-500/20 to-emerald-500/10",
    accent: "text-teal-600",
    border: "border-teal-500/30",
    shadow: "shadow-[0_0_30px_rgba(20,184,166,0.15)]",
    bg: "bg-teal-50/50"
  },
  {
    id: "fast-50",
    title: "Fast 50 Rising Tech",
    year: "2025",
    org: "Global Business Index",
    desc: "Recognized for massive scale engineering and exceptional operational deployment speeds.",
    icon: <Star className="w-6 h-6" />,
    color: "from-blue-500/20 to-emerald-500/10",
    accent: "text-blue-600",
    border: "border-blue-500/30",
    shadow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    bg: "bg-blue-50/50"
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
    <section id="awards" className="relative z-30 py-32 px-6 md:px-12 bg-emerald-50 max-w-none w-full min-h-screen flex items-center snap-center tracking-tight">
      <GlitchEntrance id="awards-glitch" className="w-full">
        <div className="w-full flex flex-col md:flex-row gap-16 items-center max-w-7xl mx-auto">
        
        {/* Left Side: Copy & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full md:w-5/12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-mono mb-8 uppercase tracking-widest">
             <Trophy size={12} className="text-amber-500" /> Recognized Excellence
          </div>
          
          <h2 className="text-[4rem] md:text-[6rem] font-sans tracking-tighter mb-6 leading-none">
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-800 uppercase">INDUSTRY</span> <br/> 
            <span className="font-serif italic text-emerald-950/40 font-normal">Acclaimed.</span>
          </h2>
          
          <p className="text-lg text-emerald-900/70 font-medium leading-relaxed mb-8 max-w-md">
            Our commitment to brutal technical perfection hasn't gone unnoticed. We build systems that win out in the market and set new industry benchmarks.
          </p>
          
          {/* Global Progress Bar */}
          <div className="w-full h-1 bg-emerald-200 rounded-full overflow-hidden mt-12 relative">
             <div className="absolute top-0 left-0 h-full bg-emerald-100 w-full" />
             <motion.div 
               className="absolute top-0 left-0 h-full bg-emerald-500"
               style={{ width: `${progress}%` }}
             />
          </div>
        </motion.div>

        {/* Right Side: Interactive Auto-Accordion */}
        <div className="w-full md:w-7/12 flex flex-col gap-4">
          {AWARDS.map((award, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                onClick={() => handleManualSelect(idx)}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                layout
                className={`relative rounded-[2rem] border overflow-hidden cursor-pointer transition-all duration-700 ${
                  isActive 
                    ? `${award.bg} backdrop-blur-xl ${award.border} ${award.shadow} p-6 md:p-8 h-auto scale-[1.02] z-10` 
                    : 'bg-white/50 border-emerald-100 hover:bg-white p-6 h-[88px] md:h-[104px] opacity-60 hover:opacity-100 z-0'
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
                      <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-white border shadow-sm ' + award.border + ' ' + award.accent : 'bg-emerald-100 text-emerald-600 border border-emerald-200'}`}>
                        {award.icon}
                      </div>
                      <div>
                        <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-500 font-display ${isActive ? 'text-emerald-950' : 'text-emerald-900/60'}`}>
                          {award.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`font-mono text-xs font-bold ${isActive ? award.accent : 'text-emerald-600/60'}`}>{award.year}</span>
                          <span className="w-1 h-1 rounded-full bg-emerald-300" />
                          <span className={`text-xs uppercase tracking-wider font-semibold ${isActive ? 'text-emerald-800/60' : 'text-emerald-900/40'}`}>{award.org}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`shrink-0 ${isActive ? 'text-emerald-900' : 'text-emerald-900/30'}`}
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
                        <p className="text-emerald-950/70 font-medium leading-relaxed max-w-xl pb-2 text-lg">
                          {award.desc}
                        </p>
                        
                        <div className="mt-4 flex gap-3">
                           <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-md bg-white border border-emerald-200 text-emerald-600 shadow-sm">Awarded for Excellence</span>
                           <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-md bg-white border border-emerald-200 text-emerald-600 shadow-sm">Distinction</span>
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
      </GlitchEntrance>
    </section>
  );
}
