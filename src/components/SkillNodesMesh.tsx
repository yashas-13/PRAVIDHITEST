import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Cpu, Terminal, Lock, Sparkles, 
  ArrowRight, Copy, Check, Zap, Layers, Play,
  CheckCircle2, Flame, ExternalLink, RefreshCw
} from 'lucide-react';
import { SKILL_NODES, SkillNode } from '../data/threatRadarData';
import { useStore } from '../store';

interface SkillNodesMeshProps {
  highlightedSkillIds?: string[];
  onSelectSkill?: (skillId: string) => void;
  activeThreatTitle?: string;
}

export default function SkillNodesMesh({
  highlightedSkillIds = [],
  onSelectSkill,
  activeThreatTitle
}: SkillNodesMeshProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const setCursorType = useStore((state) => state.setCursorType);

  const categories = [
    { id: 'ALL', label: 'All Skill Engines' },
    { id: 'Configuration', label: 'Ansible & Hardening' },
    { id: 'IaC', label: 'Terraform & OpenTofu' },
    { id: 'Orchestration', label: 'Kubernetes Pods' },
    { id: 'Kernel', label: 'eBPF & Kernel' },
    { id: 'Governance', label: 'OPA & Vault' },
    { id: 'AI Shield', label: 'AI LLM Armor' }
  ];

  const filteredNodes = SKILL_NODES.filter(node => 
    activeCategory === 'ALL' || node.category === activeCategory
  );

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleNodeClick = (node: SkillNode) => {
    setSelectedSkill(node);
    if (onSelectSkill) onSelectSkill(node.id);
  };

  return (
    <div className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
      {/* Background Decorative Ambient Beams */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Category Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-teal-400 font-bold">
              Autonomous Sovereign Defense Mesh
            </span>
            {activeThreatTitle && (
              <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                Active Mitigator for: <span className="text-white font-bold">{activeThreatTitle}</span>
              </span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Framer Motion Skill Nodes</span>
            <span className="text-xs font-mono text-zinc-500 font-normal">(8 Core Engines Active)</span>
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-teal-400 text-zinc-950 font-bold shadow-md shadow-teal-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Framer Motion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
        {filteredNodes.map((node, index) => {
          const isHighlighted = highlightedSkillIds.includes(node.id);
          const isSelected = selectedSkill?.id === node.id;

          return (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, (index % 2 === 0 ? -4 : 4), 0] 
              }}
              transition={{
                layout: { duration: 0.3 },
                opacity: { duration: 0.4, delay: index * 0.05 },
                y: {
                  repeat: Infinity,
                  duration: 4 + (index % 3),
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.03, y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[220px] ${
                isSelected
                  ? 'bg-zinc-900/90 border-teal-400 shadow-xl shadow-teal-500/20 ring-1 ring-teal-400'
                  : isHighlighted
                  ? 'bg-zinc-900/80 border-rose-400/80 shadow-lg shadow-rose-500/10 ring-1 ring-rose-400/50'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
              }`}
            >
              {/* Dynamic Gradient Glow */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${node.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} 
              />

              {/* Pulsing Highlight Orb for Active Mitigators */}
              {isHighlighted && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-rose-950/80 border border-rose-500/50 px-2 py-0.5 rounded-full z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span className="font-mono text-[9px] text-rose-300 font-bold uppercase tracking-wider">
                    Engaged
                  </span>
                </div>
              )}

              {/* Top Row: Badge & Category */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-zinc-950/90 border border-zinc-800 font-mono text-[10px] text-zinc-300 font-medium">
                  {node.badge}
                </span>
                
                <span className="font-mono text-[10px] text-teal-400 font-bold bg-teal-950/40 border border-teal-500/20 px-2 py-0.5 rounded-md">
                  {node.activeDefensesCount} Shields
                </span>
              </div>

              {/* Middle: Title & Description */}
              <div className="relative z-10 flex-1">
                <h4 className={`text-base md:text-lg font-black tracking-tight mb-1.5 flex items-center gap-2 ${node.color}`}>
                  <Cpu size={16} className="shrink-0" />
                  <span>{node.name}</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                  {node.shortDesc}
                </p>
              </div>

              {/* Bottom Row: Vectors & Inspect Trigger */}
              <div className="relative z-10 pt-3 mt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center gap-1">
                  <Zap size={11} className="text-teal-400" />
                  <span>{node.mitigatedVectors.length} CVE Vectors</span>
                </span>

                <span className="text-teal-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                  <span>Inspect</span>
                  <ArrowRight size={11} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Node Detail Modal / Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 rounded-3xl bg-zinc-900/90 border border-teal-500/40 shadow-2xl relative overflow-hidden z-20"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-teal-500/40 flex items-center justify-center text-teal-400">
                  <Cpu size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{selectedSkill.name}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-300 font-mono text-[10px] uppercase font-bold">
                      {selectedSkill.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{selectedSkill.shortDesc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(selectedSkill.codeSample)}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCode ? 'Copied Blueprint' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white font-mono text-xs cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              {/* Mitigated Attack Vectors */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <h5 className="font-mono text-xs uppercase tracking-wider text-teal-400 font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck size={14} />
                  <span>Neutralized Threat Vectors</span>
                </h5>
                <div className="space-y-2">
                  {selectedSkill.mitigatedVectors.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                      <CheckCircle2 size={13} className="text-teal-400 shrink-0" />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Production IaC Code Sample */}
              <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800/80">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Terminal size={11} className="text-teal-400" />
                    <span>Hardening Manifest Blueprint</span>
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">Production Ready</span>
                </div>
                <pre className="font-mono text-xs text-zinc-300 bg-black/60 p-3 rounded-xl overflow-x-auto border border-zinc-800/50 leading-relaxed">
                  <code>{selectedSkill.codeSample}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
