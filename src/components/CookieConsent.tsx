import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldCheck, Check, Settings, X } from 'lucide-react';
import { useStore } from '../store';
import { LegalTab } from './LegalCenterModal';

interface CookieConsentProps {
  onOpenLegal: (tab: LegalTab) => void;
}

export default function CookieConsent({ onOpenLegal }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const setCursorType = useStore((state) => state.setCursorType);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('pravidhi_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('pravidhi_cookie_consent', 'accepted_all');
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    localStorage.setItem('pravidhi_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 p-5 rounded-2xl bg-zinc-950/95 border border-zinc-800 text-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Cookie size={16} />
            </div>
            <span className="text-xs font-bold font-sans text-white uppercase tracking-wider">
              Privacy & Cookie Preferences
            </span>
          </div>

          <button
            onClick={handleDeclineNonEssential}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
            aria-label="Dismiss cookie notice"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          Pravidhi Solutions uses cookies and telemetry to analyze traffic, enhance zero-trust interface performance, and support Google AdSense compliant contextual advertising.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3.5 bg-teal-400 hover:bg-teal-300 text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer text-center font-sans shadow-md shadow-teal-500/20"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            Accept All
          </button>

          <button
            onClick={handleDeclineNonEssential}
            className="py-2 px-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-mono rounded-xl transition-all cursor-pointer text-center"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            Essential Only
          </button>

          <button
            onClick={() => onOpenLegal('cookies')}
            className="p-2 text-zinc-400 hover:text-teal-400 transition-colors cursor-pointer text-xs font-mono flex items-center gap-1"
            title="Read Cookie Policy"
          >
            <Settings size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
