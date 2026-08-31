import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, HelpCircle, ChevronDown, ChevronUp, Shield, 
  Terminal, Server, Lock, Cpu, ArrowUpRight, CheckCircle2, Sparkles,
  Search, Copy, Check, Hash, DollarSign, RefreshCw, KeyRound, Globe
} from 'lucide-react';
import GlitchEntrance from './GlitchEntrance';
import { useStore } from '../store';

export interface FAQItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  codeSnippet?: string;
  highlights: string[];
  searchKeywords: string[];
}

export const FAQS: FAQItem[] = [
  {
    id: "sovereign-grade-infrastructure-definition",
    category: "Sovereign Infrastructure",
    question: "What is sovereign-grade cloud infrastructure hardening?",
    highlights: ["Zero-Trust Isolation", "CIS Benchmark Level 2", "KMS Envelope Encryption"],
    searchKeywords: ["sovereign", "infrastructure", "hardening", "cis level 2", "zero trust", "kms", "cloud security"],
    answer: "Sovereign-grade cloud infrastructure hardening is an enterprise-grade security engineering protocol that enforces strict zero-trust network topology, eliminates public ingress exposure, establishes hardware-backed or KMS envelope encryption on all data-at-rest, and applies automated CIS Benchmark Level 2 controls across AWS, Azure, GCP, and raw Linux OS kernels.",
    codeSnippet: "# Linux Kernel Hardening Sample (sysctl.d/99-sovereign.conf)\nfs.protected_fifos = 2\nfs.protected_hardlinks = 1\nfs.protected_symlinks = 1\nkernel.dmesg_restrict = 1\nkernel.kptr_restrict = 2\nnet.ipv4.conf.all.rp_filter = 1\nnet.ipv4.tcp_syncookies = 1"
  },
  {
    id: "fixed-price-dev-packages",
    category: "Fixed-Price Sprints",
    question: "How much do fixed-price DevSecOps and cloud security sprint packages cost?",
    highlights: ["Flat-Rate Pricing", "Zero Scope Creep", "Milestone Invoicing"],
    searchKeywords: ["pricing", "cost", "fixed-price", "sprint package", "retainer cost", "flat rate", "fees"],
    answer: "We offer transparent, fixed-price delivery contracts: the 14-Day Sovereign Cloud Hardening Sprint starts at ₹3,50,000 / $4,200 USD; the AI Ops Cost & Security Audit is priced at ₹2,50,000 / $3,000 USD; and the Managed DevSecOps Solo-Retainer is ₹4,50,000 / $5,500 USD per month (capped at 2 active clients concurrently). All packages include milestone-gated deliverables and zero hidden hourly billing.",
  },
  {
    id: "14-day-hardening-deliverables",
    category: "Security & Hardening",
    question: "What specific deliverables are included in the 14-Day Sovereign Cloud Hardening Sprint?",
    highlights: ["Modular Terraform IaC", "OPA Gatekeeper Policies", "mTLS Service Mesh"],
    searchKeywords: ["14 day sprint", "deliverables", "terraform", "ansible", "hardening scope", "opa", "mtls"],
    answer: "You receive clean, modular Terraform/OpenTofu and Ansible repositories containing: (1) CIS Level 2 benchmark compliance manifests, (2) Automated mTLS service mesh and private VPC peering architectures, (3) Least-privilege IAM roles with time-bound session policies, (4) Automated KMS key envelope encryption pipelines, and (5) Cryptographic compliance evidence generators.",
    codeSnippet: "# Open Policy Agent (OPA) Guardrail Sample\npackage terraform.security\ndefault allow = false\nallow {\n  input.resource.aws_s3_bucket.server_side_encryption_configuration.rule.apply_server_side_encryption_by_default.sse_algorithm == \"aws:kms\"\n}"
  },
  {
    id: "ai-ops-cost-reduction",
    category: "AI & LLM Ops",
    question: "How does the AI Ops Audit achieve 30% to 60% compute and inference bill reduction?",
    highlights: ["Semantic Caching", "GPU Spot Orchestration", "Prompt Token Pruning"],
    searchKeywords: ["ai ops", "cost reduction", "llm cost", "semantic cache", "gpu spots", "vector db", "tokens"],
    answer: "We analyze high-frequency vector database query latencies, implement Redis/Qdrant-backed semantic caching to eliminate redundant LLM inference calls, right-size inference worker pods, orchestrate automated failover spot GPU instances, and prune repetitive system prompts with structured tokenizer profiles.",
    codeSnippet: "// Semantic Cache Interceptor (Redis Vector)\nconst queryHash = await generateEmbedding(userQuery);\nconst cachedMatch = await vectorStore.findNearest(queryHash, { similarityThreshold: 0.96 });\nif (cachedMatch) return cachedMatch.response;"
  },
  {
    id: "sovereign-code-ownership",
    category: "IP & Commercials",
    question: "Who owns the code, Terraform manifests, and architecture intellectual property (IP)?",
    highlights: ["100% Client Ownership", "Zero License Fees", "Full Source & Key Transfer"],
    searchKeywords: ["ip ownership", "intellectual property", "source code", "git transfer", "license", "vendor lock-in"],
    answer: "You retain 100% full, unencumbered intellectual property ownership. Upon milestone settlement, all Git repositories, configuration playbooks, CI/CD scripts, documentation, and encryption key access are transferred entirely to your organization with zero ongoing vendor lock-in or recurring licensing royalties.",
  },
  {
    id: "dpdp-soc2-compliance",
    category: "Compliance & Governance",
    question: "How does Pravidhi Solutions automate compliance with India's DPDP Act 2023 and SOC2?",
    highlights: ["Compliance-as-Code", "Automated Evidence Collector", "Zero-Trust IAM Governance"],
    searchKeywords: ["dpdp act 2023", "soc2", "compliance", "india data residency", "audit evidence", "iso 27001"],
    answer: "We deploy Compliance-as-Code modules using Open Policy Agent (OPA) and Terraform Cloud/Atlantis. These scripts continuously validate IAM least-privilege policies, verify multi-region data residency boundaries as mandated under India's DPDP Act 2023, and auto-generate cryptographic audit artifacts directly into your compliance tracking dashboard.",
  },
  {
    id: "solo-retainer-sla",
    category: "Retainers & SLA",
    question: "What is the incident response SLA and availability for the Managed DevSecOps Solo-Retainer?",
    highlights: ["15-Min P0 Response", "Direct Principal Access", "Max 2 Active Clients"],
    searchKeywords: ["sla", "incident response", "retainer", "principal architect", "solo retainer", "emergency"],
    answer: "Because we cap active retainer slots to a maximum of 2 clients concurrently, you get direct Slack/Discord hotline access to our 10-year veteran principal architect. P0 catastrophic infrastructure outages trigger an automated 15-minute response SLA, with automated canary rollback scripts already pre-configured.",
  },
  {
    id: "multi-cloud-kubernetes-sovereignty",
    category: "Architecture",
    question: "Can sovereign cloud configurations be deployed across AWS, GCP, Azure, and bare-metal Kubernetes?",
    highlights: ["Multi-Cloud Parity", "Bare-Metal Ready", "Cloud-Agnostic IaC"],
    searchKeywords: ["multi-cloud", "kubernetes", "k8s", "aws", "gcp", "azure", "bare metal", "hybrid cloud"],
    answer: "Yes. All infrastructure modules are written in modular Terraform/OpenTofu and cloud-agnostic container definitions. Whether operating on AWS GovCloud, Google Cloud, Microsoft Azure, bare-metal server racks, or sovereign on-prem datacenters, our security configurations translate seamlessly.",
  }
];

export default function TechnicalKnowledgeBase({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [faqsData, setFaqsData] = useState<FAQItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pravidhi_custom_faqs_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return FAQS;
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<string | null>("sovereign-grade-infrastructure-definition");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const setCursorType = useStore((state) => state.setCursorType);

  // Listen to custom event when admin portal updates FAQs
  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('pravidhi_custom_faqs_v1');
      if (saved) {
        try { setFaqsData(JSON.parse(saved)); } catch (e) { /* fallback */ }
      }
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('faqs-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('faqs-updated', handleUpdate);
    };
  }, []);

  const categories = [
    "All", 
    ...Array.from(new Set(faqsData.map(f => f.category)))
  ];

  // Filter based on active category AND search text
  const filteredFaqs = faqsData.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    if (!searchQuery.trim()) return matchesCategory;

    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.highlights.some(h => h.toLowerCase().includes(q)) ||
      faq.searchKeywords.some(k => k.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Check URL hash on initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const found = faqsData.find(f => f.id === hash);
      if (found) {
        setOpenFaq(found.id);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [faqsData]);

  // Prepare FAQPage JSON-LD schema
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section 
      id="insights-faq" 
      className="py-28 px-6 md:px-12 bg-zinc-950 text-white relative z-20 border-t border-zinc-800"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* Dynamic React FAQPage Schema Injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      {/* Background Ambient Element */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />

      <GlitchEntrance id="insights-glitch">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Admin Trigger */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-6 uppercase tracking-widest">
                <BookOpen size={14} className="text-indigo-400" /> FAQPage JSON-LD Verified • Knowledge Base
              </div>

              <h2 className="text-[2.8rem] sm:text-[4rem] font-sans font-black tracking-tighter leading-[0.95] mb-6">
                Sovereign Cloud & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-teal-300 to-white">
                  Fixed-Price Dev FAQs.
                </span>
              </h2>

              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
                Structured technical specifications, pricing breakdowns, and compliance benchmarks for high-intent infrastructure and cloud security evaluations.
              </p>
            </div>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-2 cursor-pointer transition-all shadow-lg self-start lg:self-auto"
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                <Sparkles size={14} className="text-indigo-400" />
                <span>Admin Studio & Editor</span>
              </button>
            )}
          </div>

          {/* Search & Filter Controls */}
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search high-intent queries (e.g. 'pricing', 'CIS benchmark', 'GPU cost', 'DPDP', 'IP ownership')..."
                className="w-full pl-10 pr-10 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter if searching */}
          {searchQuery && (
            <div className="text-xs font-mono text-zinc-400 mb-4">
              Showing {filteredFaqs.length} of {FAQS.length} architectural answers matching "{searchQuery}"
            </div>
          )}

          {/* FAQ Accordion Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center text-zinc-400 font-mono text-sm">
                No matching architectural answers found. Try searching for "pricing", "CIS benchmark", "SLA", or "Terraform".
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                const isCopied = copiedId === faq.id;

                return (
                  <div
                    id={faq.id}
                    key={faq.id}
                    itemScope 
                    itemProp="mainEntity" 
                    itemType="https://schema.org/Question"
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'bg-zinc-900/90 border-indigo-500/40 shadow-2xl' 
                        : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="w-full p-6 text-left flex items-start justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="flex-1 text-left space-y-2 cursor-pointer focus:outline-none"
                        onMouseEnter={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase bg-zinc-950 text-indigo-300 px-2.5 py-0.5 rounded-full border border-zinc-800">
                            {faq.category}
                          </span>
                        </div>
                        <h3 
                          itemProp="name"
                          className="text-base sm:text-lg font-bold font-sans text-white hover:text-indigo-200 transition-colors"
                        >
                          {faq.question}
                        </h3>
                      </button>

                      <div className="flex items-center gap-2 shrink-0 pt-1">
                        {/* Copy Link Button */}
                        <button
                          type="button"
                          onClick={(e) => handleCopyLink(e, faq.id)}
                          title="Copy direct link to question"
                          className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          onMouseEnter={() => setCursorType('pointer')}
                          onMouseLeave={() => setCursorType('default')}
                        >
                          {isCopied ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleFaq(faq.id)}
                          aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                          className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 transition-transform duration-300 cursor-pointer ${isOpen ? 'rotate-180 bg-indigo-500 text-white' : 'hover:bg-zinc-700 hover:text-white'}`}
                          onMouseEnter={() => setCursorType('pointer')}
                          onMouseLeave={() => setCursorType('default')}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          itemScope 
                          itemProp="acceptedAnswer" 
                          itemType="https://schema.org/Answer"
                          className="px-6 pb-6 pt-2 text-zinc-300 text-sm leading-relaxed space-y-4 border-t border-zinc-800/60"
                        >
                          <p itemProp="text">{faq.answer}</p>

                          {/* Highlights List */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {faq.highlights.map((hl, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-teal-300">
                                <CheckCircle2 size={12} className="text-teal-400" />
                                <span>{hl}</span>
                              </span>
                            ))}
                          </div>

                          {/* Code Snippet if present */}
                          {faq.codeSnippet && (
                            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                              <div className="text-[10px] uppercase text-zinc-500 mb-2 flex items-center gap-1.5">
                                <Terminal size={12} className="text-teal-400" />
                                <span>Architectural Artifact Preview</span>
                              </div>
                              <pre className="text-teal-300 whitespace-pre-wrap">{faq.codeSnippet}</pre>
                            </div>
                          )}

                          {/* CTA Prompt */}
                          <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-zinc-800/40">
                            <span className="text-zinc-500">Need specific architectural qualification?</span>
                            <a 
                              href="#contact" 
                              className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-bold"
                            >
                              <span>Book Sprint Evaluation</span>
                              <ArrowUpRight size={13} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </GlitchEntrance>
    </section>
  );
}
