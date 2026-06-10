import { motion } from 'motion/react';
import GlitchEntrance from './GlitchEntrance';

export default function Philosophy() {
  const items = [
    {
      title: <><span className="font-serif italic font-normal">Observe.</span></>,
      desc: "We analyze telemetry and user behavior. Silence the noise, find the signal. No guesswork, absolute precision.",
      color: "text-emerald-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#047857]",
      number: "01",
      bgLayer: "bg-zinc-50"
    },
    {
      title: <><span className="font-modern font-black">Embed.</span></>,
      desc: "We integrate directly into your workflow. It feels like an internal hire, but with the velocity of an elite external unit.",
      color: "text-indigo-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#4338ca]",
      number: "02",
      bgLayer: "bg-zinc-100"
    },
    {
      title: <><span className="font-display font-black tracking-tight">Ship.</span></>,
      desc: "Deployment is a daily habit. Continuous integration, rigorous testing, and flawless rollouts. Speed with stability.",
      color: "text-rose-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#be123c]",
      number: "03",
      bgLayer: "bg-zinc-200"
    }
  ];

  return (
    <section id="philosophy" className="relative w-full z-10 text-zinc-900 border-none">
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
                  
                  <p className="text-xl md:text-3xl text-zinc-800 font-medium leading-relaxed tracking-tight relative z-10">
                    {item.desc}
                  </p>

                  <div className="mt-8 md:mt-12 flex items-center justify-between border-t border-zinc-200 pt-6">
                     <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest border border-zinc-200 px-3 py-1 rounded-full bg-white/50">Phase {item.number}</span>
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
