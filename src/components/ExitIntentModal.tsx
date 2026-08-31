import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Phone, Mail, ShieldAlert, Sparkles, CheckCircle2, 
  ArrowRight, Copy, Check, MessageSquare, ExternalLink, Zap,
  Lock, Clock, Award, ShieldCheck
} from 'lucide-react';
import { useStore } from '../store';

interface ExitIntentModalProps {
  onOpenContact?: () => void;
}

export default function ExitIntentModal({ onOpenContact }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const setCursorType = useStore((state) => state.setCursorType);

  const phoneDisplay = "+91 82172 19835";
  const phoneRaw = "+918217219835";
  const email = "support@pravidhisolutions.in";

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem('pravidhi_exit_intent_dismissed', 'true');
  }, []);

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleClaimOffer = () => {
    handleClose();
    if (onOpenContact) {
      onOpenContact();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Check if user already dismissed in this session
    const isDismissed = sessionStorage.getItem('pravidhi_exit_intent_dismissed');
    if (isDismissed) {
      setHasTriggered(true);
      return;
    }

    let minEngagementPassed = false;
    // Require at least 4 seconds of page presence so we don't flash immediately
    const engagementTimer = setTimeout(() => {
      minEngagementPassed = true;
    }, 4000);

    const handleMouseLeave = (e: MouseEvent) => {
      // Exit intent detection when mouse moves above top edge of viewport
      if (e.clientY <= 15 && minEngagementPassed && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(engagementTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasTriggered, isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="exit-intent-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-teal-500/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-teal-500/10 overflow-hidden z-10 my-auto"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-teal-400 to-indigo-500" />
            
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Close offer"
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <X size={18} />
            </button>

            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-mono font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Principal Architect Available
              </span>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900/90 px-2.5 py-1 rounded-full border border-zinc-800">
                Quarterly Sprint Capacity: 2 Slots Open
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-tight text-white leading-[1.1]">
                Before You Leave: Secure Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-white">
                  Zero-Trust Architecture Briefing.
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Connect directly with our 10-year veteran principal cloud security architect. Receive a complimentary 30-minute infrastructure gap triage and explore fixed-price sprint execution.
              </p>
            </div>

            {/* High-Value Highlights Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 mb-6 space-y-3">
              <div className="text-xs font-mono uppercase text-teal-400 font-bold tracking-wider flex items-center gap-1.5">
                <Zap size={14} className="text-teal-400" />
                <span>Complimentary Technical Evaluation ($750 USD Value)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
                  <span>CIS Level 2 & Zero-Trust Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
                  <span>AI Ops & GPU Cost Reduction Path</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
                  <span>Fixed-Price 14-Day Sprint Scope</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
                  <span>100% Full IP Ownership Guarantee</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* Direct Phone Call / WhatsApp */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-teal-500/50 transition-all flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                    <Phone size={14} className="text-teal-400" />
                    <span>Direct Principal Hotline</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    title="Copy phone number"
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                  >
                    {copiedPhone ? <Check size={13} className="text-teal-400" /> : <Copy size={13} />}
                  </button>
                </div>
                <div>
                  <a 
                    href={`tel:${phoneRaw}`}
                    className="text-base sm:text-lg font-mono font-bold text-white hover:text-teal-300 transition-colors block"
                  >
                    {phoneDisplay}
                  </a>
                  <span className="text-[11px] font-mono text-zinc-500">Voice & WhatsApp Priority Dispatch</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${phoneRaw}`}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-zinc-950 font-mono text-xs font-bold text-center transition-all"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/918217219835?text=${encodeURIComponent("Hello Pravidhi Solutions, I would like to consult a Principal Architect regarding sovereign infrastructure and fixed-price sprints.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-semibold text-center transition-all flex items-center justify-center gap-1"
                  >
                    <MessageSquare size={12} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Direct Email */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                    <Mail size={14} className="text-indigo-400" />
                    <span>Priority Technical Dispatch</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check size={13} className="text-teal-400" /> : <Copy size={13} />}
                  </button>
                </div>
                <div>
                  <a 
                    href={`mailto:${email}?subject=${encodeURIComponent("Principal Architect Consultation Request | Pravidhi Sovereign Infrastructure")}`}
                    className="text-sm sm:text-base font-mono font-bold text-white hover:text-indigo-300 transition-colors block truncate"
                  >
                    {email}
                  </a>
                  <span className="text-[11px] font-mono text-zinc-500">Guaranteed 2-Hour SLA Response</span>
                </div>
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent("Principal Architect Consultation Request | Pravidhi Sovereign Infrastructure")}`}
                  className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold text-center transition-all block mt-1"
                >
                  Send Brief via Email
                </a>
              </div>
            </div>

            {/* Final CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleClaimOffer}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-zinc-950 font-bold text-sm tracking-wide font-sans shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                <span>Claim 30-Min Architecture Session</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                Continue Browsing
              </button>
            </div>

            {/* Footer Assurance */}
            <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-zinc-400" />
                Mutual NDA Protected
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-zinc-400" />
                Zero Spam Assurance
              </span>
              <span>•</span>
              <span>Fixed-Price Guarantee</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
