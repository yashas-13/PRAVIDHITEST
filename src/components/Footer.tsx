import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useRef } from 'react';

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <footer ref={ref} className="bg-black py-20 px-6 md:px-12 border-t border-white/10 overflow-hidden relative backdrop-blur-sm min-h-[50vh] flex flex-col justify-end snap-end w-full max-w-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10 pointer-events-auto w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-[4rem] md:text-[6rem] font-sans tracking-tighter mb-8 text-white max-w-lg leading-[0.9]">
            Let's <span className="font-serif italic text-zinc-300 font-normal">build</span> <br className="hidden md:block"/> something <span className="text-transparent [-webkit-text-stroke:2px_#ffffff] font-black">real.</span>
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
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="flex flex-col items-start md:items-end gap-6"
        >
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
        </motion.div>
      </div>
      
      {/* Background massive text */}
      <motion.div 
        style={{ scale, y }}
        className="absolute -bottom-8 md:-bottom-20 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none flex justify-center"
      >
        <h1 className="text-[20vw] md:text-[18vw] font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.05)] whitespace-nowrap tracking-tighter leading-none mix-blend-overlay">
          P<span className="font-serif italic font-normal">RA</span>VI<span className="font-serif italic font-normal">DH</span>I.
        </h1>
      </motion.div>
    </footer>
  );
}
