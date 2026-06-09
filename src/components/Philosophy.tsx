import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Philosophy() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  const items = [
    {
      title: "OBSERVE.",
      desc: "We do not guess. We analyze your telemetry, user behavior, and infrastructure bottlenecks before writing a single line of logic. Silence the noise, find the signal.",
      color: "text-lime-400",
      bg: "bg-lime-950/20",
      border: "border-lime-500/20"
    },
    {
      title: "EMBED.",
      desc: "We don't do weekly syncs. We integrate directly into your Slack, Jira, and Git repositories. It feels like an internal hire, but with the velocity of an elite unit.",
      color: "text-amber-400",
      bg: "bg-amber-950/20",
      border: "border-amber-500/20"
    },
    {
      title: "SHIP.",
      desc: "Deployment is not a ceremony. It is a daily habit. Continuous integration, rigorous testing, and flawless rollouts. Speed without sacrificing stability.",
      color: "text-rose-400",
      bg: "bg-rose-950/20",
      border: "border-rose-500/20"
    }
  ];

  return (
    <section ref={targetRef} id="philosophy" className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw] px-[10vw]">
          {items.map((item, i) => (
             <div key={i} className="w-[100vw] flex items-center justify-start shrink-0 pr-[10vw]">
               <div className={`p-12 md:p-24 rounded-[3rem] border backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden ${item.bg} ${item.border}`}>
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-20" />
                 <h2 className={`text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-none mb-8 ${item.color} drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]`}>
                   {item.title}
                 </h2>
                 <p className="text-2xl md:text-5xl text-zinc-200 font-medium max-w-4xl leading-snug tracking-tight">
                   {item.desc}
                 </p>
               </div>
             </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
