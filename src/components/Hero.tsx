import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Terminal, Shield, Cpu, Cloud, CheckCircle2, Lock, Sparkles } from 'lucide-react';
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
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 + i * 0.08 }}
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

  const scrollToSolutions = () => {
    const el = document.getElementById("productised-services") || document.getElementById("tech-niches") || document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const techStackCategories = [
    {
      title: "OS & Automation",
      icon: <Terminal size={14} className="text-teal-400" />,
      items: ["Linux Kernel Hardening", "Ansible", "Terraform", "Bash", "Python", "CI/CD"]
    },
    {
      title: "Security & Compliance",
      icon: <Shield size={14} className="text-emerald-400" />,
      items: ["Zero-Trust Architecture", "Penetration Testing", "IAM Governance", "SOC2 / DPDP Readiness"]
    },
    {
      title: "Cloud & AI Systems",
      icon: <Cloud size={14} className="text-sky-400" />,
      items: ["AWS", "Azure", "GCP", "MLOps", "Secure LLM Ingestion Pipelines"]
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-20 overflow-hidden bg-zinc-950 text-white snap-center">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-sky-500/10 blur-[160px] rounded-full pointer-events-none" />

      <GlitchEntrance id="hero-glitch">
        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left 7 Columns: Core Copy & Positioning */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-teal-500/30 text-teal-300 text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(20,184,166,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <Lock size={12} className="text-teal-400" />
            <span>10-Year Veteran • Sovereign-Grade DevSecOps & Multi-Cloud</span>
          </motion.div>
          
          <h1 
            className="text-[3.8rem] sm:text-[4.8rem] md:text-[5.8rem] lg:text-[6.6rem] tracking-tighter leading-[0.92] mb-8 relative z-10 font-sans"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            <RevealText text="Sovereign-Grade" className="font-modern font-black text-white" /> <br />
            <RevealText text="Infrastructure," className="font-serif italic font-normal text-zinc-300" /> <span className="font-serif italic font-normal text-teal-400">✳</span><br />
            <RevealText text="Cloud Automation," className="font-display font-black text-transparent [-webkit-text-stroke:2px_#ffffff]" /><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 font-sans font-black text-[3rem] sm:text-[4.2rem] md:text-[5rem] lg:text-[5.6rem]">
              & Secure AI Systems.
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-8 leading-relaxed font-medium"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            Engineered by a 10-year veteran with deep multi-cloud and global government-sector security expertise. We harden infrastructure, automate CI/CD pipelines, and secure enterprise AI deployments—delivered on flat-rate, fixed-scope cycles.
          </motion.p>

          {/* Direct CTA Action Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={scrollToSolutions}
              className="px-8 py-4 bg-teal-400 text-zinc-950 font-black text-sm uppercase tracking-wider rounded-full hover:bg-teal-300 shadow-[0_0_35px_rgba(45,212,191,0.4)] transition-all flex items-center gap-3 cursor-pointer"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <span>Explore Fixed-Price Solutions</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="#contact"
              className="px-6 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 font-mono text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Shield size={14} className="text-emerald-400" />
              <span>Request 14-Day Cycle Slot</span>
            </a>
          </motion.div>

          {/* Strategic Tech Stack Visual Additions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-800/80 pt-6"
          >
            {techStackCategories.map((cat, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
                  {cat.icon}
                  <span>{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] font-mono text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right 5 Columns: Sovereign-Grade Terminal Simulation */}
        <div className="lg:col-span-5 hidden lg:block">
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="w-full border border-zinc-800 bg-[#080808]/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] relative"
          >
            {/* Terminal Header */}
            <div className="h-12 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50" />
                <div className="ml-3 font-mono text-xs text-zinc-400 flex items-center gap-2">
                  <Terminal size={14} className="text-teal-400" /> root@pravidhi-sovereign-node:~
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                CIS-L2: COMPLIANT
              </span>
            </div>

            {/* Terminal Output */}
            <div className="p-6 font-mono text-xs leading-relaxed space-y-3">
              <div>
                <span className="text-teal-400 font-bold">➜</span> <span className="text-blue-400 font-bold">~</span> ansible-playbook sovereign_hardening.yml --tags=zero-trust
              </div>

              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.6 }}
                 className="text-zinc-400 space-y-1.5 pt-1"
              >
                <div className="text-zinc-500 font-bold">PLAY [Execute Sovereign-Grade Infrastructure Hardening] **********</div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>TASK [Linux Kernel Sysctl & Memory Lockdown] : OK</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>TASK [Multi-Cloud IAM Zero-Trust Egress Filtering] : OK</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>TASK [Terraform Multi-Region State Encryption (KMS)] : OK</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>TASK [Secure LLM Guardrails & VPC Private Link] : OK</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>TASK [DPDP & SOC2 Compliance-as-Code Evidence Run] : OK</span>
                </div>
              </motion.div>

              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.4 }}
                 className="p-3 bg-zinc-950 rounded-lg border border-teal-900/40 text-teal-300 font-mono text-[11px]"
              >
                <span className="font-bold text-emerald-400">PLAY RECAP:</span> 5 changed, 0 unreachable, 0 failed.<br/>
                <span className="text-zinc-400">STATUS: Sovereign Zero-Trust Perimeter Active. Ready for Flat-Rate Cycle Handover.</span>
              </motion.div>

              <div className="pt-2 text-zinc-500 flex items-center gap-2">
                <span className="text-teal-400 font-bold">➜</span> <span className="text-blue-400 font-bold">~</span> <span className="w-2 h-4 bg-teal-400 inline-block animate-pulse align-middle" />
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics Bar under Terminal */}
          <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-center">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-xl font-bold text-white">10+ Yrs</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Multi-Cloud Vet</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-xl font-bold text-teal-400">14-Day</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Fixed Cycles</div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="text-xl font-bold text-emerald-400">100%</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Confidentiality</div>
            </div>
          </div>
        </div>

      </div>
      </GlitchEntrance>
    </section>
  );
}
