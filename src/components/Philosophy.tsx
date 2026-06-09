import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export default function Philosophy() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-66%"]);
  const layer1X = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const layer2X = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);
  
  // Advanced Y Parallax for headings representing angled velocity
  const headingY1 = useTransform(smoothProgress, [0, 0.5], [150, -50]);
  const headingY2 = useTransform(smoothProgress, [0.2, 0.7], [250, -100]);
  const headingY3 = useTransform(smoothProgress, [0.4, 1], [350, -150]);

  const items = [
    {
      title: <><span className="font-serif italic font-normal">Observe.</span></>,
      desc: "We analyze telemetry and user behavior. Silence the noise, find the signal. No guesswork, absolute precision.",
      color: "text-emerald-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#047857]",
      number: "01",
      yParallax: headingY1
    },
    {
      title: <><span className="font-modern font-black">Embed.</span></>,
      desc: "We integrate directly into your workflow. It feels like an internal hire, but with the velocity of an elite external unit.",
      color: "text-indigo-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#4338ca]",
      number: "02",
      yParallax: headingY2
    },
    {
      title: <><span className="font-display font-black tracking-tight">Ship.</span></>,
      desc: "Deployment is a daily habit. Continuous integration, rigorous testing, and flawless rollouts. Speed with stability.",
      color: "text-rose-700",
      stroke: "text-transparent [-webkit-text-stroke:2px_#be123c]",
      number: "03",
      yParallax: headingY3
    }
  ];

  return (
    <section ref={targetRef} id="philosophy" className="relative h-[300vh] bg-zinc-50 text-zinc-900 snap-start">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Parallax Layer */}
        <motion.div style={{ x: layer2X }} className="absolute flex w-[300vw] px-[10vw] pointer-events-none z-0 mix-blend-overlay">
           {items.map((item, i) => (
             <div key={`bg-${i}`} className="w-[100vw] shrink-0 flex items-center justify-center opacity-[0.03]">
               <span className="text-[40vw] font-black leading-none tracking-tighter [-webkit-text-stroke:4px_#000000] text-transparent">
                 {item.number}
               </span>
             </div>
           ))}
        </motion.div>

        {/* Main Content Layer */}
        <motion.div style={{ x }} className="relative z-10 flex w-[300vw] px-[10vw] h-full items-center">
          {items.map((item, i) => (
             <div key={i} className="w-[100vw] flex flex-col md:flex-row items-center justify-center shrink-0 pr-[10vw] gap-12">
               
               {/* Left/Top Content: Massive Typography with Y Parallax */}
               <div className="flex-1 w-full relative h-[400px]">
                 <motion.h2 
                    style={{ y: item.yParallax }}
                    className={`absolute inset-0 text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-[0.8] mb-4 ${item.color} mix-blend-multiply`}
                 >
                   {item.title}
                 </motion.h2>
                 
                 <motion.h2 
                    style={{ y: item.yParallax, x: -10 }}
                    className={`absolute inset-0 top-0 left-4 md:left-8 text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-[0.8] ${item.stroke} pointer-events-none opacity-50`}
                 >
                   {item.title}
                 </motion.h2>
               </div>

               {/* Right/Bottom Content: Interactive Light Card */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: false, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="flex-1 w-full max-w-xl group relative"
               >
                 <div className={`absolute -inset-0.5 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-current ${item.color}`} />
                 
                 <div className="p-8 md:p-14 rounded-[2rem] border border-zinc-200 bg-white/70 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent" />
                   
                   <p className="text-2xl md:text-3xl text-zinc-800 font-medium leading-relaxed tracking-tight relative z-10">
                     {item.desc}
                   </p>

                   <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6">
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest border border-zinc-200 px-3 py-1 rounded-full bg-zinc-100">Phase {item.number}</span>
                      <span className={`w-3 h-3 rounded-full bg-current ${item.color} shadow-[0_0_10px_currentColor] animate-pulse`} />
                   </div>
                 </div>
               </motion.div>

             </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
