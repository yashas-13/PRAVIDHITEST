import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export default function Philosophy() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Adding a spring to smooth out the scroll progress for parallax layers
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-66%"]);
  const layer1X = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const layer2X = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  const items = [
    {
      title: <><span className="font-serif italic font-normal">Observe.</span></>,
      desc: "We analyze telemetry and user behavior. Silence the noise, find the signal. No guesswork, absolute precision.",
      color: "text-lime-400",
      stroke: "text-transparent [-webkit-text-stroke:2px_#a3e635]",
      number: "01",
    },
    {
      title: <><span className="font-sans font-black">Embed.</span></>,
      desc: "We integrate directly into your workflow. It feels like an internal hire, but with the velocity of an elite external unit.",
      color: "text-amber-400",
      stroke: "text-transparent [-webkit-text-stroke:2px_#fbbf24]",
      number: "02",
    },
    {
      title: <><span className="font-serif italic font-normal">Ship.</span></>,
      desc: "Deployment is a daily habit. Continuous integration, rigorous testing, and flawless rollouts. Speed with stability.",
      color: "text-rose-400",
      stroke: "text-transparent [-webkit-text-stroke:2px_#fb7185]",
      number: "03",
    }
  ];

  return (
    <section ref={targetRef} id="philosophy" className="relative h-[300vh] bg-transparent snap-start">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Parallax Layer - Massive Outlined Numbers */}
        <motion.div style={{ x: layer2X }} className="absolute flex w-[300vw] px-[10vw] pointer-events-none z-0 mix-blend-overlay">
           {items.map((item, i) => (
             <div key={`bg-${i}`} className="w-[100vw] shrink-0 flex items-center justify-center opacity-10">
               <span className="text-[40vw] font-black leading-none tracking-tighter [-webkit-text-stroke:4px_#ffffff] text-transparent">
                 {item.number}
               </span>
             </div>
           ))}
        </motion.div>

        {/* Main Content Layer */}
        <motion.div style={{ x }} className="relative z-10 flex w-[300vw] px-[10vw] h-full items-center">
          {items.map((item, i) => (
             <div key={i} className="w-[100vw] flex flex-col md:flex-row items-center justify-center shrink-0 pr-[10vw] gap-12">
               
               {/* Left/Top Content: Massive Typography */}
               <div className="flex-1 w-full relative">
                 <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-[0.8] mb-4 ${item.color} mix-blend-plus-lighter`}
                 >
                   {item.title}
                 </motion.h2>
                 
                 {/* Duplicated Outline for glitch/depth effect */}
                 <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className={`absolute top-0 left-4 md:left-8 text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-[0.8] ${item.stroke} pointer-events-none opacity-50`}
                 >
                   {item.title}
                 </motion.h2>
               </div>

               {/* Right/Bottom Content: Interactive Glass Card */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: false, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="flex-1 w-full max-w-xl group relative"
               >
                 {/* Hover Glow Effect */}
                 <div className={`absolute -inset-0.5 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-current ${item.color}`} />
                 
                 <div className="p-8 md:p-14 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-3xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                   
                   <p className="text-2xl md:text-3xl text-zinc-300 font-medium leading-relaxed tracking-tight relative z-10">
                     {item.desc}
                   </p>

                   {/* Sub-element for decorative tech detail */}
                   <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
                      <span className="font-mono text-xs text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">Phase {item.number}</span>
                      <span className={`w-3 h-3 rounded-full bg-current ${item.color} shadow-[0_0_10px_currentColor] animate-pulse`} />
                   </div>
                 </div>
               </motion.div>

             </div>
          ))}
        </motion.div>

        {/* Foreground Parallax Layer - Floating Particles or abstract shapes */}
        <motion.div style={{ x: layer1X }} className="absolute inset-0 flex w-[300vw] pointer-events-none z-20">
           {/* We can leave this empty or add glowing orbs/shapes that move at a different speed */}
           <div className="w-[100vw] h-full relative">
              <div className="absolute top-[20%] right-[20%] w-32 h-32 rounded-full bg-lime-500/10 blur-3xl mix-blend-screen" />
           </div>
           <div className="w-[100vw] h-full relative">
              <div className="absolute bottom-[20%] left-[20%] w-64 h-64 rounded-full bg-amber-500/10 blur-3xl mix-blend-screen" />
           </div>
           <div className="w-[100vw] h-full relative">
              <div className="absolute top-[40%] right-[40%] w-48 h-48 rounded-full bg-rose-500/10 blur-3xl mix-blend-screen" />
           </div>
        </motion.div>

      </div>
    </section>
  );
}
