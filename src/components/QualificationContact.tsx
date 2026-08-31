import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Lock, Send, CheckCircle2, ArrowRight, Sparkles, 
  MessageSquare, FileText, Clock, Server, Terminal, Calendar
} from 'lucide-react';
import { useStore } from '../store';
import GlitchEntrance from './GlitchEntrance';

export default function QualificationContact() {
  const setCursorType = useStore((state) => state.setCursorType);

  const [selectedPackage, setSelectedPackage] = useState("cloud-security-hardening");
  const [environment, setEnvironment] = useState("AWS");
  const [timeline, setTimeline] = useState("immediate");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for package selection events from other sections
  useEffect(() => {
    const handleSelectPackageEvent = (e: CustomEvent<string>) => {
      if (e.detail) {
        setSelectedPackage(e.detail);
      }
    };
    window.addEventListener("select-package" as any, handleSelectPackageEvent);
    return () => window.removeEventListener("select-package" as any, handleSelectPackageEvent);
  }, []);

  const packageOptions = [
    { id: "cloud-security-hardening", name: "Cloud Security Hardening", price: "₹5,00,000", cycle: "14-Day Sprint" },
    { id: "ai-ops-audit", name: "AI Ops & Infra Audit", price: "₹2,50,000", cycle: "7-Day Sprint" },
    { id: "managed-devsecops", name: "Managed DevSecOps Retainer", price: "₹3,00,000/mo", cycle: "Dedicated Lead" },
    { id: "compliance-as-code", name: "Compliance-as-Code Kit", price: "₹10,00,000", cycle: "Full IP License" },
    { id: "custom-sovereign", name: "Custom Enterprise Scope", price: ">₹15,00,000", cycle: "Tailored Architecture" }
  ];

  const environments = ["AWS", "Azure", "GCP", "Multi-Cloud / Hybrid", "Bare-Metal Linux"];
  const timelines = [
    { id: "immediate", label: "Immediate (Next 14-Day Sprint)" },
    { id: "30-days", label: "Within Next 30 Days" },
    { id: "quarterly", label: "Upcoming Quarter" }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !companyName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Pravidhi Architect. We are interested in the "${selectedPackage}" package for ${companyName || 'our company'}. Primary Environment: ${environment}. Timeline: ${timeline}.`
    );
    window.open(`https://wa.me/918217219835?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-black text-white relative z-30 border-t border-zinc-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 blur-[180px] rounded-full pointer-events-none" />

      <GlitchEntrance id="contact-glitch">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 5 Columns: Positioning & Authority Assurance */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-400 text-xs font-mono uppercase tracking-widest">
                <Lock size={12} /> High-Ticket Qualification Brief
              </div>

              <h2 className="text-[3rem] sm:text-[4rem] font-sans font-black tracking-tighter leading-[0.95]">
                Engage the <span className="font-serif italic font-normal text-zinc-300">Principal</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-300 to-white">
                  Architect.
                </span>
              </h2>

              <p className="text-zinc-400 text-base leading-relaxed font-medium">
                Pravidhi limits active client engagements to 2 high-ticket slots concurrently to guarantee sovereign-grade execution, 100% code ownership, and zero junior degradation.
              </p>

              <div className="space-y-3 pt-4 font-mono text-xs text-zinc-400">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200">Sovereign NDA Standard:</span>
                    <p className="text-zinc-400 mt-1">A mutual NDA is executed prior to reviewing cloud architecture or codebase repositories.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
                  <Clock size={16} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-200">14-Day Delivery Commitment:</span>
                    <p className="text-zinc-400 mt-1">Fixed scope, fixed milestone delivery. No open-ended retainers without clear architectural criteria.</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Option */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3.5 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-teal-300 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer hover:border-teal-500/50"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <MessageSquare size={16} className="text-teal-400" />
                  <span>Direct WhatsApp Priority Channel</span>
                </button>
              </div>
            </div>

            {/* Right 7 Columns: Qualification Form */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center space-y-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black font-sans text-white">
                        Qualification Brief Logged.
                      </h3>
                      <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                        Our Principal Architect will personally review your infrastructure environment and email you within 4 business hours to initiate the mutual NDA and sprint scoping call.
                      </p>
                      <div className="pt-4">
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-2.5 rounded-full bg-zinc-900 text-xs font-mono text-zinc-300 border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                          Submit Another Brief
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form key="form" onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Step 1: Package Selection */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                          1. Select Sovereign Package
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {packageOptions.map((pkg) => (
                            <div
                              key={pkg.id}
                              onClick={() => setSelectedPackage(pkg.id)}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                                selectedPackage === pkg.id 
                                  ? 'bg-teal-500/10 border-teal-400 text-white shadow-[0_0_20px_rgba(20,184,166,0.2)]' 
                                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                              }`}
                              onMouseEnter={() => setCursorType('pointer')}
                              onMouseLeave={() => setCursorType('default')}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold font-sans text-zinc-200">{pkg.name}</span>
                                <span className="text-xs font-mono font-black text-teal-400">{pkg.price}</span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-500 block mt-1">{pkg.cycle}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Primary Cloud / Infrastructure Environment */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                          2. Primary Infrastructure Environment
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {environments.map((env) => (
                            <button
                              type="button"
                              key={env}
                              onClick={() => setEnvironment(env)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                                environment === env
                                  ? 'bg-white text-black font-bold shadow-md'
                                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                              }`}
                              onMouseEnter={() => setCursorType('pointer')}
                              onMouseLeave={() => setCursorType('default')}
                            >
                              {env}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 3: Timeline */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                          3. Deployment Timeline / Urgency
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {timelines.map((t) => (
                            <button
                              type="button"
                              key={t.id}
                              onClick={() => setTimeline(t.id)}
                              className={`p-2.5 rounded-xl text-xs font-mono transition-all text-center cursor-pointer ${
                                timeline === t.id
                                  ? 'bg-teal-500/20 border border-teal-400 text-teal-300 font-bold'
                                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                              }`}
                              onMouseEnter={() => setCursorType('pointer')}
                              onMouseLeave={() => setCursorType('default')}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 4: Company Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                            Company / Entity Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex Health Technologies"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="architect@yourdomain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Step 5: Primary Challenge */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                          Key Infrastructure Challenge or Security Mandate
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Briefly describe your stack, compliance requirement (e.g. SOC2/DPDP), or LLM latency bottleneck..."
                          value={challenge}
                          onChange={(e) => setChallenge(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-teal-400 text-zinc-950 font-black text-sm uppercase tracking-wider rounded-xl hover:bg-teal-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(45,212,191,0.3)] disabled:opacity-50"
                          onMouseEnter={() => setCursorType('pointer')}
                          onMouseLeave={() => setCursorType('default')}
                        >
                          {isSubmitting ? (
                            <span>Encrypting & Logging Brief...</span>
                          ) : (
                            <>
                              <span>Submit Brief & Request NDA Scoping Call</span>
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                        <p className="text-center font-mono text-[10px] text-zinc-500 mt-3">
                          🔒 Handled under strict sovereign zero-trust NDA confidentiality. No spam.
                        </p>
                      </div>

                    </form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </GlitchEntrance>
    </section>
  );
}
