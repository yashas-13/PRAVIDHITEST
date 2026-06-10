import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, X, Send, Sparkles, Terminal, ArrowDown, HelpCircle, 
  RefreshCw, Bot, User, CornerDownLeft, CircleDot, Activity, Search
} from "lucide-react";
import { useStore } from "../store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AssistantAgentProps {
  inputTrigger?: string;
  onClearTrigger?: () => void;
  onOpenSearch: () => void;
}

export default function AssistantAgent({ inputTrigger, onClearTrigger, onOpenSearch }: AssistantAgentProps) {
  const setCursorType = useStore((state) => state.setCursorType);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "PRAVIDHI sub-routine initialized. Low-latency Flash-Lite conversational channel is open. Ask me anything about our software engineering modules, deployment readiness, or custom telemetry systems.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Handle outside triggers (e.g. from Autocomplete search clicking)
  useEffect(() => {
    if (inputTrigger) {
      setIsOpen(true);
      sendPrompt(inputTrigger);
      onClearTrigger?.();
    }
  }, [inputTrigger]);

  // Adjust unread counts
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const quickPrompts = [
    { label: "⚡ Flash-Lite Speed?", prompt: "Why is gemini-3.1-flash-lite so low-latency? Give numeric or technical advantages." },
    { label: "🛠️ PRAVIDHI Modules", prompt: "Summarize the tailored engineering bundles of PRAVIDHI." },
    { label: "🧬 AI Employees", prompt: "Explain how Next-Gen Localized AI Workforce integrates into corporate workflows." },
  ];

  const sendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: promptText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    // Initial placeholder assistant response
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      // Pack the chat history (excluding the current user prompt)
      // to give model standard chronological awareness
      const currentHistory = messages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch(
        `/api/agent/stream?message=${encodeURIComponent(promptText)}&history=${encodeURIComponent(JSON.stringify(currentHistory))}`
      );

      if (!response.body) {
        throw new Error("Empty stream body received from Pravidih proxy server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6).trim();
            if (dataStr === "[DONE]") {
              // End of stream
              break;
            } else {
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  setMessages((prev) => {
                    const clone = [...prev];
                    const last = clone[clone.length - 1];
                    if (last && last.role === "assistant") {
                      last.content += parsed.text;
                    }
                    return clone;
                  });
                } else if (parsed.error) {
                  setMessages((prev) => {
                    const clone = [...prev];
                    const last = clone[clone.length - 1];
                    if (last && last.role === "assistant") {
                      last.content = `[TELEMETRY PROXY ERROR: ${parsed.error}]`;
                    }
                    return clone;
                  });
                }
              } catch {
                // Ignore chunk parse errors to guarantee seamless presentation
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Stream reader error:", err);
      setMessages((prev) => {
        const clone = [...prev];
        const last = clone[clone.length - 1];
        if (last && last.role === "assistant") {
          last.content = `[TELEMETRY FAILURE] Unable to sync connection to Pravidhi node. Ensure your API key is correctly registered under secrets or reload the workspace.`;
        }
        return clone;
      });
    } finally {
      setIsStreaming(false);
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(input);
    }
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-zinc-950 border border-teal-500/40 text-teal-400 hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.25)] select-none pointer-events-auto cursor-pointer"
          onMouseEnter={() => setCursorType("pointer")}
          onMouseLeave={() => setCursorType("default")}
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <div className="relative">
              <Bot size={22} className="animate-pulse" />
              {/* Pulsing signal dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-400 border border-black animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-400 border border-black" />
            </div>
          )}

          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
              {unreadCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Drawer Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[420px] h-[550px] bg-zinc-950/95 border border-zinc-900 rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-40 backdrop-blur-md pointer-events-auto"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-zinc-900/50 border-b border-zinc-900 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase">
                    SYS_COOP_AGENT_01
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 leading-none mt-0.5">
                    LATENCY: FLASH-LITE MODE ACTIVE
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenSearch}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Search capabilities with Autocomplete"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  <Search size={14} />
                </button>
                <button
                  onClick={() => {
                    setMessages([
                      {
                        role: "assistant",
                        content: "PRAVIDHI sub-routine reset. Communication buffer cleared. What capability should we develop next?",
                      },
                    ]);
                  }}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-teal-400 transition-colors cursor-pointer"
                  title="Clear telemetry archive"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-lg bg-teal-400/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                      <Bot size={14} />
                    </div>
                  )}
                  <div 
                    className={`max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed font-sans ${
                      msg.role === "user" 
                        ? "bg-teal-500 text-black font-semibold rounded-tr-none px-4 shadow-[0_0_15px_rgba(20,184,166,0.15)]" 
                        : "bg-zinc-900/40 border border-zinc-800/80 text-zinc-200 rounded-tl-none font-sans"
                    }`}
                  >
                    {msg.content ? (
                      msg.content
                    ) : (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center shrink-0">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* In-chat suggestion chips */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 pt-1 flex flex-col gap-2">
                <p className="text-[10px] font-mono text-zinc-500 select-none uppercase tracking-wider">
                  Test instant Flash-Lite latency:
                </p>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => sendPrompt(p.prompt)}
                      className="text-left text-[11px] border border-zinc-900 hover:border-teal-500/30 bg-zinc-900/30 hover:bg-teal-500/10 text-zinc-300 rounded-lg p-2 transition-all block cursor-pointer outline-none"
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input controls */}
            <div className="p-4 bg-zinc-900/20 border-t border-zinc-900">
              <div className="relative flex items-center rounded-xl bg-zinc-950 border border-zinc-800 focus-within:border-teal-500/50 transition-colors p-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  placeholder="Ask Pravidhi telemetry..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none text-white outline-none focus:ring-0 text-xs placeholder-zinc-600 resize-none max-h-16 py-1 px-1 tracking-tight"
                />
                <button
                  onClick={() => sendPrompt(input)}
                  disabled={!input.trim() || isStreaming}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    input.trim() && !isStreaming
                      ? "bg-teal-400 text-black hover:bg-teal-300 cursor-pointer"
                      : "bg-zinc-900 text-zinc-600 cursor-default"
                  }`}
                  onMouseEnter={() => input.trim() && !isStreaming && setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  <Send size={12} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-600 select-none">
                <span>Enter to Send, Shift+Enter for new line</span>
                <span className="text-teal-500/50">NODE_ONLINE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
