import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import GlitchEntrance from './GlitchEntrance';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BrainModel } from './ThreeModels/BrainModel';
import ModelContainer from './ThreeModels/ModelContainer';

const radarData = [
  { subject: 'Pattern Recognition', A: 120, fullMark: 150 },
  { subject: 'Latency', A: 98, fullMark: 150 },
  { subject: 'Compute Efficiency', A: 86, fullMark: 150 },
  { subject: 'Model Trimming', A: 99, fullMark: 150 },
  { subject: 'Edge Inference', A: 85, fullMark: 150 },
  { subject: 'Data Synthesis', A: 65, fullMark: 150 },
];

const generateWaveData = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    name: i,
    load: Math.random() * 1000 + 500,
    predictive: Math.random() * 800 + 200,
  }));
};

export default function AiServices() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const [waveData, setWaveData] = useState(generateWaveData());
  const [viewMode, setViewMode] = useState<'radar' | '3d'>('radar');

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveData(generateWaveData());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ai-services" ref={ref} className="py-32 px-6 md:px-12 bg-orange-50 relative max-w-7xl mx-auto min-h-screen flex items-center snap-center w-full max-w-none">
      <GlitchEntrance id="ai-services-glitch" className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto">
        
        {/* TEXT CONTENT */}
        <motion.div style={{ opacity }} className="relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-1 mb-8 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 font-mono text-sm tracking-widest uppercase"
          >
            System Sub-Routines Active
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[4rem] md:text-[6rem] tracking-tighter mb-8 leading-none"
          >
            <span className="font-serif italic font-normal text-orange-400">Cognitive</span> <br/> <span className="font-modern font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-rose-600 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)] uppercase">Telemetry.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-orange-950/70 font-medium mb-12 max-w-lg leading-relaxed"
          >
            Standard AI is a wrapper around an API. We build native neural interfaces that monitor, predict, and adapt to your infrastructure in real-time.
          </motion.p>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 border-l-4 border-orange-500 bg-orange-100 backdrop-blur-md"
            >
               <h4 className="text-orange-600 font-bold text-xl uppercase mb-2">Predictive Scaling</h4>
               <p className="text-orange-950/60">Models analyzed raw HTTP traffic to auto-provision nodes before load spikes hit.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 border-l-4 border-rose-400 bg-white/60 backdrop-blur-md hover:border-orange-500/50 transition-colors shadow-sm"
            >
               <h4 className="text-orange-950 font-bold text-xl uppercase mb-2">Local Edge LLMs</h4>
               <p className="text-orange-950/50">Compiling 7B parameter models to run entirely via local WebGPU for zero-latency operations.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* DATA VIZ DASHBOARD */}
        <motion.div style={{ scale, opacity }} className="h-[600px] flex flex-col gap-8">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 rounded-[2rem] bg-white border border-orange-200 backdrop-blur-xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-center"
          >
            <div className="absolute top-4 left-4 text-orange-500/50 font-mono text-xs uppercase tracking-wider select-none z-10">
              {viewMode === 'radar' ? 'Telemetry RADAR' : 'NEURAL CORE MESH'}
            </div>

            {/* Toggle view button */}
            <div className="absolute top-4 right-4 flex items-center bg-orange-100/80 rounded-full p-1 border border-orange-200 z-30 select-none">
              <button 
                type="button"
                onClick={() => setViewMode('radar')}
                className={`px-3 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer ${viewMode === 'radar' ? 'bg-orange-600 text-white font-bold shadow-sm' : 'text-orange-950/60 hover:text-orange-950'}`}
              >
                RADAR
              </button>
              <button 
                type="button"
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1 text-[10px] font-mono rounded-full transition-all cursor-pointer ${viewMode === '3d' ? 'bg-orange-600 text-white font-bold shadow-sm' : 'text-orange-950/60 hover:text-orange-950'}`}
              >
                3D MESH
              </button>
            </div>

            <div className="w-full h-full min-h-[300px] flex items-center justify-center pt-6">
              {viewMode === 'radar' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="rgba(249,115,22,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(249,115,22,0.8)', fontSize: 10, fontFamily: 'monospace' }} />
                    <Radar name="System" dataKey="A" stroke="#f97316" strokeWidth={2} fill="#f97316" fillOpacity={0.1} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full">
                  <ModelContainer>
                    <BrainModel />
                  </ModelContainer>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="h-[200px] rounded-[2rem] bg-white border border-rose-200 backdrop-blur-xl p-6 relative overflow-hidden shadow-lg"
          >
             <div className="absolute top-4 left-4 text-rose-400/50 font-mono text-xs">REALTIME_LOAD_PREDICTION</div>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="load" stroke="#f43f5e" fillOpacity={1} fill="url(#colorLoad)" isAnimationActive={true} animationDuration={1000} />
                  <Area type="monotone" dataKey="predictive" stroke="#fb923c" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" isAnimationActive={true} animationDuration={1000} />
                </AreaChart>
             </ResponsiveContainer>
          </motion.div>

        </motion.div>

      </div>
      </GlitchEntrance>
    </section>
  );
}
