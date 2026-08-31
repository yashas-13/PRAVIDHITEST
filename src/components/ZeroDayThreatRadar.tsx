import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, ShieldAlert, Zap, Terminal, ShieldCheck, RefreshCw, 
  Search, Sparkles, ArrowRight, CheckCircle2, Clock, 
  Copy, Check, Code, Cpu, Flame, AlertTriangle, ExternalLink,
  ChevronRight, BookmarkCheck, Globe2
} from 'lucide-react';
import { 
  DAILY_ZERO_DAY_ARTICLES, 
  SKILL_NODES, 
  ThreatArticle, 
  SkillNode 
} from '../data/threatRadarData';
import { useStore } from '../store';

export default function ZeroDayThreatRadar({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [articles, setArticles] = useState<ThreatArticle[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pravidhi_custom_threat_articles_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return DAILY_ZERO_DAY_ARTICLES;
  });

  const [selectedArticleId, setSelectedArticleId] = useState<string>(() => articles[0]?.id || DAILY_ZERO_DAY_ARTICLES[0].id);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Dynamic scanning / live research state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isResearching, setIsResearching] = useState<boolean>(false);
  const [researchTopic, setResearchTopic] = useState<string>('');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now (Live Feed)');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const setCursorType = useStore((state) => state.setCursorType);

  // Sync feed on mount from server
  useEffect(() => {
    fetch('/api/threat-radar/feed')
      .then(res => res.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          setArticles(prev => {
            // merge unique by id
            const existingIds = new Set(data.articles.map((a: ThreatArticle) => a.id));
            const merged = [...data.articles, ...prev.filter(p => !existingIds.has(p.id))];
            return merged;
          });
          setLastSyncTime(`Auto-Fetched at ${new Date().toLocaleTimeString()}`);
        }
      })
      .catch(err => console.warn('Feed fetch notice:', err));

    const handleUpdate = () => {
      const saved = localStorage.getItem('pravidhi_custom_threat_articles_v1');
      if (saved) {
        try { setArticles(JSON.parse(saved)); } catch (e) { /* fallback */ }
      }
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('threats-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('threats-updated', handleUpdate);
    };
  }, []);

  const selectedArticle = articles.find(a => a.id === selectedArticleId) || articles[0];
  const selectedSkill = SKILL_NODES.find(s => s.id === selectedSkillId) || null;

  // Filtered threats based on severity and search query
  const filteredArticles = articles.filter(art => {
    const matchesSeverity = filterSeverity === 'ALL' || art.severity === filterSeverity;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.cve.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.targetStack.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSeverity && matchesSearch;
  });

  // Auto-fetch fresh zero-day findings from backend
  const handleTriggerScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/threat-radar/auto-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success && data.article) {
        setArticles(prev => [data.article, ...prev.filter(a => a.id !== data.article.id)]);
        setSelectedArticleId(data.article.id);
        setLastSyncTime(`New CVE Fetched at ${new Date().toLocaleTimeString()}`);
        if (typeof window !== 'undefined') {
          const updated = [data.article, ...articles.filter(a => a.id !== data.article.id)];
          localStorage.setItem('pravidhi_custom_threat_articles_v1', JSON.stringify(updated));
        }
      } else {
        setLastSyncTime(`Live Scan at ${new Date().toLocaleTimeString()}`);
      }
    } catch (err) {
      console.warn('Threat scan notice:', err);
      setLastSyncTime(`Scan Refreshed at ${new Date().toLocaleTimeString()}`);
    } finally {
      setIsScanning(false);
    }
  };

  // Live Auto-Research via API
  const handleAutoResearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!researchTopic.trim()) return;

    setIsResearching(true);
    try {
      const res = await fetch('/api/threat-radar/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: researchTopic })
      });
      const data = await res.json();
      if (data.success && data.article) {
        setArticles(prev => [data.article, ...prev.filter(a => a.id !== data.article.id)]);
        setSelectedArticleId(data.article.id);
        setResearchTopic('');
        setLastSyncTime(`Intelligence Generated at ${new Date().toLocaleTimeString()}`);
        if (typeof window !== 'undefined') {
          const updated = [data.article, ...articles.filter(a => a.id !== data.article.id)];
          localStorage.setItem('pravidhi_custom_threat_articles_v1', JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.warn('Threat research notice:', err);
    } finally {
      setIsResearching(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDispatchRemediation = (article: ThreatArticle) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('select-package', { 
        detail: article.remediationPackage === 'AI Ops & Infrastructure Audit' 
          ? 'ai-ops-audit' 
          : article.remediationPackage === 'Compliance-as-Code Automation Kit'
          ? 'compliance-as-code'
          : 'cloud-security-hardening'
      }));
    }
  };

  return (
    <div id="threat-radar" className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-[2.5rem] p-6 md:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden my-16">
      
      {/* Ambient background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header & Status HUD */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-800/80 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400 text-[11px] font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Automated Zero-Day Threat Radar</span>
            </div>

            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Radio size={12} className="text-teal-400 animate-pulse" />
              <span>2,418 CVE Feeds Scanned</span>
            </span>

            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full hidden sm:inline-flex">
              {lastSyncTime}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
            <span>Sovereign Zero-Day Defense Scope</span>
            <span className="text-teal-400 font-mono text-xs font-normal">v4.8-LIVE</span>
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 max-w-2xl mt-1">
            Real-time vulnerability reconnaissance engine with automated daily SEO-enriched intelligence dispatches, 
            explaining exact exploit mechanics and sovereign remediation playbooks using Ansible & Terraform.
          </p>
        </div>

        {/* Action Buttons: Auto-Scan & Dynamic AI Research */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            <RefreshCw size={13} className={`text-teal-400 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Radar...' : 'Auto-Sync Intel Feed'}</span>
          </button>

          <form onSubmit={handleAutoResearch} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={researchTopic}
                onChange={(e) => setResearchTopic(e.target.value)}
                placeholder="Auto-Research Tech / CVE..."
                className="w-48 sm:w-56 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-teal-400 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isResearching || !researchTopic.trim()}
              className="px-3.5 py-2 rounded-xl bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-300 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Sparkles size={13} />
              <span>{isResearching ? 'Synthesizing...' : 'Scan AI'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Grid: Radar Visualizer & Skill Nodes on Top, Deep Intelligence Brief on Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Left Column: Interactive Radar Canvas with Animated Skill Nodes */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="relative w-full aspect-square max-h-[460px] mx-auto rounded-3xl bg-zinc-950 border border-zinc-800/80 p-4 flex items-center justify-center overflow-hidden shadow-inner">
            
            {/* Grid Coordinates Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Concentric Radar Range Rings */}
            <div className="absolute w-[85%] h-[85%] rounded-full border border-teal-500/20 pointer-events-none" />
            <div className="absolute w-[60%] h-[60%] rounded-full border border-teal-500/30 border-dashed pointer-events-none" />
            <div className="absolute w-[35%] h-[35%] rounded-full border border-teal-500/40 pointer-events-none" />
            
            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-teal-500/20 pointer-events-none" />
            <div className="absolute h-full w-[1px] bg-teal-500/20 pointer-events-none" />
            
            {/* Rotating Radar Sweep Beam (Framer Motion) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <div 
                className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                style={{
                  background: 'conic-gradient(from 0deg at 0% 100%, rgba(20, 184, 166, 0.45) 0deg, rgba(20, 184, 166, 0.15) 35deg, transparent 70deg)'
                }}
              />
            </motion.div>

            {/* Radar Center Defense Hub */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-zinc-900 border-2 border-teal-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.5)]">
              <ShieldCheck className="w-7 h-7 text-teal-300 animate-pulse" />
              <span className="text-[7px] font-mono font-bold text-teal-400 uppercase tracking-tighter">PRAVIDHI</span>
            </div>

            {/* Pulsing Zero-Day Threat Blips */}
            {articles.map((art, idx) => {
              const rad = (art.radarCoordinates.angle * Math.PI) / 180;
              const radiusPercent = (art.radarCoordinates.distance / 100) * 42; // scale within radius
              const leftPercent = 50 + radiusPercent * Math.cos(rad);
              const topPercent = 50 + radiusPercent * Math.sin(rad);
              const isSelected = art.id === selectedArticleId;

              return (
                <div
                  key={art.id}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.button
                    onClick={() => {
                      setSelectedArticleId(art.id);
                      setSelectedSkillId(null);
                    }}
                    whileHover={{ scale: 1.35 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative p-2 rounded-full cursor-pointer transition-all ${
                      isSelected 
                        ? 'ring-4 ring-rose-500/80 bg-rose-600 shadow-[0_0_25px_rgba(244,63,94,0.9)]' 
                        : art.severity === 'CRITICAL' 
                        ? 'bg-rose-500/90 hover:bg-rose-400' 
                        : 'bg-amber-500/90 hover:bg-amber-400'
                    }`}
                    onMouseEnter={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    {/* Ping Ripple */}
                    <span className="absolute -inset-2 rounded-full bg-rose-500/40 animate-ping pointer-events-none" />
                    
                    <Flame className="w-3.5 h-3.5 text-white" />
                  </motion.button>

                  {/* Tooltip Label */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded bg-zinc-950/90 border border-zinc-800 text-[9px] font-mono whitespace-nowrap text-zinc-300 pointer-events-none z-30 transition-opacity ${
                    isSelected ? 'opacity-100 ring-1 ring-rose-500' : 'opacity-0 hover:opacity-100'
                  }`}>
                    {art.cve}
                  </div>
                </div>
              );
            })}

            {/* Interactive Perimeter Framer Motion Skill Nodes */}
            {SKILL_NODES.map((skill) => {
              const isSelected = selectedSkillId === skill.id;
              const isDefendingActiveThreat = selectedArticle.defendingSkillNodes.includes(skill.id);

              return (
                <motion.div
                  key={skill.id}
                  style={{ left: `${skill.coordinates.x}%`, top: `${skill.coordinates.y}%` }}
                  animate={{ 
                    y: [0, -4, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3 + Math.random() * 2, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.button
                    onClick={() => {
                      setSelectedSkillId(skill.id);
                    }}
                    whileHover={{ scale: 1.15 }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white text-zinc-950 border-white shadow-xl'
                        : isDefendingActiveThreat
                        ? 'bg-teal-950/90 text-teal-300 border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.6)] animate-pulse'
                        : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                    onMouseEnter={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                  >
                    <Code size={11} className={isDefendingActiveThreat ? 'text-teal-400' : skill.color} />
                    <span>{skill.name}</span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Skill Defense Inspector */}
          {selectedSkill ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs font-mono space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold ${selectedSkill.color} flex items-center gap-2`}>
                  <Terminal size={14} />
                  <span>{selectedSkill.name} Defense Module</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">
                  {selectedSkill.activeDefensesCount} Active Guardrails
                </span>
              </div>
              <p className="text-zinc-300 font-sans text-xs">
                {selectedSkill.shortDesc}
              </p>
              <div className="p-3 rounded-xl bg-black/80 border border-zinc-800/80 overflow-x-auto text-[11px] text-teal-300">
                <pre>{selectedSkill.codeSample}</pre>
              </div>
            </motion.div>
          ) : (
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <Zap size={14} className="text-teal-400" />
                <span>Defending Nodes for Active Threat:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.defendingSkillNodes.map(skillId => {
                  const s = SKILL_NODES.find(n => n.id === skillId);
                  return s ? (
                    <span key={s.id} className="px-2 py-0.5 rounded bg-zinc-800 text-teal-300 border border-teal-500/30 text-[10px]">
                      {s.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Daily Zero-Day Intelligence Article & Sovereign Remediation */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Threat Selector List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {filteredArticles.map(art => (
              <button
                key={art.id}
                onClick={() => {
                  setSelectedArticleId(art.id);
                  setSelectedSkillId(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                  art.id === selectedArticleId
                    ? 'bg-teal-400 text-black border-teal-300 font-bold shadow-md'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                <AlertTriangle size={12} className={art.id === selectedArticleId ? 'text-black' : 'text-rose-400'} />
                <span>{art.cve}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase ${
                  art.id === selectedArticleId ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  CVSS {art.cvssScore}
                </span>
              </button>
            ))}
          </div>

          {/* Deep Intelligence Article Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArticle.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col h-full space-y-6"
            >
              {/* Article Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold">
                    {selectedArticle.status}
                  </span>
                  <span className="text-zinc-300">{selectedArticle.publishedDate}</span>
                </div>
                <span className="text-zinc-500 flex items-center gap-1">
                  <Clock size={12} /> {selectedArticle.readTime}
                </span>
              </div>

              {/* Title & Headline */}
              <div>
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                  {selectedArticle.title}
                </h4>
                <p className="text-xs md:text-sm text-teal-300 font-mono leading-relaxed">
                  Target Stack: {selectedArticle.targetStack}
                </p>
              </div>

              {/* Executive Summary */}
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/60">
                {selectedArticle.summary}
              </p>

              {/* The 4-Pillar Deep Breakdown (HOW, WHY, WHEN, WHERE) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame size={12} /> WHAT & Root Cause:
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug font-sans">
                    {selectedArticle.what}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle size={12} /> WHY It Matters:
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug font-sans">
                    {selectedArticle.why}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe2 size={12} /> WHERE In Your Cloud:
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug font-sans">
                    {selectedArticle.where}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={12} /> HOW PRAVIDHI HELPS:
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug font-sans">
                    {selectedArticle.howWeHelp}
                  </p>
                </div>
              </div>

              {/* Executable Remediation Code Playbook */}
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Terminal size={13} className="text-teal-400" />
                    <span>{selectedArticle.remediationCode.filename}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedArticle.remediationCode.code)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="p-4 overflow-x-auto text-[11px] font-mono text-emerald-300 leading-relaxed bg-black/90">
                  <pre>{selectedArticle.remediationCode.code}</pre>
                </div>
              </div>

              {/* SEO Enriched Keyword Tags Cloud */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[10px] font-mono text-zinc-500 mr-1 flex items-center gap-1">
                  <BookmarkCheck size={11} /> SEO Tags:
                </span>
                {selectedArticle.seoKeywords.map((kw, kIdx) => (
                  <span
                    key={kIdx}
                    onClick={() => setSearchQuery(kw)}
                    className="px-2 py-0.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-teal-300 cursor-pointer transition-colors"
                  >
                    #{kw}
                  </span>
                ))}
              </div>

              {/* Action Call to Action: Remediate this threat */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => handleDispatchRemediation(selectedArticle)}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-teal-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-white/5"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <span>Dispatch Sovereign Remediation</span>
                  <ArrowRight size={14} />
                </button>

                <span className="text-xs font-mono text-zinc-400">
                  Package: <strong className="text-teal-400">{selectedArticle.remediationPackage}</strong>
                </span>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
