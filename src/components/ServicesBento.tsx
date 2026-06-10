import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import GlitchEntrance from './GlitchEntrance';
import { 
  Code2, Smartphone, Cloud, Zap, X, Sparkles, Play, RefreshCw, CheckCircle2, 
  Flame, MonitorPlay, Wifi, Layers, Cpu, Database, Gauge, ChevronRight, Activity
} from 'lucide-react';
import { ArchitectureModel } from './ThreeModels/ArchitectureModel';
import ModelContainer from './ThreeModels/ModelContainer';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  theme: string;
  gradient: string;
  borderColor: string;
  highlightText: string;
}

const SERVICES_DATA: Service[] = [
  {
    id: "web-platforms",
    title: "Web Platforms",
    subtitle: "Immersive WebGL & Next.js systems built for extreme interactive retention.",
    tag: "Next-Gen Frontend",
    theme: "emerald",
    gradient: "from-emerald-500/10 via-teal-950/20 to-black/80",
    borderColor: "group-hover:border-emerald-500/50 border-white/5",
    highlightText: "text-emerald-400"
  },
  {
    id: "mobile-native",
    title: "Mobile Native",
    subtitle: "Lag-free 120FPS iOS and Android experiences native to the core.",
    tag: "High-FPS Experience",
    theme: "indigo",
    gradient: "from-indigo-500/10 via-violet-950/20 to-black/80",
    borderColor: "group-hover:border-indigo-500/50 border-white/5",
    highlightText: "text-indigo-400"
  },
  {
    id: "cloud-arcs",
    title: "Cloud Architectures",
    subtitle: "Self-healing global edge meshes built to survive intense scale.",
    tag: "Distributed Core",
    theme: "sky",
    gradient: "from-sky-500/10 via-blue-950/20 to-black/80",
    borderColor: "group-hover:border-sky-500/50 border-white/5",
    highlightText: "text-sky-400"
  },
  {
    id: "performance-tuning",
    title: "V-Max Tuning",
    subtitle: "Brutal payload compressions and runtime speeds to reach Lighthouse 100.",
    tag: "Zero-Overhead Scale",
    theme: "amber",
    gradient: "from-amber-500/10 via-orange-950/20 to-black/80",
    borderColor: "group-hover:border-amber-500/50 border-white/5",
    highlightText: "text-amber-400"
  }
];

export default function ServicesBento() {
  const [activeService, setActiveService] = useState<string | null>(null);

  // States for micro-interactions within the Bento Grid cards
  const [typedCodeIdx, setTypedCodeIdx] = useState(0);
  const [fpsVal, setFpsVal] = useState(60);
  const [activeNodes, setActiveNodes] = useState<boolean[]>([true, true, true, true]);
  const [compressionRatio, setCompressionRatio] = useState(1); // 1 to 10 scale (where 10 is max compressed)

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headingYPos1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const headingYPos2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Web typed interactive simulated lines
  const codeSnippets = [
    "const renderMesh = () => <Canvas ... />",
    "export const dynamic = 'force-dynamic';",
    "const response = await edge.compute();",
    "export default async function App() { ... }"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedCodeIdx((prev) => (prev + 1) % codeSnippets.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Compute stats for compression simulation
  const computedPayloadSize = (12.4 / compressionRatio).toFixed(2);
  const computedLoadTime = (3.1 / compressionRatio).toFixed(2);
  const computedLighthouse = Math.round(35 + (65 * (compressionRatio / 10)));

  return (
    <section ref={sectionRef} id="services" className="py-24 relative z-30 px-4 w-full bg-zinc-950 text-white snap-center min-h-screen flex items-center justify-center">
      <GlitchEntrance id="services-bento-glitch" className="w-full">
        <div className="max-w-7xl mx-auto w-full">
      {/* Title block with interactive glow lines */}
      <div className="mb-20 text-center flex flex-col items-center justify-center relative min-h-[300px]">
        <div className="absolute inset-0 bg-teal-500/5 blur-3xl rounded-full" />
        <motion.div
           style={{ y: headingYPos1 }}
           className="relative z-10 w-full"
        >
          <span className="text-xs uppercase font-mono tracking-[0.4em] text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            SYSTEM CAPABILITIES
          </span>
          <h2 className="text-[4rem] md:text-[6rem] tracking-tighter mt-4 mb-6 leading-none">
            <span className="font-sans italic font-normal text-indigo-300">Our</span> <span className="font-modern font-black text-transparent [-webkit-text-stroke:2px_rgba(168,85,247,0.8)] filter drop-shadow-[0_0_20px_rgba(168,85,247,0.2)] uppercase">Engineering.</span>
          </h2>
        </motion.div>
        
        <motion.p 
           style={{ y: headingYPos2 }} 
           className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto font-medium z-10"
        >
          Click any section below to activate real-time telemetry diagnostics and test simulator.
        </motion.p>
      </div>

      {/* Asymmetric Interactive Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[750px]">
        
        {/* CARD 1: WEB PLATFORMS (Col span 7) */}
        <motion.div 
          onClick={() => setActiveService("web-platforms")}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 bg-black/60 rounded-[3rem] border border-white/5 backdrop-blur-2xl p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-2xl transition-all"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                Next-Gen Frontend
              </span>
              <span className="text-xs font-mono text-zinc-500">// READY_SIGNAL_01</span>
            </div>
            
            <h3 className="text-4xl font-black uppercase text-white tracking-tight mb-2">Web Platforms</h3>
            <p className="text-zinc-400 text-lg max-w-lg mb-6">
              WebGL interactive graphics and Next.js applications engineered for fluid navigation and ultra-short TTFB scores.
            </p>
          </div>

          {/* Micro-Interaction widget inside card: Simulated active compilation */}
          <div className="relative z-10 w-full bg-zinc-950/80 rounded-2xl border border-emerald-500/20 p-5 font-mono text-xs text-emerald-400 mb-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>PRAVIDHI_WEB_DEV_SERVER</span>
              </div>
              <span>HMR: ACTIVE</span>
            </div>
            <div className="space-y-1 text-[11px] md:text-xs">
              <p className="text-zinc-500">{">"} npm run compile --prod</p>
              <p className="text-emerald-300">✔ Bundled 42 units in 12ms</p>
              <p className="text-teal-400 font-bold">$ {codeSnippets[typedCodeIdx]}</p>
              <p className="text-zinc-600">⚡ Client payload cached on CDN edges.</p>
            </div>
          </div>

          {/* Card Bottom Panel */}
          <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">Next.js 16</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">ThreeJS</span>
            </div>
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Run Diagnostics <ChevronRight size={14} />
            </span>
          </div>
        </motion.div>

        {/* CARD 2: MOBILE NATIVE (Col span 5) */}
        <motion.div 
          onClick={() => setActiveService("mobile-native")}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 bg-black/60 rounded-[3rem] border border-white/5 backdrop-blur-2xl p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                Fluid Framerate
              </span>
              <span className="text-xs font-mono text-zinc-500">// MODULE_02</span>
            </div>
            
            <h3 className="text-4xl font-black uppercase text-white tracking-tight mb-2">Mobile Native</h3>
            <p className="text-zinc-400 text-lg mb-6">
              Swift, Swift UI, Kotlin, and Flutter apps built to perform. Zero stutter, zero main-thread blockups.
            </p>
          </div>

          {/* Micro-Interaction inside card: Interactive FPS Slider */}
          <div className="relative z-10 bg-zinc-950/80 rounded-2xl border border-indigo-500/20 p-5 mb-6 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-zinc-400">FRAME SPEED EMULATOR</span>
              <span className={`text-xs font-mono font-bold ${fpsVal > 90 ? 'text-indigo-400' : 'text-zinc-400'}`}>
                {fpsVal} FPS
              </span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="120" 
              step="15"
              value={fpsVal} 
              onChange={(e) => {
                e.stopPropagation();
                setFpsVal(Number(e.target.value));
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
            />
            {/* Visual simulation of block sliding based on FPS */}
            <div className="mt-4 h-8 bg-black/60 rounded-xl relative overflow-hidden border border-white/5 flex items-center px-4">
              <motion.div 
                className="w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.5)]"
                animate={{ x: [0, 180, 0] }}
                transition={{ 
                  duration: 2 * (60 / fpsVal), 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <span className="absolute right-4 text-[9px] font-mono text-zinc-600 uppercase">
                {fpsVal <= 30 ? 'JANKY RENDER' : fpsVal <= 60 ? 'STANDARD' : 'PRAVIDHI FLUID'}
              </span>
            </div>
          </div>

          {/* Card Bottom Panel */}
          <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">Swift</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">Kotlin</span>
            </div>
            <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Run Diagnostics <ChevronRight size={14} />
            </span>
          </div>
        </motion.div>

        {/* CARD 3: CLOUD ARCHITECTURE (Col span 5) */}
        <motion.div 
          onClick={() => setActiveService("cloud-arcs")}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5 bg-black/60 rounded-[3rem] border border-white/5 backdrop-blur-2xl p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                Redundant Mesh
              </span>
              <span className="text-xs font-mono text-zinc-500">// MODULE_03</span>
            </div>
            
            <h3 className="text-4xl font-black uppercase text-white tracking-tight mb-2">Cloud Arcs</h3>
            <p className="text-zinc-400 text-lg mb-6">
              Enterprise serverless & Kubernetes meshes designed with dynamic global failovers. Zero single point of failures.
            </p>
          </div>

          {/* Micro-Interaction: Interactive cluster node selector */}
          <div className="relative z-10 bg-zinc-950/80 rounded-2xl border border-sky-500/20 p-5 mb-6 shadow-inner">
            <span className="text-[11px] font-mono text-zinc-400 block mb-3">CLUSTER STATUS (CLICK TO SIMULATE OUTAGE)</span>
            <div className="grid grid-cols-4 gap-3">
              {activeNodes.map((active, idx) => (
                <div 
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = [...activeNodes];
                    next[idx] = !next[idx];
                    setActiveNodes(next);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    active 
                      ? 'bg-sky-500/10 border-sky-500/40 text-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.2)]' 
                      : 'bg-red-500/10 border-red-500/40 text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.2)] animate-pulse'
                  }`}
                >
                  <div className="font-mono text-[9px] mb-1">NODE_{idx+1}</div>
                  <div className="w-2.5 h-2.5 rounded-full mx-auto" style={{ backgroundColor: active ? "#38bdf8" : "#f87171" }} />
                </div>
              ))}
            </div>
            <div className="mt-3 text-[10px] font-mono text-zinc-500 flex justify-between">
              <span>ACTIVE REGIONS: {activeNodes.filter(Boolean).length}/4</span>
              <span className={activeNodes.includes(true) ? "text-emerald-400" : "text-red-500 font-bold"}>
                {activeNodes.includes(true) ? 'HEALTHY ROUTING' : 'DYNAMIC SHUTDOWN'}
              </span>
            </div>
          </div>

          {/* Card Bottom Panel */}
          <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">AWS</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">GCP</span>
            </div>
            <span className="text-sky-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Run Diagnostics <ChevronRight size={14} />
            </span>
          </div>
        </motion.div>

        {/* CARD 4: V-MAX PERFORMANCE TUNING (Col span 7) */}
        <motion.div 
          onClick={() => setActiveService("performance-tuning")}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="lg:col-span-7 bg-black/60 rounded-[3rem] border border-white/5 backdrop-blur-2xl p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-2xl transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                Zero-Overhead Scale
              </span>
              <span className="text-xs font-mono text-zinc-500">// READY_SIGNAL_04</span>
            </div>
            
            <h3 className="text-4xl font-black uppercase text-white tracking-tight mb-2">V-Max Tuning</h3>
            <p className="text-zinc-400 text-lg max-w-lg mb-6">
              Uncompromising performance diagnostics. We target heavy scripts, unoptimized assets, and core vitals execution times to guarantee speed.
            </p>
          </div>

          {/* Micro-Interaction inside card: Compression & Lighthouse Booster */}
          <div className="relative z-10 bg-zinc-950/80 rounded-2xl border border-amber-500/20 p-5 mb-6 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Interactive AST Asset Optimizer</span>
              <span className="text-xs font-mono font-bold text-amber-400">Scale: {compressionRatio}x</span>
            </div>
            
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={compressionRatio} 
              onChange={(e) => {
                e.stopPropagation();
                setCompressionRatio(Number(e.target.value));
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg appearance-none"
            />

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono text-zinc-500">PAYLOAD</div>
                <div className="text-sm font-bold font-mono text-white transition-all">{computedPayloadSize} MB</div>
              </div>
              <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono text-zinc-500">LOAD TIME</div>
                <div className="text-sm font-bold font-mono text-white transition-all">{computedLoadTime}s</div>
              </div>
              <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono text-zinc-500">LIGHTHOUSE</div>
                <div className={`text-sm font-bold font-mono transition-all ${computedLighthouse > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {computedLighthouse}
                </div>
              </div>
            </div>
          </div>

          {/* Card Bottom Panel */}
          <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">Rust Prepack</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-md">Vitals Audit</span>
            </div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Run Diagnostics <ChevronRight size={14} />
            </span>
          </div>
        </motion.div>

      </div>

      {/* FULLSCREEN/CENTERED INTERACTIVE MODAL OVERLAYS */}
      <AnimatePresence>
        {activeService && (() => {
          const service = SERVICES_DATA.find(s => s.id === activeService);
          if (!service) return null;

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 md:p-8 backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-950 to-black pointer-events-none" />
              
              {/* Floating ambient glow corresponding to active service theme */}
              <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px] pointer-events-none
                ${service.theme === 'emerald' ? 'bg-emerald-500' : ''}
                ${service.theme === 'indigo' ? 'bg-indigo-500' : ''}
                ${service.theme === 'sky' ? 'bg-sky-500' : ''}
                ${service.theme === 'amber' ? 'bg-amber-500' : ''}
              `} />

              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-zinc-950/90 border border-white/10 rounded-[3rem] w-full max-w-5xl h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row relative z-20 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              >
                
                {/* CLOSE BUTTON */}
                <button 
                  onClick={() => setActiveService(null)}
                  className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* LEFT COLUMN: SPECS & COPY */}
                <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={16} className={service.highlightText} />
                      <span className="font-mono text-xs uppercase text-zinc-500 tracking-wider">
                        {service.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 leading-none tracking-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-zinc-300 font-medium text-lg leading-relaxed mb-8">
                      {service.subtitle}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-zinc-400 font-mono text-sm">Deployment Level: AWS & GCP Enterprise Edge</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-zinc-400 font-mono text-sm">Reliability Guarantee: 99.99% Node Uptime</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-zinc-400 font-mono text-sm">Response Target: &lt; 50ms Edge Execution</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-zinc-500 text-xs font-mono">STATUS: HIGH_PERFORMANCE_ACTIVE</span>
                    <button 
                      onClick={() => setActiveService(null)}
                      className="px-6 py-2 bg-white text-black font-bold uppercase rounded-full text-xs hover:bg-zinc-200 transition-all cursor-pointer"
                    >
                      EXIT DIAGNOSTICS
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: LARGE-SCALE INTERACTIVE SIMULATOR EXCLUSIVE TO THE SERVICE */}
                <div className="w-full md:w-7/12 bg-black/60 p-8 md:p-12 overflow-y-auto flex flex-col justify-between relative">
                  
                  {/* SERVICE 1: WEB DIAG PANEL */}
                  {service.id === "web-platforms" && (
                    <div className="space-y-6">
                      <div className="mb-4">
                        <h4 className="font-bold text-white uppercase text-xl mb-1">PROFILING: Interactive HMR AST Live Optimizer</h4>
                        <p className="text-sm text-zinc-500">Benchmark code parsing rendering tree optimization live.</p>
                      </div>

                      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 font-mono text-sm text-lime-400 space-y-3">
                        <div className="flex justify-between border-b border-white/5 pb-2 text-zinc-500 text-xs">
                          <span>FILE: /src/App.tsx</span>
                          <span>HMR VERSION: 154</span>
                        </div>
                        <p className="text-zinc-400">// Parsing React functional rendering elements...</p>
                        <p className="text-emerald-300">✔ AST generated in 2ms.</p>
                        <p className="text-emerald-300">✔ Static analysis shows 0 layout shifts detected.</p>
                        <p className="text-amber-400">⚡ Webpack vs Pravidhi bundle engine speedout comparison:</p>
                        <div className="space-y-1.5 pt-2 text-[12px]">
                          <div>Webpack standard build: 1240ms</div>
                          <div className="flex items-center gap-2">
                            <span className="w-20 bg-zinc-800 h-2 rounded-full overflow-hidden block">
                              <span className="bg-zinc-500 w-[100%] h-full block" />
                            </span>
                            <span className="text-zinc-600">Slow execution</span>
                          </div>
                          <div>Pravidhi compiled pipeline: <span className="text-emerald-400 font-bold">14ms</span></div>
                          <div className="flex items-center gap-2">
                            <span className="w-20 bg-zinc-900 h-2 rounded-full overflow-hidden block">
                              <span className="bg-emerald-400 w-[5%] h-full block" />
                            </span>
                            <span className="text-emerald-400 font-bold">98x faster</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 uppercase text-sm">
                          <Activity size={18} /> Performance Guarantee Metric
                        </div>
                        <p className="text-sm text-zinc-300 leading-snug">
                          We run lightweight interactive client bundles utilizing prepack compilers ensuring users never look at a white spinner again.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 2: MOBILE DIAG PANEL */}
                  {service.id === "mobile-native" && (
                    <div className="space-y-6">
                      <div className="mb-4">
                        <h4 className="font-bold text-white uppercase text-xl mb-1">PROFILING: Main-Thread Core Frame Stutter Diagnostic</h4>
                        <p className="text-sm text-zinc-500">Observe high-draw layout structures at 120Hz refresh targets.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl">
                          <div className="text-xs text-zinc-500 font-mono mb-1">THREAD LATENCY</div>
                          <div className="text-2xl font-bold font-mono text-indigo-400">0.9ms</div>
                          <div className="text-[10px] text-zinc-600">Standard targets: 16.6ms</div>
                        </div>
                        <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl">
                          <div className="text-xs text-zinc-500 font-mono mb-1">JVM SPEND</div>
                          <div className="text-2xl font-bold font-mono text-indigo-400">4.1 MB</div>
                          <div className="text-[10px] text-zinc-600">Zero heap-block runtime</div>
                        </div>
                      </div>

                      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300 space-y-3">
                        <div className="text-xs text-zinc-500 border-b border-zinc-800 pb-2 flex justify-between">
                          <span>SYSTEM LOG: HIGH FPS EXEC_LOOP</span>
                          <span>ACTIVE</span>
                        </div>
                        <p className="text-indigo-400 font-bold">iOS Metal Render Pipeline running...</p>
                        <p className="text-zinc-500">✔ Draw Calls: 124 pre-batched shaders.</p>
                        <p className="text-zinc-500">✔ Garbage Collection: Isolated thread allocation.</p>
                        <p className="text-emerald-400">✔ Frame drop rate: 0.01% under stress simulation.</p>
                      </div>

                      <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2 uppercase text-sm">
                          <Cpu size={18} /> Metal & Vulkan Low-level APIs
                        </div>
                        <p className="text-sm text-zinc-300 leading-snug">
                          We write custom engine level configurations directly into your native swift packages bypassing high-level heavy abstractions entirely.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 3: CLOUD DIAG PANEL */}
                  {service.id === "cloud-arcs" && (
                    <div className="space-y-6">
                      <div className="mb-4">
                        <h4 className="font-bold text-white uppercase text-xl mb-1">PROFILING: Live Multi-Region Load balancer Traffic Simulator</h4>
                        <p className="text-sm text-zinc-500">Simulate global region latency levels dynamically with redundancy.</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                            <span>REGIONAL TRAFFIC: NORTH AMERICA edge</span>
                            <span className="text-sky-400 font-bold">LATENCY: 12ms</span>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div className="h-full bg-sky-400" initial={{ width: "30%" }} animate={{ width: "80%" }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                            <span>REGIONAL TRAFFIC: ASIA PACIFIC edge</span>
                            <span className="text-sky-400 font-bold">LATENCY: 34ms</span>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div className="h-full bg-sky-400" initial={{ width: "20%" }} animate={{ width: "65%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                            <span>REGIONAL TRAFFIC: EUROPE CENTRAL edge</span>
                            <span className="text-sky-400 font-bold">LATENCY: 18ms</span>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                            <motion.div className="h-full bg-sky-400" initial={{ width: "10%" }} animate={{ width: "90%" }} transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }} />
                          </div>
                        </div>
                      </div>

                      {/* Interactive 3D Architecture Visual */}
                      <div className="w-full bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-inner h-[220px] relative">
                        <div className="absolute top-3 left-3 text-[10px] font-mono text-sky-400/50 uppercase select-none z-10 pointer-events-none">
                          ACTIVE CLUSTER TOPOLOGY MESH (DRAG TO ROTATE)
                        </div>
                        <ModelContainer>
                          <ArchitectureModel />
                        </ModelContainer>
                      </div>

                      <div className="p-6 bg-sky-500/10 border border-sky-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 text-sky-400 font-bold mb-2 uppercase text-sm">
                          <Layers size={18} /> High-Availability Cluster Auto-routing
                        </div>
                        <p className="text-sm text-zinc-300 leading-snug">
                          Load is balanced on geo-distributed, stateless edge proxies meaning client requests are resolved locally instantly.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 4: V-MAX DIAG PANEL */}
                  {service.id === "performance-tuning" && (
                    <div className="space-y-6">
                      <div className="mb-4">
                        <h4 className="font-bold text-white uppercase text-xl mb-1">PROFILING: Pravidhi Core Diagnostics Engine</h4>
                        <p className="text-sm text-zinc-500">Our AST analyzer parses Javascript scripts down to minimum byte payloads.</p>
                      </div>

                      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 font-mono text-sm text-amber-400 space-y-4">
                        <div className="flex justify-between border-b border-zinc-900 pb-2 text-xs text-zinc-500">
                          <span>CORE VITALS</span>
                          <span>STABLE</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400 uppercase">First Contentful Paint (FCP)</span>
                            <span className="text-emerald-400 font-bold">0.12 seconds</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400 uppercase">Cumulative Layout Shift (CLS)</span>
                            <span className="text-emerald-400 font-bold">0.00</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400 uppercase">Total Blocking Time (TBT)</span>
                            <span className="text-emerald-400 font-bold">0.00ms</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 text-amber-400 font-bold mb-2 uppercase text-sm">
                          <Gauge size={18} /> Lighthouse 100 Guarantee
                        </div>
                        <p className="text-sm text-zinc-300 leading-snug">
                          We systematically dismantle high blocking scripts, heavy image declarations, and redundant CSS files to compress your builds.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TELEMETRY READOUT AT THE FOOTER OF DIAGNOSTICS */}
                  <div className="mt-8 pt-6 border-t border-white/5 text-[10px] font-mono text-zinc-600 flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      SECURE SEC_CH_UA SIGNAL ESTABLISHED
                    </span>
                    <span>PRAVIDHI_CORE_V1.16</span>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
      </div>
      </GlitchEntrance>
    </section>
  );
}
