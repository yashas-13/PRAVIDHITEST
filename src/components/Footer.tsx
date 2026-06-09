import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useRef } from 'react';

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <footer ref={ref} className="bg-transparent py-20 px-6 md:px-12 border-t border-white/5 overflow-hidden relative backdrop-blur-sm pointer-events-none min-h-[50vh] flex flex-col justify-end">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10 pointer-events-auto">
        <div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-white max-w-lg leading-[1.1]">
            Let's build <br className="hidden md:block"/> something <span className="text-zinc-600">real.</span>
          </h2>
          <a href="#">
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all"
              >
                Contact Pravidhi Solutions
             </motion.button>
          </a>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="font-mono text-zinc-500 text-sm">
            Based in reality. Available globally.
          </div>
          <div className="flex gap-4">
             <a href="#" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-700 hover:text-white transition-all text-zinc-400 group">
               <Github size={20} className="group-hover:scale-110 transition-transform" />
             </a>
             <a href="#" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-700 hover:text-white transition-all text-zinc-400 group">
               <Twitter size={20} className="group-hover:scale-110 transition-transform" />
             </a>
             <a href="#" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-700 hover:text-white transition-all text-zinc-400 group">
               <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
             </a>
          </div>
        </div>
      </div>
      
      {/* Background massive text */}
      <motion.div 
        style={{ scale, y }}
        className="absolute -bottom-8 md:-bottom-20 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none flex justify-center"
      >
        <h1 className="text-[20vw] md:text-[18vw] font-black text-zinc-900/40 whitespace-nowrap tracking-tighter leading-none">
          PRAVIDHI.
        </h1>
      </motion.div>
    </footer>
  );
}
