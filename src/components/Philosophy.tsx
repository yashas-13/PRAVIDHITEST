import { motion } from 'motion/react';
import GlitchEntrance from './GlitchEntrance';
import { Lock, ShieldCheck, FileCheck, Eye, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

export default function Philosophy() {
  const items = [
    {
      title: <><span className="font-serif italic font-normal">Audit.</span></>,
      desc: "Forensic telemetry, kernel profiling, and attack-surface analysis. We silence the noise, isolate attack vectors, and expose hidden cost-leakages with zero guesswork.",
      color: "text-emerald-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#047857]",
      number: "01",
      bgLayer: "bg-zinc-50",
      phaseTag: "PHASE 01: VULNERABILITY & INFERENCE AUDIT"
    },
    {
      title: <><span className="font-modern font-black">Harden.</span></>,
      desc: "Zero-trust boundaries, immutable infrastructure, and strict IAM governance executed directly by our 10-year veteran architect. Sovereign-grade security baked into every container.",
      color: "text-indigo-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#4338ca]",
      number: "02",
      bgLayer: "bg-zinc-100",
      phaseTag: "PHASE 02: ZERO-TRUST KERNEL & IAM HARDENING"
    },
    {
      title: <><span className="font-display font-black tracking-tight">Automate.</span></>,
      desc: "Compliance-as-code and automated CI/CD canary rollouts. Continuous CIS benchmark validation and auto-healing infrastructure that defends itself 24/7.",
      color: "text-teal-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#0f766e]",
      number: "03",
      bgLayer: "bg-zinc-200",
      phaseTag: "PHASE 03: CONTINUOUS DEVOPS & PROVABLE COMPLIANCE"
    }
  ];

  return (
    <section id="philosophy" className="relative w-full z-10 text-zinc-900 border-none">
      
      {/* High-Authority Confidentiality & Compliance Standard Banner */}
      <div className="bg-zinc-950 text-white py-16 px-6 md:px-12 border-b border-zinc-800 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-10 rounded-[2rem] bg-zinc-900/90 border border-teal-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(20,184,166,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
              <Lock size={160} />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono uppercase tracking-widest">
                  <ShieldCheck size={14} /> Confidentiality & Compliance Standard
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white font-sans">
                  Sovereign-Level Discretion. Zero-Trust Execution.
                </h3>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
                  Pravidhi operates under strict multi-government and sovereign-level NDAs. While our core architectural portfolio remains classified to safeguard national and enterprise security infrastructures, we bring those exact zero-trust engineering principles, hardened Linux configurations, and military-grade automation scripts directly to commercial enterprise systems.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <div className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2.5">
                  <FileCheck size={16} className="text-emerald-400" />
                  <span>Mutual NDA Executed Prior to Codebase Access</span>
                </div>
                <div className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-teal-400" />
                  <span>100% Client-Owned IP & Infrastructure Keys</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky 3-Phase Execution Breakdown */}
      {items.map((item, i) => (
        <div 
          key={i} 
          className={`min-h-screen sticky top-0 w-full flex items-center justify-center snap-center overflow-hidden ${item.bgLayer} shadow-2xl`}
          style={{ zIndex: i + 10 }}
        >
          {/* Huge Background Number */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-overlay">
             <span className="text-[60vw] font-black leading-none tracking-tighter [-webkit-text-stroke:4px_#000000] text-transparent">
               {item.number}
             </span>
          </div>

          <GlitchEntrance id={`philosophy-${item.number}`} className="w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Left/Top Content: Massive Typography */}
              <div className="relative h-[200px] md:h-[400px] flex items-center">
                <motion.h2 
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className={`absolute text-[5rem] md:text-[8rem] lg:text-[12rem] font-black tracking-tighter leading-none mb-4 ${item.color} mix-blend-multiply`}
                >
                  {item.title}
                </motion.h2>
                
                <motion.h2 
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: -10 }}
                   transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                   className={`absolute top-0 left-4 md:left-8 text-[5rem] md:text-[8rem] lg:text-[12rem] font-black tracking-tighter leading-none ${item.stroke} pointer-events-none opacity-50`}
                >
                  {item.title}
                </motion.h2>
              </div>

              {/* Right/Bottom Content: Interactive Light Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-xl group relative justify-self-center md:justify-self-end mt-12 md:mt-0"
              >
                <div className={`absolute -inset-0.5 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-current ${item.color}`} />
                
                <div className={`p-8 md:p-14 rounded-[2rem] border border-zinc-200 backdrop-blur-3xl relative overflow-hidden shadow-2xl ${item.bgLayer === 'bg-zinc-50' ? 'bg-white/70' : item.bgLayer === 'bg-zinc-100' ? 'bg-zinc-50/70' : 'bg-zinc-100/70'}`}>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent" />
                  
                  <div className="mb-4">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full border border-black/10">
                      {item.phaseTag}
                    </span>
                  </div>

                  <p className="text-xl md:text-3xl text-zinc-800 font-medium leading-relaxed tracking-tight relative z-10">
                    {item.desc}
                  </p>

                  <div className="mt-8 md:mt-12 flex items-center justify-between border-t border-zinc-200 pt-6">
                     <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest border border-zinc-200 px-3 py-1 rounded-full bg-white/50">Execution Stage {item.number}</span>
                     <span className={`w-3 h-3 rounded-full bg-current ${item.color} shadow-[0_0_10px_currentColor] animate-pulse`} />
                  </div>
                </div>
              </motion.div>

            </div>
          </GlitchEntrance>
        </div>
      ))}
    </section>
  );
}
