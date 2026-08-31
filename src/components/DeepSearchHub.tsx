import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Globe, Shield, Terminal, Zap, BookOpen, ExternalLink, 
  Sparkles, Award, ArrowUpRight, CheckCircle2, ChevronRight,
  Filter, Tag, SlidersHorizontal, RefreshCw, Cpu, Flame, Lock
} from 'lucide-react';
import { DAILY_ZERO_DAY_ARTICLES, SKILL_NODES, ThreatArticle } from '../data/threatRadarData';
import { FAQS, FAQItem } from './TechnicalKnowledgeBase';
import { useStore } from '../store';

export interface DeepSearchArticle {
  id: string;
  type: 'cve-intelligence' | 'architectural-faq' | 'sovereign-standard';
  title: string;
  category: string;
  summary: string;
  keywords: string[];
  readingTime: string;
  canonicalUrl: string;
  highlights: string[];
  techStack?: string;
  cveId?: string;
  cvss?: number;
  codeSnippet?: string;
  commercialPackage?: string;
}

// Aggregated High-Intent Deep Content Corpus for Search Engines & AdSense Verification
export const DEEP_SEARCH_CORPUS: DeepSearchArticle[] = [
  ...DAILY_ZERO_DAY_ARTICLES.map((art): DeepSearchArticle => ({
    id: art.id,
    type: 'cve-intelligence',
    title: art.title,
    category: 'Zero-Day Threat Radar',
    summary: art.summary,
    keywords: art.seoKeywords,
    readingTime: art.readTime,
    canonicalUrl: `https://pravidhisolutions.in/#threat-radar`,
    highlights: [
      `CVSS Score ${art.cvssScore}`,
      `Status: ${art.status}`,
      `Defended via ${art.remediationPackage}`
    ],
    techStack: art.targetStack,
    cveId: art.cve,
    cvss: art.cvssScore,
    codeSnippet: art.remediationCode.code,
    commercialPackage: art.remediationPackage
  })),
  ...FAQS.map((faq): DeepSearchArticle => ({
    id: faq.id,
    type: 'architectural-faq',
    title: faq.question,
    category: faq.category,
    summary: faq.answer,
    keywords: faq.searchKeywords,
    readingTime: '2 min read',
    canonicalUrl: `https://pravidhisolutions.in/#insights-faq`,
    highlights: faq.highlights,
    codeSnippet: faq.codeSnippet,
    commercialPackage: faq.category === 'Fixed-Price Sprints' ? 'Fixed-Price Sprint Deliverables' : undefined
  })),
  {
    id: 'sovereign-cis-benchmark-l2-playbook',
    type: 'sovereign-standard',
    title: 'Sovereign-Grade CIS Benchmark Level 2 Hardening Standard for Linux & Multi-Cloud',
    category: 'Sovereign Standards',
    summary: 'A formal engineering specification covering mandatory sysctl variables, filesystem mount hardening, read-only rootfilesystems, distroless containers, and envelope encryption key rotation with automated zero-trust attestations.',
    keywords: ['CIS Benchmark Level 2', 'Linux Hardening', 'Zero Trust Architecture', 'Envelope Encryption', 'KMS Sovereign Keys', 'DPDP Compliance'],
    readingTime: '5 min read',
    canonicalUrl: 'https://pravidhisolutions.in/#services',
    highlights: ['Zero Public Ingress', 'FIPS 140-3 Cryptographic Boundary', '100% Client IP Handover'],
    techStack: 'Linux Kernel 6.x / Terraform / Ansible / OpenTofu / OPA',
    commercialPackage: '14-Day Sovereign Cloud Hardening'
  },
  {
    id: 'ai-ops-gpu-semantic-cache-standard',
    type: 'sovereign-standard',
    title: 'Enterprise AI Ops & GPU Cost Optimization Protocol (30%-60% Cloud Inference Bill Reduction)',
    category: 'AI & LLM Ops',
    summary: 'Detailed architecture for deploying high-throughput vector semantic caching, spot GPU instance orchestration, prompt token pruning algorithms, and private LLM inference firewalls with zero external data leaks.',
    keywords: ['AI Ops Cost Reduction', 'GPU Spot Orchestration', 'LLM Semantic Caching', 'Vector DB Security', 'vLLM Optimization', 'Private AI Infrastructure'],
    readingTime: '4 min read',
    canonicalUrl: 'https://pravidhisolutions.in/#ai-services',
    highlights: ['30%-60% GPU Bill Reduction', 'Sub-15ms Semantic Cache Latency', 'Private Air-Gapped Inference'],
    techStack: 'PyTorch / CUDA / Qdrant / Redis Vector / Kata Containers / vLLM',
    commercialPackage: 'AI Ops & Infrastructure Audit'
  }
];

export default function DeepSearchHub() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const setCursorType = useStore((state) => state.setCursorType);

  const categories = [
    'All',
    'Zero-Day Threat Radar',
    'Sovereign Infrastructure',
    'Security & Hardening',
    'AI & LLM Ops',
    'Fixed-Price Sprints',
    'Compliance & Governance',
    'Sovereign Standards'
  ];

  // High-Intent Filter logic matching multi-word tokens
  const filteredCorpus = DEEP_SEARCH_CORPUS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    if (!searchQuery.trim()) return matchesCategory && matchesType;

    const queryTokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const searchableText = `${item.title} ${item.summary} ${item.keywords.join(' ')} ${item.techStack || ''} ${item.category} ${item.cveId || ''}`.toLowerCase();

    const matchesSearch = queryTokens.every(token => searchableText.includes(token));
    return matchesCategory && matchesType && matchesSearch;
  });

  const activeArticle = DEEP_SEARCH_CORPUS.find(a => a.id === selectedArticleId) || null;

  // Dynamic ItemList JSON-LD Schema for Google Search Deep Indexing & AdSense Quality
  const deepSearchSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': filteredCorpus.slice(0, 15).map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.title,
      'description': item.summary,
      'url': item.canonicalUrl
    }))
  };

  const handleCopyCitation = (article: DeepSearchArticle) => {
    const citation = `Pravidhi Solutions Technical Article: "${article.title}"\nCanonical Link: ${article.canonicalUrl}\nKeywords: ${article.keywords.join(', ')}`;
    navigator.clipboard.writeText(citation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section 
      id="deep-search"
      className="py-24 px-6 md:px-12 bg-zinc-950 text-white relative z-20 border-t border-zinc-800/80 overflow-hidden"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      {/* Dynamic ItemList Structured Data Injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(deepSearchSchema) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header and Value Proposition for AdSense and Deep Organic Discovery */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-300 text-xs font-mono mb-4 uppercase tracking-widest">
              <Globe size={13} className="text-teal-400" />
              <span>Deep Technical Search & High-Intent Index</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight leading-[1.05] text-white">
              Sovereign Knowledge Engine & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-white">
                Deep Semantic Keyword Explorer.
              </span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-4">
              Explore in-depth technical blueprints, zero-day CVE mitigations, and compliance specifications structured specifically for high-intent enterprise evaluations and automated search engine verification.
            </p>
          </div>

          {/* Quick AdSense & SEO Badge HUD */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 size={14} />
              <span>Google AdSense Verified Content Quality</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 border-l border-zinc-800 pl-3">
              Schema.org Graph Validated
            </div>
          </div>
        </div>

        {/* Deep Search Controls Bar */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/90 mb-10 space-y-5">
          
          {/* Main Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Deep Search across CVEs, Terraform modules, DPDP rules, GPU caching, CIS benchmarks, or pricing..."
              className="w-full pl-12 pr-24 py-3.5 bg-zinc-950/90 border border-zinc-700/80 rounded-2xl text-sm font-sans text-white placeholder-zinc-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-zinc-400 hover:text-white cursor-pointer"
              >
                Reset Search
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-zinc-500 mr-2 flex items-center gap-1">
              <Filter size={12} /> Topics:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-400 text-zinc-950 font-bold shadow-lg shadow-teal-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Type Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800/60 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Filter By Type:</span>
              <button
                onClick={() => setSelectedType('all')}
                className={`px-2.5 py-1 rounded-lg ${selectedType === 'all' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-200'}`}
              >
                All Content ({DEEP_SEARCH_CORPUS.length})
              </button>
              <button
                onClick={() => setSelectedType('cve-intelligence')}
                className={`px-2.5 py-1 rounded-lg ${selectedType === 'cve-intelligence' ? 'bg-zinc-800 text-rose-300' : 'hover:text-zinc-200'}`}
              >
                Zero-Days & CVEs
              </button>
              <button
                onClick={() => setSelectedType('architectural-faq')}
                className={`px-2.5 py-1 rounded-lg ${selectedType === 'architectural-faq' ? 'bg-zinc-800 text-indigo-300' : 'hover:text-zinc-200'}`}
              >
                Architectural FAQs
              </button>
              <button
                onClick={() => setSelectedType('sovereign-standard')}
                className={`px-2.5 py-1 rounded-lg ${selectedType === 'sovereign-standard' ? 'bg-zinc-800 text-teal-300' : 'hover:text-zinc-200'}`}
              >
                Sovereign Standards
              </button>
            </div>

            <span>
              Showing {filteredCorpus.length} Verified Deep Index Entities
            </span>
          </div>
        </div>

        {/* Deep Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCorpus.length === 0 ? (
            <div className="col-span-full p-12 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-center space-y-3">
              <Search className="w-8 h-8 text-zinc-600 mx-auto" />
              <h4 className="text-base font-bold text-zinc-300">No Deep Search Matches Found</h4>
              <p className="text-xs text-zinc-500 font-mono">
                Try searching for broader technical terms like "eBPF", "DPDP", "pricing", "Kubernetes", or "CIS Level 2".
              </p>
            </div>
          ) : (
            filteredCorpus.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                itemScope
                itemType="https://schema.org/TechArticle"
                className="p-6 rounded-3xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-teal-300">
                      {item.category}
                    </span>
                    <span className="text-zinc-500 font-sans">{item.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h3 
                    itemProp="headline"
                    className="text-base font-bold text-white group-hover:text-teal-200 transition-colors leading-snug mb-3"
                  >
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p 
                    itemProp="description"
                    className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3 mb-4"
                  >
                    {item.summary}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.highlights.map((hl, hIdx) => (
                      <span key={hIdx} className="px-2 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-zinc-300 border border-zinc-800/80">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Keyword Tags for SEO Depth */}
                  <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-zinc-800/60">
                    {item.keywords.slice(0, 3).map((kw, kIdx) => (
                      <button
                        key={kIdx}
                        onClick={() => setSearchQuery(kw)}
                        className="text-[9px] font-mono text-zinc-500 hover:text-teal-300 transition-colors"
                      >
                        #{kw}
                      </button>
                    ))}
                  </div>

                  {/* Action Link & Citation */}
                  <div className="flex items-center justify-between text-xs font-mono pt-2">
                    <button
                      onClick={() => setSelectedArticleId(item.id)}
                      className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 cursor-pointer"
                      onMouseEnter={() => setCursorType('pointer')}
                      onMouseLeave={() => setCursorType('default')}
                    >
                      <span>Read Deep Blueprint</span>
                      <ChevronRight size={13} />
                    </button>

                    {item.commercialPackage && (
                      <span className="text-[10px] text-zinc-500 truncate max-w-[120px]">
                        {item.commercialPackage}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* Deep Article Inspection Modal */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 relative"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/40 text-teal-400 text-xs font-mono uppercase mb-2">
                      <span>{activeArticle.category}</span>
                      {activeArticle.cvss && <span>• CVSS {activeArticle.cvss}</span>}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white">{activeArticle.title}</h3>
                  </div>

                  <button
                    onClick={() => setSelectedArticleId(null)}
                    className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Body Content */}
                <div className="space-y-4 text-sm text-zinc-300 font-sans leading-relaxed">
                  <p>{activeArticle.summary}</p>

                  {/* Highlights */}
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-teal-300 uppercase">Core Architectural Deliverables:</span>
                    <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-sans">
                      {activeArticle.highlights.map((hl, idx) => (
                        <li key={idx}>{hl}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Playbook snippet if available */}
                  {activeArticle.codeSnippet && (
                    <div className="rounded-2xl bg-black border border-zinc-800 overflow-hidden font-mono text-xs text-emerald-300 p-4 overflow-x-auto">
                      <div className="text-[10px] text-zinc-500 uppercase mb-2 flex items-center gap-1.5">
                        <Terminal size={12} className="text-teal-400" />
                        <span>Executable Mitigation Playbook</span>
                      </div>
                      <pre>{activeArticle.codeSnippet}</pre>
                    </div>
                  )}

                  {/* Keywords Tag Cloud */}
                  <div className="pt-2">
                    <span className="text-xs font-mono text-zinc-500 block mb-1.5">Semantic Search Keywords:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeArticle.keywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => handleCopyCitation(activeArticle)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 size={13} className={isCopied ? 'text-teal-400' : 'text-zinc-500'} />
                    <span>{isCopied ? 'Citation Copied' : 'Copy Citation & Meta'}</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={() => setSelectedArticleId(null)}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-teal-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Engage Principal Architect</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
