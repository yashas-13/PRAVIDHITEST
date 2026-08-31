import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Twitter, Linkedin, ShieldCheck, Lock, ArrowUpRight, FileText, Scale, Cookie, AlertCircle, Building2, Mail, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import { LegalTab } from './LegalCenterModal';

interface FooterProps {
  onOpenLegal?: (tab: LegalTab) => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenLegal, onOpenAdmin }: FooterProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <footer ref={ref} className="bg-black pt-20 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden relative backdrop-blur-sm min-h-[50vh] flex flex-col justify-between snap-end w-full max-w-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10 pointer-events-auto w-full mb-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-teal-400 font-mono text-xs mb-4">
            <Lock size={12} />
            <span>Sovereign-Grade DevSecOps & Cloud Security</span>
          </div>
          <h2 className="text-[3.5rem] md:text-[5.5rem] font-sans tracking-tighter mb-8 text-white max-w-xl leading-[0.92]">
            Harden your <span className="font-serif italic text-zinc-300 font-normal">cloud.</span> <br className="hidden md:block"/>
            Secure your <span className="text-transparent [-webkit-text-stroke:2px_#ffffff] font-black">future.</span>
          </h2>
          <a href="#contact">
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-teal-400 text-black rounded-full font-black text-sm uppercase tracking-wider shadow-[0_0_40px_rgba(45,212,191,0.25)] hover:shadow-[0_0_60px_rgba(45,212,191,0.4)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Engage Principal Architect</span>
                <ArrowUpRight size={16} />
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
          <div className="font-mono text-zinc-400 text-xs text-left md:text-right space-y-1">
            <div className="text-zinc-200 font-bold">PRAVIDHI SOLUTIONS LLP</div>
            <div>Bangalore • Global Sovereign Engagements</div>
            <div className="text-zinc-300">
              Direct: <a href="tel:+918217219835" className="text-teal-400 hover:underline font-bold">+91 82172 19835</a>
            </div>
            <div className="text-zinc-300">
              Email: <a href="mailto:support@pravidhisolutions.in" className="text-indigo-400 hover:underline">support@pravidhisolutions.in</a>
            </div>
            <div className="text-teal-400/90 text-[11px] pt-1">Strict Mutual NDA Protocol Protected</div>
          </div>
          <div className="flex gap-4">
             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-700 hover:text-white transition-all text-zinc-400 group">
                <Github size={20} className="group-hover:scale-110 transition-transform" />
             </a>
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-700 hover:text-white transition-all text-zinc-400 group">
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
             </a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 hover:bg-zinc-700 hover:text-white transition-all text-zinc-400 group">
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
             </a>
          </div>
        </motion.div>
      </div>

      {/* High-Intent Architectural Index & FAQ Quick Links */}
      <div className="max-w-7xl mx-auto w-full mb-12 relative z-20">
        <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                High-Intent Architectural Index & FAQs
              </span>
            </div>
            <a 
              href="#insights-faq" 
              className="text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
            >
              <span>Explore Full Knowledge Base</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <a 
              href="#sovereign-grade-infrastructure-definition" 
              className="p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-teal-500/40 text-zinc-400 hover:text-zinc-200 transition-all flex flex-col justify-between gap-2 group"
            >
              <span className="text-white font-bold group-hover:text-teal-400 transition-colors">Sovereign Hardening</span>
              <span className="text-[11px] text-zinc-500">CIS Benchmark Level 2 & zero-trust multi-cloud isolation</span>
            </a>

            <a 
              href="#fixed-price-dev-packages" 
              className="p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-teal-500/40 text-zinc-400 hover:text-zinc-200 transition-all flex flex-col justify-between gap-2 group"
            >
              <span className="text-white font-bold group-hover:text-teal-400 transition-colors">Fixed-Price Sprints</span>
              <span className="text-[11px] text-zinc-500">Flat-rate 14-day delivery from ₹3,50,000 / $4,200 USD</span>
            </a>

            <a 
              href="#ai-ops-cost-reduction" 
              className="p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-teal-500/40 text-zinc-400 hover:text-zinc-200 transition-all flex flex-col justify-between gap-2 group"
            >
              <span className="text-white font-bold group-hover:text-teal-400 transition-colors">AI & LLM Ops Cost</span>
              <span className="text-[11px] text-zinc-500">30%–60% reduction via semantic caching & spot GPUs</span>
            </a>

            <a 
              href="#sovereign-code-ownership" 
              className="p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-teal-500/40 text-zinc-400 hover:text-zinc-200 transition-all flex flex-col justify-between gap-2 group"
            >
              <span className="text-white font-bold group-hover:text-teal-400 transition-colors">100% IP Ownership</span>
              <span className="text-[11px] text-zinc-500">Zero vendor lock-in, unencumbered source & key transfer</span>
            </a>
          </div>
        </div>
      </div>

      {/* AdSense Required Legal & Policy Links Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-zinc-800/80 relative z-20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
        
        {/* Policy Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-5">
          <button
            onClick={() => onOpenLegal?.('privacy')}
            className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck size={13} className="text-teal-400" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => onOpenLegal?.('terms')}
            className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Scale size={13} className="text-indigo-400" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => onOpenLegal?.('cookies')}
            className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Cookie size={13} className="text-amber-400" />
            <span>Cookie Policy</span>
          </button>

          <button
            onClick={() => onOpenLegal?.('disclaimer')}
            className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <AlertCircle size={13} className="text-rose-400" />
            <span>Disclaimer</span>
          </button>

          <button
            onClick={() => onOpenLegal?.('about')}
            className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Building2 size={13} className="text-sky-400" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => onOpenLegal?.('grievance')}
            className="hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Mail size={13} className="text-emerald-400" />
            <span>Grievance Officer</span>
          </button>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hover:text-teal-400 text-zinc-500 transition-colors cursor-pointer flex items-center gap-1.5 border-l border-zinc-800 pl-3"
            >
              <Lock size={12} className="text-teal-400" />
              <span>Admin Studio</span>
            </button>
          )}
        </div>

        {/* Crawlers & Verification Links */}
        <div className="flex items-center gap-4 text-[11px] text-zinc-500">
          <a href="/robots.txt" target="_blank" className="hover:text-zinc-300 transition-colors">robots.txt</a>
          <span>•</span>
          <a href="/sitemap.xml" target="_blank" className="hover:text-zinc-300 transition-colors">sitemap.xml</a>
          <span>•</span>
          <a href="/ads.txt" target="_blank" className="hover:text-zinc-300 transition-colors">ads.txt</a>
        </div>
      </div>

      {/* Copyright & Publisher Signature */}
      <div className="max-w-7xl mx-auto w-full pt-4 relative z-20 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-2">
        <div>
          © 2026 Pravidhi Solutions LLP. All rights reserved. Registered in Bengaluru, India.
        </div>
        <div className="text-teal-500/80">
          Google AdSense & DPDP Compliance Verified
        </div>
      </div>
      
      {/* Background massive text */}
      <motion.div 
        style={{ scale, y }}
        className="absolute -bottom-8 md:-bottom-20 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none flex justify-center opacity-40"
      >
        <h1 className="text-[20vw] md:text-[18vw] font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.05)] whitespace-nowrap tracking-tighter leading-none mix-blend-overlay">
          P<span className="font-serif italic font-normal">RA</span>VI<span className="font-serif italic font-normal">DH</span>I.
        </h1>
      </motion.div>
    </footer>
  );
}

