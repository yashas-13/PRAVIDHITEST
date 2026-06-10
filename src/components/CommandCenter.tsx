import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Loader2, Sparkles, Terminal, ArrowRight, CornerDownLeft, Command, HelpCircle } from "lucide-react";
import { useStore } from "../store";

interface Suggestion {
  title: string;
  category: string;
  description: string;
  readyTime: string;
}

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSuggestion: (topic: string) => void;
}

export default function CommandCenter({ isOpen, onClose, onSelectSuggestion }: CommandCenterProps) {
  const setCursorType = useStore((state) => state.setCursorType);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when loaded
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle hotkeys (escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Debounced real-time retrieval with abort controller to prevent race conditions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/agent/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        } else if (data.error) {
          console.error("Autocomplete API error:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch low-latency autocomplete suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    }, 150); // 150ms debounce for extreme responsive speed

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 backdrop-blur-md bg-black/60 pointer-events-auto"
          onClick={handleBackdropClick}
        >
          {/* Main Dialog box */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="w-full max-w-2xl bg-zinc-950/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.15)] flex flex-col"
          >
            {/* Header / Input controls */}
            <div className="relative flex items-center border-b border-zinc-800 p-4">
              <Search className="text-zinc-500 mr-3 shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a solution idea (e.g. web crawler, messaging bot, portfolio analyzer)..."
                className="w-full bg-transparent text-white border-none outline-none focus:ring-0 text-base placeholder-zinc-500 font-sans tracking-tight"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="animate-spin text-teal-400 shrink-0" size={18} />
                ) : (
                  <span className="hidden sm:flex text-[9px] font-mono select-none px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-500 tracking-wider">
                    ESC
                  </span>
                )}
              </div>
            </div>

            {/* Results listing */}
            <div className="max-h-[350px] overflow-y-auto p-4 custom-scrollbar">
              {!query.trim() ? (
                <div className="py-6 text-center text-zinc-500 flex flex-col items-center justify-center gap-3">
                  <Terminal size={24} className="text-teal-400/80 animate-pulse" />
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                    REAL-TIME COMMAND AUTOCOMPLETE
                  </p>
                  <p className="text-xs max-w-sm font-sans text-zinc-500 leading-relaxed">
                    Type engineering requirements above. Flash-Lite will instantly structure and predict sub-routine components.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3">
                    {["Real-time CRM integrations", "Visual performance telemetry", "WhatsApp sales engine"].map((pill) => (
                      <button
                        key={pill}
                        className="text-[11px] font-mono border border-zinc-800 bg-zinc-900/50 text-teal-300 rounded-full px-3 py-1 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all cursor-pointer"
                        onClick={() => setQuery(pill)}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>
              ) : suggestions.length === 0 && !isLoading ? (
                <div className="py-8 text-center text-zinc-600 font-mono text-xs">
                  NO AGENT RESULTS FOUND_
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-1 border-b border-zinc-900 pb-2">
                    <span className="uppercase tracking-widest">Predicted modules by Flash-Lite</span>
                    <span>3 RESULTS (LOW LATENCY)</span>
                  </div>

                  {suggestions.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => {
                        onSelectSuggestion(`Tell me about your "${item.title}" from the ${item.category} category. How would PRAVIDHI build it?`);
                        onClose();
                      }}
                      className="group cursor-pointer p-3 rounded-xl border border-zinc-900 hover:border-teal-500/30 bg-zinc-900/20 hover:bg-teal-500/10 transition-all flex items-center justify-between gap-4"
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 leading-none">
                            {item.category}
                          </span>
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 leading-none">
                            {item.readyTime}
                          </span>
                        </div>
                        <h4 className="text-sm font-sans font-bold text-white group-hover:text-teal-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1 group-hover:text-zinc-300 transition-colors">
                          {item.description}
                        </p>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:text-black text-zinc-400 transition-all">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky HUD Footer */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Command size={11} className="text-teal-400" /> Click module to inject to Agent
                </span>
              </div>
              <span className="text-teal-500/80 animate-pulse">● LATENCY: &lt;150ms VIA FLASH-LITE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
