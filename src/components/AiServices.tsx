import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveData(generateWaveData());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ai-services" ref={ref} className="py-32 px-6 md:px-12 bg-transparent relative max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* TEXT CONTENT */}
        <motion.div style={{ opacity }} className="relative z-10 w-full">
          <div className="inline-block px-4 py-1 mb-8 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-sm tracking-widest uppercase">
            System Sub-Routines Active
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase text-white leading-none">
            Cognitive <br/> <span className="text-red-500">Telemetry.</span>
          </h2>
          <p className="text-xl text-zinc-400 font-medium mb-12 max-w-lg leading-relaxed">
            Standard AI is a wrapper around an API. We build native neural interfaces that monitor, predict, and adapt to your infrastructure in real-time.
          </p>

          <div className="space-y-6">
            <div className="p-6 border-l-4 border-red-500 bg-red-950/20 backdrop-blur-md">
               <h4 className="text-red-400 font-bold text-xl uppercase mb-2">Predictive Scaling</h4>
               <p className="text-zinc-400">Models analyzed raw HTTP traffic to auto-provision nodes before load spikes hit.</p>
            </div>
            <div className="p-6 border-l-4 border-zinc-700 bg-zinc-900/40 backdrop-blur-md">
               <h4 className="text-zinc-300 font-bold text-xl uppercase mb-2">Local Edge LLMs</h4>
               <p className="text-zinc-500">Compiling 7B parameter models to run entirely via local WebGPU for zero-latency operations.</p>
            </div>
          </div>
        </motion.div>

        {/* DATA VIZ DASHBOARD */}
        <motion.div style={{ scale, opacity }} className="h-[600px] flex flex-col gap-8">
          
          <div className="flex-1 rounded-[2rem] bg-black/60 border border-red-500/20 backdrop-blur-xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <div className="absolute top-4 left-4 text-red-500/50 font-mono text-xs">RADAR_SIG_01</div>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(239,68,68,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
                <Radar name="System" dataKey="A" stroke="#ef4444" strokeWidth={2} fill="#ef4444" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px] rounded-[2rem] bg-black/60 border border-white/10 backdrop-blur-xl p-6 relative overflow-hidden">
             <div className="absolute top-4 left-4 text-zinc-500/50 font-mono text-xs">REALTIME_LOAD_PREDICTION</div>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="load" stroke="#ef4444" fillOpacity={1} fill="url(#colorLoad)" isAnimationActive={true} animationDuration={1000} />
                  <Area type="monotone" dataKey="predictive" stroke="#4f46e5" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" isAnimationActive={true} animationDuration={1000} />
                </AreaChart>
             </ResponsiveContainer>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
