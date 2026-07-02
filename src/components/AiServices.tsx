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

  const yTransform = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const [waveData, setWaveData] = useState(generateWaveData());

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveData(generateWaveData());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ai-services" ref={ref} className="py-32 px-6 md:px-12 bg-orange-50 relative w-full overflow-hidden">
      <GlitchEntrance id="ai-services-glitch" className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* CENTERED TEXT HEADER */}
        <div className="text-center w-full max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-8 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 font-mono text-sm tracking-widest uppercase"
          >
            System Sub-Routines Active
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[4rem] md:text-[6rem] lg:text-[7rem] tracking-tighter mb-8 leading-[0.9] flex flex-col items-center"
          >
            <span className="font-serif italic font-normal text-orange-400">Cognitive</span>
            <span className="font-modern font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-rose-700 drop-shadow-[0_4px_30px_rgba(249,115,22,0.3)] uppercase">Telemetry.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-orange-950/70 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Standard AI is a wrapper around an API. We build native neural interfaces that monitor, predict, and adapt to your infrastructure in real-time.
          </motion.p>
        </div>

        {/* 3-COLUMN DATA VIZ DASHBOARD */}
        <motion.div style={{ y: yTransform }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full relative z-10">
          
          {/* LEFT: Text Cards */}
          <div className="flex flex-col justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 rounded-[2rem] border border-orange-200 bg-white/70 backdrop-blur-xl shadow-xl flex-1 flex flex-col justify-center"
            >
               <h4 className="text-orange-600 font-black font-display text-3xl uppercase mb-4">Predictive Scaling</h4>
               <p className="text-orange-950/60 font-medium leading-relaxed">Models analyze raw HTTP traffic to auto-provision nodes before load spikes hit.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-8 rounded-[2rem] border border-rose-200 bg-white/70 backdrop-blur-xl shadow-xl hover:border-orange-500/50 transition-colors flex-1 flex flex-col justify-center"
            >
               <h4 className="text-rose-600 font-black font-display text-3xl uppercase mb-4">Local Edge LLMs</h4>
               <p className="text-orange-950/70 font-medium leading-relaxed">Compiling 7B parameter models to run entirely via local WebGPU for zero-latency ops.</p>
            </motion.div>
          </div>

          {/* CENTER: 3D Core */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-[2.5rem] bg-white border border-orange-200 backdrop-blur-xl p-8 relative overflow-hidden shadow-2xl min-h-[450px] lg:min-h-[600px] flex flex-col justify-center"
          >
            <div className="absolute top-6 left-6 text-orange-500/60 font-mono text-xs uppercase tracking-widest font-bold">
               NEURAL CORE MESH
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_70%)]" />
            <div className="w-full h-full">
              <ModelContainer>
                <BrainModel />
              </ModelContainer>
            </div>
          </motion.div>

          {/* RIGHT: Radar & Wave Dashboard */}
          <div className="flex flex-col justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-[2rem] bg-white border border-orange-200 backdrop-blur-xl p-6 relative shadow-xl flex-1 flex flex-col min-h-[300px]"
            >
              <div className="text-orange-500/50 font-mono text-[10px] uppercase tracking-wider mb-2">Telemetry RADAR</div>
              <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="rgba(249,115,22,0.15)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(249,115,22,0.8)', fontSize: 9, fontFamily: 'monospace' }} />
                    <Radar name="System" dataKey="A" stroke="#f97316" strokeWidth={2} fill="#f97316" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-[2rem] bg-white border border-rose-200 backdrop-blur-xl p-6 relative shadow-xl flex-1 flex flex-col min-h-[250px]"
            >
               <div className="text-rose-400/50 font-mono text-[10px] uppercase tracking-wider mb-2">REALTIME_LOAD</div>
               <div className="flex-1 w-full min-h-[150px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={waveData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="load" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" isAnimationActive={true} animationDuration={1000} />
                      <Area type="monotone" dataKey="predictive" stroke="#fb923c" fillOpacity={0} strokeWidth={2} strokeDasharray="4 4" isAnimationActive={true} animationDuration={1000} />
                    </AreaChart>
                 </ResponsiveContainer>
               </div>
            </motion.div>
          </div>

        </motion.div>
      </GlitchEntrance>
    </section>
  );
}
