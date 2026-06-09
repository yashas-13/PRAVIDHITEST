import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { useStore } from '../store';

export default function Hero() {
  const setCursorType = useStore((state) => state.setCursorType);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden bg-transparent pointer-events-none">
      {/* Background glow removed to let WebGL shine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-auto">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-teal-400 text-xs font-mono mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            System Online // 2026 Ready
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            Embedded, <br />
            Not <span className="text-zinc-600">Observed.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-lg mb-10"
            onMouseEnter={() => setCursorType('text')}
            onMouseLeave={() => setCursorType('default')}
          >
            We don't just consult. We code, build, and deploy within your infrastructure. A high-end digital team seamlessly embedded in your vision.
          </motion.p>

          {/* Unique Button Placement: Floating Circular Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            className="fixed bottom-12 right-12 md:bottom-24 md:right-24 z-50 pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center text-black font-black uppercase text-xl transition-shadow hover:shadow-[0_0_60px_rgba(20,184,166,0.6)] cursor-none"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="absolute inset-0 rounded-full border-2 border-white/50 border-dashed animate-[spin_10s_linear_infinite]" />
              <div className="text-center leading-tight">
                Start<br/>Now
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Pseudo-Terminal Interface */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="hidden lg:block w-full h-[450px] border border-zinc-800 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl relative"
        >
          <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 border border-red-500/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 border border-green-500/50" />
            <div className="ml-4 font-mono text-xs text-zinc-500 flex items-center gap-2">
              <Terminal size={14} /> root@pravidhi ~
            </div>
          </div>
          <div className="p-8 font-mono text-sm leading-relaxed">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
            >
              <span className="text-teal-400 font-bold">➜</span> <span className="text-blue-400 font-bold">~</span> pnpm init pravidhi
            </motion.div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.6 }}
               className="mt-4 text-zinc-400"
            >
              Initializing high-performance digital team...<br/>
              <span className="text-green-400">✔</span> Connecting to infrastructure<br/>
              <span className="text-green-400">✔</span> Aligning with business goals<br/>
              <span className="text-green-400">✔</span> Writing clean, scalable code<br/>
            </motion.div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2.4 }}
               className="mt-6 text-green-400 font-bold"
            >
              Success! Team embedded and ready to build.
            </motion.div>
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 3.0 }}
               className="mt-4"
            >
              <span className="text-teal-400 font-bold">➜</span> <span className="text-blue-400 font-bold">~</span> <span className="w-2.5 h-5 bg-zinc-300 inline-block animate-pulse align-middle" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
