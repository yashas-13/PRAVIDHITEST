import { motion, useScroll, useTransform } from 'motion/react';
import { Code2, Smartphone, Cloud, Zap } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    title: "Web Platforms",
    desc: "React, Next.js, and immersive WebGL interfaces. Not just websites—applications.",
    icon: <Code2 className="w-10 h-10 text-black" />,
    color: "bg-teal-400",
    angle: 0
  },
  {
    title: "Mobile Native",
    desc: "Swift, Kotlin, React Native. Fluid 120fps mobile experiences.",
    icon: <Smartphone className="w-10 h-10 text-black" />,
    color: "bg-indigo-400",
    angle: 90
  },
  {
    title: "Cloud Arcs",
    desc: "AWS, GCP, edge-functions. Distributed systems for global scale.",
    icon: <Cloud className="w-10 h-10 text-black" />,
    color: "bg-sky-400",
    angle: 180
  },
  {
    title: "V-Max Tuning",
    desc: "Lighthouse 100, zero layout shifts, absolute minimal payload.",
    icon: <Zap className="w-10 h-10 text-black" />,
    color: "bg-amber-400",
    angle: 270
  }
];

export default function ServicesBento() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section id="services" ref={ref} className="py-32 h-[120vh] relative flex items-center justify-center overflow-hidden">
      
      {/* Background massive ring */}
      <motion.div 
        style={{ scale, rotate: rotation }}
        className="absolute w-[800px] h-[800px] border border-white/5 rounded-full border-dashed opacity-50"
      />
      <motion.div 
        style={{ scale, rotate: useTransform(rotation, r => -r) }}
        className="absolute w-[1200px] h-[1200px] border border-white/5 rounded-full opacity-30"
      />

      <div className="relative z-10 text-center mb-32 mix-blend-difference">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase text-white">
          Our Orbit.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-xl font-medium">
          A constellation of capabilities, all revolving around extreme performance.
        </p>
      </div>

      <motion.div 
        style={{ rotate: rotation, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {services.map((s, i) => {
          // Convert angle to radians for x, y offset
          const rad = (s.angle * Math.PI) / 180;
          const radius = 350; // distance from center
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={s.title}
              className="absolute pointer-events-auto group cursor-default"
              style={{ x, y }}
            >
              {/* Counter-rotate so text stays upright */}
              <motion.div style={{ rotate: useTransform(rotation, r => -r) }} className="relative">
                 <div className={`w-24 h-24 rounded-full ${s.color} flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:scale-125 transition-transform duration-500 z-20 relative`}>
                   {s.icon}
                 </div>
                 
                 {/* Tooltip content that appears on hover */}
                 <div className="absolute top-1/2 -translate-y-1/2 left-[120%] w-64 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 z-10">
                   <div className="p-6 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                     <h3 className={`text-xl font-black mb-2 uppercase text-white`}>{s.title}</h3>
                     <p className="text-zinc-400 font-medium text-sm">{s.desc}</p>
                   </div>
                 </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  );
}
