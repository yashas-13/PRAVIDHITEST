import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Rocket, GitMerge, Fingerprint, Activity } from 'lucide-react';
import { useStore } from '../store';

const offerings = [
  {
    id: "startup-launch",
    title: "STARTUP LAUNCH",
    subtitle: "From Zero to Series A scale.",
    desc: "We engineer MVPs that don’t need to be rewritten in 6 months. Absolute velocity, serverless infrastructure, and a codebase ready for massive user acquisition bursts.",
    icon: <Rocket className="w-8 h-8" />
  },
  {
    id: "digital-transformation",
    title: "DIGITAL TRANSFORMATION",
    subtitle: "Modernizing legacy monoliths.",
    desc: "We strangle monolithic beasts. De-risked migration to microservices, containerization, and establishing CI/CD pipelines that let enterprise teams deploy daily.",
    icon: <GitMerge className="w-8 h-8" />
  },
  {
    id: "ai-integration",
    title: "CUSTOM AI INTEGRATION",
    subtitle: "Intelligence built into the workflow.",
    desc: "Not ChatGPT wrappers. We train and fine-tune localized ML models on your proprietary data streams to automate decision-making securely within your perimeter.",
    icon: <Fingerprint className="w-8 h-8" />
  },
  {
    id: "managed-cloud",
    title: "MANAGED CLOUD & DEVOPS",
    subtitle: "Zero downtime operations.",
    desc: "Active/Active multi-region infrastructure. We ensure global latency is crushed and Kubernetes clusters automatically heal and scale precisely as traffic shifts.",
    icon: <Activity className="w-8 h-8" />
  }
];

export default function TechnicalNiches() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const setCursorType = useStore((state) => state.setCursorType);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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
        start = now + 10;
        setActiveIndex((prev) => (prev + 1) % offerings.length);
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

  const sectionY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="tech-niches" ref={ref} className="bg-blue-950 min-h-[140vh] relative z-30 py-32 text-blue-50 flex items-center justify-center snap-start w-full">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, #60a5fa 0, #60a5fa 1px, transparent 1px, transparent 40px)` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center">
        <motion.div style={{ y: sectionY }} className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-20 text-center"
          >
            <h2 className="text-[4rem] md:text-[6rem] tracking-tighter leading-none mb-6">
              <span className="font-serif italic font-normal text-blue-300">Tailored</span> <br/><span className="font-black text-transparent [-webkit-text-stroke:2px_rgba(56,189,248,0.8)] filter drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] uppercase">Bundles.</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-blue-200 font-medium tracking-tight">
              We structure our engineering squads precisely for the phase you are in. Maintained blocks enclosing dedicated logic.
            </p>
          </motion.div>

          {/* Enclosed Layout Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full bg-blue-900 border border-blue-800 rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl flex flex-col md:flex-row gap-4 md:gap-8 overflow-hidden h-auto min-h-[600px] backdrop-blur-md"
          >
            
            {/* Left Nav Map */}
            <div className="flex flex-col w-full md:w-5/12 gap-2 h-full">
              {offerings.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleManualSelect(idx)}
                    onMouseEnter={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                    className={`relative text-left px-8 py-8 rounded-3xl transition-all duration-500 overflow-hidden outline-none ${isActive ? 'bg-sky-400 text-blue-950 shadow-[0_0_40px_rgba(56,189,248,0.4)]' : 'bg-transparent text-blue-300 hover:bg-blue-800 hover:text-white'}`}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        {/* Title */}
                        <div className={`font-mono text-xs mb-2 transition-colors duration-500 tracking-widest ${isActive ? 'text-blue-900 font-bold' : 'text-blue-400'}`}>
                           0{idx + 1} // {item.id.toUpperCase()}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-black tracking-tight uppercase leading-none w-10/12 font-display`}>{item.title}</h3>
                      </div>
                      
                      {/* Circular Progress Indicating Time Left */}
                      {isActive && (
                        <div className="w-10 h-10 shrink-0 relative flex justify-center items-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle 
                              className="text-blue-950/20 stroke-current" 
                              strokeWidth="3" 
                              fill="transparent" 
                              r="16" cy="18" cx="18" 
                            />
                            <circle 
                              className="text-white stroke-current transition-all duration-75 ease-linear" 
                              strokeWidth="3" 
                              strokeDasharray={`${progress}, 100`} 
                              fill="transparent" 
                              r="16" cy="18" cx="18" 
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right Display Area */}
            <div className="w-full md:w-7/12 bg-blue-950 rounded-[2rem] overflow-hidden relative shadow-inner p-8 md:p-14 border border-blue-800 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="w-full flex-col flex"
                >
                  <div className="w-20 h-20 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-8 border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                    {offerings[activeIndex].icon}
                  </div>
                  
                  <motion.h4 
                    className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-white uppercase font-modern"
                    layoutId={`title-${activeIndex}`}
                  >
                    {offerings[activeIndex].subtitle}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-xl md:text-2xl font-medium text-blue-200 leading-relaxed"
                  >
                    {offerings[activeIndex].desc}
                  </motion.p>
                  
                  <div className="mt-12 flex gap-4 border-t border-blue-800 pt-8">
                     <span className="font-mono text-xs uppercase px-4 py-2 bg-blue-900 text-blue-300 rounded-lg border border-blue-800">Performance Measured</span>
                     <span className="font-mono text-xs uppercase px-4 py-2 bg-sky-500/20 text-sky-400 rounded-lg border border-sky-400/30">Active Sub-systems</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
