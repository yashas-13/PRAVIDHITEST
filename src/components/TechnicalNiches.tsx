import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Database, Layers, Shield } from 'lucide-react';

const niches = [
  {
    title: "DISTRIBUTED DATABASES",
    desc: "Sharded PostgreSQL. CockroachDB. Spanner. We architect systems where millions of rows per second is the baseline, not the breaking point.",
    icon: <Database size={48} className="text-white" />
  },
  {
    title: "EVENT-DRIVEN BACKENDS",
    desc: "Kafka clusters and serverless queues orchestrating chaotic microservices into a symphony of absolute reliability and zero dropped packets.",
    icon: <Layers size={48} className="text-white" />
  },
  {
    title: "ZERO-TRUST INFRA",
    desc: "Every payload encrypted. Every boundary authenticated. We build bunkers, not just servers. Iron-clad enterprise readiness from day one.",
    icon: <Shield size={48} className="text-white" />
  }
];

export default function TechnicalNiches() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Brutalist scroll mask: the whole section pushes up over the previous one like a concrete shutter
  const yOffset = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="tech-niches" ref={ref} className="bg-white min-h-screen relative z-30 pt-32 pb-48 text-black overflow-hidden flex items-center">
      
      {/* Moving harsh background pattern */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ 
          y: yOffset,
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 20px)` 
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b-8 border-black pb-8">
          <h2 className="text-7xl md:text-[8rem] font-black tracking-tighter uppercase leading-none">
            Technical<br/>Brutality.
          </h2>
          <p className="text-2xl font-bold max-w-sm text-right mt-8 md:mt-0 uppercase tracking-tight">
            Ugly under the hood? Never. We engineer raw perfection.
          </p>
        </div>

        <div className="flex flex-col border-t-2 border-black">
          {niches.map((noche, i) => (
             <div 
               key={i}
               onMouseEnter={() => setHoveredIndex(i)}
               onMouseLeave={() => setHoveredIndex(null)}
               className={`group border-b-2 border-black flex flex-col md:flex-row items-start md:items-center p-8 md:p-12 transition-colors duration-500 cursor-pointer
                 ${hoveredIndex === i ? 'bg-black text-white' : 'bg-transparent text-black'}
               `}
             >
               <div className="mb-6 md:mb-0 mr-12 mix-blend-difference">
                 {noche.icon}
               </div>
               <div className="flex-1">
                 <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">{noche.title}</h3>
                 <div className={`overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-64`}>
                    <p className="text-xl md:text-2xl font-medium max-w-4xl pt-4 border-t border-white/20">
                      {noche.desc}
                    </p>
                 </div>
               </div>
               <div className="hidden md:block text-6xl font-black mix-blend-difference opacity-20">
                 0{i+1}
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
