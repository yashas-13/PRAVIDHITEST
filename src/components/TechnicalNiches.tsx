import { motion, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { 
  ShieldCheck, BrainCircuit, RefreshCw, Terminal, ArrowUpRight, 
  CheckCircle2, Lock, Clock, DollarSign, Sparkles, ArrowRight, Zap,
  Radio, Layers, Cpu
} from 'lucide-react';
import GlitchEntrance from './GlitchEntrance';
import ZeroDayThreatRadar from './ZeroDayThreatRadar';
import SkillNodesMesh from './SkillNodesMesh';
import { useStore } from '../store';

export interface ProductisedPackage {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  billingType: string;
  deliveryCycle: string;
  bestFor: string;
  description: string;
  deliverables: string[];
  icon: any;
  accentColor: string;
  borderHover: string;
  bgGlow: string;
}

export const PRODUCTISED_PACKAGES: ProductisedPackage[] = [
  {
    id: "cloud-security-hardening",
    badge: "14-Day Overhaul",
    title: "Sovereign-Grade Cloud Security Hardening",
    subtitle: "Turn multi-cloud infrastructure into a zero-trust fortress.",
    price: "₹5,00,000",
    billingType: "Flat-Rate Sprint",
    deliveryCycle: "14-Day Cycle Delivery",
    bestFor: "Fintech, Healthtech, & High-Compliance Startups",
    description: "A complete 14-day architecture overhaul transforming your multi-cloud footprint into a bulletproof, zero-trust system without breaking developer productivity.",
    deliverables: [
      "IAM Zero-Trust lockdown & least-privilege role matrix",
      "VPC Peering, Private Link, and strict ingress/egress filtering",
      "KMS envelope encryption across all databases and S3/GCS buckets",
      "Automated CIS Benchmark L2 compliance scan & hardening scripts",
      "Production-grade runbook & zero-trust architect signoff"
    ],
    icon: <ShieldCheck className="w-8 h-8 text-teal-400" />,
    accentColor: "text-teal-400",
    borderHover: "group-hover:border-teal-500/50",
    bgGlow: "from-teal-500/10 via-emerald-950/20 to-transparent"
  },
  {
    id: "ai-ops-audit",
    badge: "7-Day Sprint",
    title: "AI Ops & Infrastructure Audit",
    subtitle: "Security penetration & cost-leakage audit of live LLM pipelines.",
    price: "₹2,50,000",
    billingType: "One-Time Deep Audit",
    deliveryCycle: "7-Day Sprint Delivery",
    bestFor: "Funded Startups with Skyrocketing Cloud & Inference Bills",
    description: "A forensic deep-dive security penetration and cost-leakage audit of your live LLM ingestion pipelines, container clusters, and GPU workloads.",
    deliverables: [
      "Token & compute cost leakage elimination analysis (30-60% reduction)",
      "Prompt injection, data poisoning & exfiltration penetration testing",
      "Vector DB latency profiling & semantic caching configuration",
      "GPU node right-sizing & spot instance orchestration setup",
      "Prioritized executive audit report & 48-hour remediation patch list"
    ],
    icon: <BrainCircuit className="w-8 h-8 text-sky-400" />,
    accentColor: "text-sky-400",
    borderHover: "group-hover:border-sky-500/50",
    bgGlow: "from-sky-500/10 via-blue-950/20 to-transparent"
  },
  {
    id: "managed-devsecops",
    badge: "Continuous Retainer",
    title: "Managed DevSecOps Solo-Retainer",
    subtitle: "An elite 10-year veteran infrastructure lead on dedicated tap.",
    price: "₹3,00,000",
    billingType: "per month",
    deliveryCycle: "Dedicated Solo Retainer (Max 2 Clients Active)",
    bestFor: "Scaling Tech Firms Needing an Outsourced Principal Architect",
    description: "Continuous compliance, automated Infrastructure-as-Code maintenance, and weekly security patches executed directly by a single veteran principal architect.",
    deliverables: [
      "Weekly Linux kernel, container, and dependency vulnerability patching",
      "Automated CI/CD canary rollouts and zero-downtime blue/green deployments",
      "Terraform state drift detection & automated state healing",
      "Direct Slack/Discord access to the principal architect (No junior layer)",
      "24/7 P0 infrastructure incident response protocol"
    ],
    icon: <RefreshCw className="w-8 h-8 text-indigo-400" />,
    accentColor: "text-indigo-400",
    borderHover: "group-hover:border-indigo-500/50",
    bgGlow: "from-indigo-500/10 via-violet-950/20 to-transparent"
  },
  {
    id: "compliance-as-code",
    badge: "Enterprise License",
    title: "Compliance-as-Code Automation Kit",
    subtitle: "Pre-built sovereign-grade Terraform & Ansible modules.",
    price: "₹10,00,000",
    billingType: "One-Time IP Handover",
    deliveryCycle: "Instant Deployment & Customization",
    bestFor: "Enterprises Targeting Instant SOC2, ISO 27001, or DPDP Readiness",
    description: "Deployment of proprietary, production-ready Terraform and Ansible automation blocks built to global government security and sovereign cloud standards.",
    deliverables: [
      "Multi-cloud Terraform modules for AWS, Azure & GCP pre-hardened",
      "Ansible playbooks for automated Linux OS security baseline enforcement",
      "Automated DPDP / ISO 27001 / SOC2 audit-ready evidence extraction",
      "Complete IP ownership, source code transfer, and internal team training",
      "Lifetime baseline updates & 90 days of direct architect advisory"
    ],
    icon: <Terminal className="w-8 h-8 text-amber-400" />,
    accentColor: "text-amber-400",
    borderHover: "group-hover:border-amber-500/50",
    bgGlow: "from-amber-500/10 via-orange-950/20 to-transparent"
  }
];

export default function TechnicalNiches() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const setCursorType = useStore((state) => state.setCursorType);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'radar' | 'skills' | 'packages'>('radar');

  const handleSelectPackage = (pkg: ProductisedPackage) => {
    setSelectedPackage(pkg.id);
    const formEl = document.getElementById("contact");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event to pre-populate package selector in contact form
      window.dispatchEvent(new CustomEvent("select-package", { detail: pkg.id }));
    }
  };

  return (
    <section 
      id="productised-services" 
      ref={containerRef}
      className="bg-zinc-950 relative z-30 text-zinc-100 w-full min-h-screen py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800"
    >
      {/* Background Subtle Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 40px)` }}
      />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative">
        
        {/* Navigation Selector Bar: Zero-Day Radar vs Skill Nodes vs Fixed Packages */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Technical Niches & Sovereign Defense Scope
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'radar'
                  ? 'bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Radio size={14} className={activeTab === 'radar' ? 'text-zinc-950' : 'text-rose-400'} />
              <span>Zero-Day Threat Radar (Live)</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Cpu size={14} className={activeTab === 'skills' ? 'text-zinc-950' : 'text-teal-400'} />
              <span>Skill Nodes Mesh (Framer Motion)</span>
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'packages'
                  ? 'bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
            >
              <Layers size={14} className={activeTab === 'packages' ? 'text-zinc-950' : 'text-teal-400'} />
              <span>Fixed-Price Solutions Menu</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display based on active tab */}
        {activeTab === 'radar' ? (
          <div className="w-full">
            <ZeroDayThreatRadar />
            
            {/* Quick transition footer linking to packages */}
            <div className="mt-8 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-teal-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Need Guaranteed 14-Day Sovereign Remediation?</h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    All zero-day mitigations are packaged into transparent, fixed-price sprint contracts with 100% IP handover.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('skills')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu size={13} className="text-teal-400" />
                  <span>Inspect Skill Nodes</span>
                </button>
                <button
                  onClick={() => setActiveTab('packages')}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <span>View Fixed-Price Solutions Menu</span>
                  <ArrowRight size={14} className="text-teal-400" />
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'skills' ? (
          <div className="w-full space-y-8">
            <SkillNodesMesh />
            
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Radio className="w-6 h-6 text-rose-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">View Live Zero-Day Threat Dispatches</h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    See how these exact Ansible & Terraform engines neutralize active CVEs in real-time.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('radar')}
                className="px-5 py-2.5 rounded-xl bg-teal-400 text-zinc-950 font-mono text-xs font-bold flex items-center gap-2 hover:bg-teal-300 transition-all cursor-pointer"
              >
                <Radio size={14} />
                <span>Open Zero-Day Threat Radar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 relative">
            
            {/* Left: Sticky Header Area */}
            <div className="w-full lg:w-5/12 relative">
              <div className="sticky top-32 lg:top-40 flex flex-col z-20">
                <GlitchEntrance id="productised-services-glitch">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-mono mb-8 uppercase tracking-widest">
                    <ShieldCheck size={14} /> Fixed-Price Solutions Menu
                  </div>
                  
                  <h2 className="text-[3.2rem] md:text-[4.5rem] xl:text-[5.5rem] tracking-tighter leading-[0.92] mb-6">
                    <span className="font-serif italic font-normal text-zinc-400">Sovereign</span> <br/>
                    <span className="font-black text-white uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-teal-300 drop-shadow-lg">Outcomes.</span>
                  </h2>
                  
                  <p className="text-base md:text-lg text-zinc-400 font-medium tracking-tight leading-relaxed max-w-md mb-8">
                    Direct engagement with a 10-year veteran principal architect. No junior handoffs, no open-ended hourly billing, no surprise invoices. Flat-rate, sovereign-grade execution delivered in fixed sprint cycles.
                  </p>

                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm max-w-md mb-8 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <Lock size={12} />
                      <span>Strict Sovereign Confidentiality Protocol</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      All infrastructure hardening runs under airtight multi-government & enterprise NDAs. Zero client data leaves your designated cloud perimeter.
                    </p>
                  </div>

                  {/* Progress Tracker Line */}
                  <div className="hidden lg:block w-full max-w-[12rem] h-[3px] bg-zinc-800 rounded-full relative overflow-hidden">
                     <motion.div 
                       className="absolute top-0 left-0 h-full bg-teal-400"
                       style={{ scaleX: scrollYProgress, originX: 0 }}
                     />
                  </div>
                </GlitchEntrance>
              </div>
            </div>

            {/* Right: The 4 High-Ticket Productised Cards */}
            <div className="w-full lg:w-7/12 flex flex-col gap-8 md:gap-12 relative z-10 lg:pb-32">
              {PRODUCTISED_PACKAGES.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`group relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2.2rem] p-8 md:p-10 overflow-hidden ${item.borderHover} hover:bg-zinc-900/70 transition-all duration-500 shadow-2xl`}
                >
                  {/* Card Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  
                  {/* Large Index in background */}
                  <div className="absolute top-4 right-6 text-[7rem] md:text-[9rem] font-black leading-none text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-500 pointer-events-none select-none font-mono">
                    0{idx + 1}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header Row */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center border border-zinc-800 group-hover:scale-105 transition-transform duration-300">
                         {item.icon}
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-mono text-2xl md:text-3xl font-black text-white tracking-tight flex items-baseline gap-1">
                          {item.price}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                          {item.billingType}
                        </span>
                      </div>
                    </div>

                    {/* Sub-Badges */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-teal-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={11} className="text-teal-400" /> {item.deliveryCycle}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                        Target: {item.bestFor}
                      </span>
                    </div>

                    {/* Title and Pitch */}
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2 font-sans">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-zinc-300 font-medium leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 mb-6 space-y-2.5">
                      <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-2">
                        <Zap size={12} className={item.accentColor} />
                        <span>Included Sovereign Deliverables:</span>
                      </div>
                      {item.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300 font-sans">
                          <CheckCircle2 size={15} className={`${item.accentColor} shrink-0 mt-0.5`} />
                          <span className="leading-snug">{del}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Action Footer */}
                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => handleSelectPackage(item)}
                        className="px-6 py-3 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-teal-300 hover:text-black transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
                      >
                        <span>Select {item.price} Package</span>
                        <ArrowRight size={14} />
                      </button>

                      <span className="text-xs font-mono text-zinc-500">
                        Guaranteed Principal Delivery
                      </span>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
