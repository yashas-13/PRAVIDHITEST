import { motion } from 'motion/react';
import { Trophy, Award, Shield, Star, ArrowUpRight } from 'lucide-react';
import GlitchEntrance from './GlitchEntrance';
import { useStore } from '../store';

const AWARDS = [
  {
    id: "cloud-innovator",
    title: "Global Cloud Innovator",
    year: "2025",
    org: "TechArchitecture Digest",
    desc: "Recognizing excellence in distributed edge architectures and zero-downtime multi-region failover meshes.",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-amber-400/20 to-amber-500/5",
    accent: "text-amber-600",
    border: "border-amber-400/30",
    shadow: "shadow-[0_0_40px_rgba(251,191,36,0.15)] hover:shadow-[0_0_60px_rgba(251,191,36,0.3)]",
    bg: "bg-amber-50/30"
  },
  {
    id: "ux-excellence",
    title: "Platform UX Excellence",
    year: "2024",
    org: "Digital Design Awards",
    desc: "Awarded for elevating enterprise conversion rates through highly immersive WebGL experiences and micro-interactions.",
    icon: <Award className="w-8 h-8" />,
    color: "from-fuchsia-500/20 to-fuchsia-500/5",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-500/30",
    shadow: "shadow-[0_0_40px_rgba(217,70,239,0.15)] hover:shadow-[0_0_60px_rgba(217,70,239,0.3)]",
    bg: "bg-fuchsia-50/30"
  },
  {
    id: "cyber-flagship",
    title: "Cybersecurity Flagship",
    year: "2024",
    org: "Enterprise SecTech",
    desc: "Zero breaches across 50+ enterprise deployments. Absolute operational zero-trust adherence verified by third-party audits.",
    icon: <Shield className="w-8 h-8" />,
    color: "from-teal-500/20 to-teal-500/5",
    accent: "text-teal-600",
    border: "border-teal-500/30",
    shadow: "shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:shadow-[0_0_60px_rgba(20,184,166,0.3)]",
    bg: "bg-teal-50/30"
  },
  {
    id: "fast-50",
    title: "Fast 50 Rising Tech",
    year: "2025",
    org: "Global Business Index",
    desc: "Recognized for massive scale engineering and exceptional operational deployment speeds across multiple continents.",
    icon: <Star className="w-8 h-8" />,
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-600",
    border: "border-blue-500/30",
    shadow: "shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.3)]",
    bg: "bg-blue-50/30"
  }
];

export default function Awards() {
  const setCursorType = useStore((state) => state.setCursorType);

  return (
    <section id="awards" className="relative z-30 py-40 px-6 md:px-12 bg-white max-w-none w-full min-h-screen flex flex-col justify-center snap-center items-center">
      <GlitchEntrance id="awards-glitch" className="w-full">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Centered Header Title */}
          <div className="text-center mb-20 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-8 uppercase tracking-widest"
            >
              <Trophy size={14} className="text-amber-500" /> Recognized Excellence
            </motion.div>
            
            <h2 className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-sans tracking-tighter mb-6 leading-none">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-700 to-teal-900 uppercase">INDUSTRY</span> <br/> 
              <span className="font-serif italic text-emerald-900/30 font-normal">Acclaimed.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-emerald-950/60 font-medium leading-relaxed max-w-2xl mx-auto">
              Our commitment to brutal technical perfection hasn't gone unnoticed. We build systems that win out in the market.
            </p>
          </div>

          {/* Centered 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {AWARDS.map((award, idx) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
                className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 border transition-all duration-700 ease-out cursor-pointer bg-white ${award.border} ${award.shadow}`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-zinc-50/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 bg-white border ${award.border} ${award.accent} shadow-md`}>
                      {award.icon}
                    </div>
                    <ArrowUpRight className="w-8 h-8 text-zinc-300 group-hover:text-zinc-600 transition-colors duration-500" />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className={`font-mono text-sm font-bold px-3 py-1 bg-white rounded-md border ${award.border} ${award.accent}`}>
                      {award.year}
                    </span>
                    <span className="text-sm font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                      {award.org}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-zinc-900 mb-4 group-hover:text-emerald-950 transition-colors duration-500">
                    {award.title}
                  </h3>

                  <p className="text-lg text-zinc-600 leading-relaxed font-medium mt-auto group-hover:text-zinc-800 transition-colors duration-500">
                    {award.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </GlitchEntrance>
    </section>
  );
}
