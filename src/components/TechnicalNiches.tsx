import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import { Rocket, GitMerge, Fingerprint, Activity, Layers, ArrowUpRight } from 'lucide-react';
import GlitchEntrance from './GlitchEntrance';
import { useStore } from '../store';

const offerings = [
  {
    id: "startup-launch",
    title: "STARTUP LAUNCH",
    subtitle: "From Zero to Series A scale.",
    desc: "We engineer MVPs that don't need to be rewritten in 6 months. Absolute velocity, serverless infrastructure, and a codebase ready for massive user acquisition bursts.",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const setCursorType = useStore((state) => state.setCursorType);

  return (
    <section 
      id="tech-niches" 
      ref={containerRef}
      className="bg-blue-950 relative z-30 text-blue-50 w-full min-h-screen py-32 px-6 md:px-12 border-t border-blue-900/50"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 40px)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative py-12">
        
        {/* Left: Sticky Header Area */}
        <div className="w-full lg:w-5/12 relative">
          <div className="sticky top-32 lg:top-40 flex flex-col z-20">
            <GlitchEntrance id="tech-niches-glitch">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-900/30 border border-sky-500/30 text-sky-400 text-xs font-mono mb-8 uppercase tracking-widest">
                <Layers size={14} /> Service Topologies
              </div>
              
              <h2 className="text-[3.5rem] md:text-[5rem] xl:text-[6.5rem] tracking-tighter leading-[0.9] mb-6">
                <span className="font-serif italic font-normal text-blue-300">Tailored</span> <br/>
                <span className="font-black text-white uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-sky-200 drop-shadow-lg">Bundles.</span>
              </h2>
              
              <p className="text-lg md:text-xl text-blue-200/80 font-medium tracking-tight leading-relaxed max-w-md mb-12">
                We structure our engineering squads precisely for the phase you are in. Focused, relentless technical execution.
              </p>

              {/* Progress Tracker Line */}
              <div className="hidden lg:block w-full max-w-[12rem] h-[3px] bg-blue-900/50 rounded-full relative overflow-hidden">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-sky-400"
                   style={{ scaleX: scrollYProgress, originX: 0 }}
                 />
              </div>
            </GlitchEntrance>
          </div>
        </div>

        {/* Right: Scrolling Cards */}
        <div className="w-full lg:w-7/12 flex flex-col gap-10 md:gap-16 relative z-10 lg:pb-32">
          {offerings.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className="group relative bg-blue-900/40 backdrop-blur-xl border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 overflow-hidden hover:border-sky-500/50 hover:bg-blue-900/60 transition-all duration-500 shadow-2xl"
            >
              {/* Card Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Massive phase number */}
              <div className="absolute -top-6 -right-6 text-[10rem] md:text-[14rem] font-black leading-none text-white/[0.03] group-hover:text-sky-400/[0.05] transition-colors duration-500 pointer-events-none select-none">
                0{idx + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-blue-950 flex items-center justify-center text-sky-400 border border-sky-900/50 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                     {item.icon}
                  </div>
                  <ArrowUpRight className="text-blue-700 group-hover:text-sky-400 transition-colors duration-300 w-10 h-10" />
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <div className="font-mono text-sm font-bold text-sky-400 tracking-widest uppercase">
                    Phase 0{idx + 1}
                  </div>
                  <div className="h-[1px] flex-1 bg-blue-800/50" />
                </div>

                <h3 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
                  {item.title}
                </h3>
                
                <h4 className="text-xl md:text-2xl font-bold font-modern text-blue-200 mb-6">
                  {item.subtitle}
                </h4>

                <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed font-medium">
                  {item.desc}
                </p>

                <div className="mt-10 pt-8 border-t border-blue-800/50 flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-xl bg-blue-950 border border-blue-900/50 text-xs font-mono text-blue-300 uppercase tracking-wider font-semibold">
                    Core Module
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-sky-900/20 border border-sky-800/30 text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold">
                    Active System
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
