import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useStore } from '../store';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { usePrefetch } from '../hooks/usePrefetch';
import { useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';

const navLinks = [
  { id: 'philosophy', label: 'Confidentiality' },
  { id: 'services', label: 'Architecture' },
  { id: 'ai-services', label: 'AI Security' },
  { id: 'productised-services', label: 'Threat Radar & Solutions' },
  { id: 'insights-faq', label: 'Knowledge Base' },
  { id: 'deep-search', label: 'Deep Index' },
  { id: 'awards', label: 'Accolades' },
];

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenLegal?: (tab: any) => void;
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenLegal, onOpenAdmin }: NavbarProps) {
  const setCursorType = useStore((state) => state.setCursorType);
  const activeId = useScrollSpy(navLinks.map(l => l.id));
  const { prefetch, cancelPrefetch } = usePrefetch();
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100));
  });

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/50 border-b border-zinc-800"
    >
      <div 
        className="font-bold text-xl tracking-tighter flex items-center gap-3"
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        <span>PRAVIDHI</span><span className="text-teal-400 font-black">.</span>
        
        {/* Subtle Cybernetic HUD percentage badge */}
        <span className="font-mono text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-500 rounded px-2 py-0.5 tracking-widest uppercase hidden sm:inline-block">
          SYS_POS: <span className="text-teal-400 font-bold">{scrollPercent}%</span>
        </span>
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400 relative">
        {navLinks.map(link => (
          <a 
            key={link.id}
            href={`#${link.id}`} 
            className={`transition-colors relative py-1 ${activeId === link.id ? 'text-teal-400 font-bold' : 'hover:text-white'}`}
            onMouseEnter={() => {
              setCursorType('pointer');
              prefetch(link.id);
            }}
            onFocus={() => prefetch(link.id)}
            onMouseLeave={() => {
              setCursorType('default');
              cancelPrefetch(link.id);
            }}
          >
            {link.label}
            {activeId === link.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-1 h-px bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {/* Admin Portal Studio Trigger */}
        {onOpenAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAdmin}
            title="Admin Studio (Manage FAQs & Zero-Day Threat Radar)"
            className="px-2.5 py-1.5 border border-zinc-800 hover:border-teal-500/50 rounded-full bg-zinc-950/60 text-zinc-400 hover:text-teal-300 flex items-center gap-1.5 text-xs font-mono cursor-pointer transition-all"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            <ShieldCheck size={13} className="text-teal-400" />
            <span className="hidden lg:inline text-[11px]">ADMIN</span>
          </motion.button>
        )}

        {/* Quick Search Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSearch}
          className="px-3.5 py-1.5 border border-zinc-800 rounded-full bg-zinc-950/60 text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-mono cursor-pointer transition-all hover:border-teal-500/40"
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          <Search size={12} className="text-teal-400" />
          <span className="hidden sm:inline">RAPID SEARCH</span>
          <span className="bg-zinc-900 border border-zinc-800 px-1 py-0.2 rounded text-[8px] text-zinc-500 font-mono leading-none">/</span>
        </motion.button>

        <a href="#contact">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-teal-400 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-full hidden md:block hover:bg-teal-300 transition-colors cursor-pointer"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            Qualify Now
          </motion.button>
        </a>
      </div>

      {/* Futuristic Scroll Progress Line with full color-changing gradient and outer ambient shadow */}
      <motion.div 
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500 via-indigo-500 to-amber-500 shadow-[0_1px_10px_rgba(20,184,166,0.6)] z-50 pointer-events-none"
      />
    </motion.nav>
  );
}
