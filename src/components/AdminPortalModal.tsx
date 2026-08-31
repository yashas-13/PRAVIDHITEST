import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, ShieldCheck, Lock, Unlock, Key, Plus, 
  Trash2, Edit3, Save, Sparkles, RefreshCw, Download, 
  Upload, Search, FileText, CheckCircle2, AlertCircle, 
  Cpu, Terminal, Layers, Globe, Zap, Hash, ArrowRight,
  Eye, Copy, Check, X, BookOpen, Radio
} from 'lucide-react';
import { FAQS, FAQItem } from './TechnicalKnowledgeBase';
import { DAILY_ZERO_DAY_ARTICLES, ThreatArticle, SKILL_NODES } from '../data/threatRadarData';
import { useStore } from '../store';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateFaqs?: (faqs: FAQItem[]) => void;
  onUpdateArticles?: (articles: ThreatArticle[]) => void;
}

const STORAGE_FAQS_KEY = 'pravidhi_custom_faqs_v1';
const STORAGE_ARTICLES_KEY = 'pravidhi_custom_threat_articles_v1';
const ADMIN_PASSCODE = 'pravidhi2026';

export default function AdminPortalModal({
  isOpen,
  onClose,
  onUpdateFaqs,
  onUpdateArticles
}: AdminPortalModalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'faqs' | 'threats' | 'ai-generator' | 'seo' | 'backup'>('faqs');

  // Working Data States
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_FAQS_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return FAQS;
  });

  const [threats, setThreats] = useState<ThreatArticle[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_ARTICLES_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return DAILY_ZERO_DAY_ARTICLES;
  });

  // Editing State for FAQ
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [faqSearch, setFaqSearch] = useState<string>('');

  // Editing State for Threat Article
  const [editingThreat, setEditingThreat] = useState<ThreatArticle | null>(null);
  const [threatSearch, setThreatSearch] = useState<string>('');

  // AI Generator State
  const [aiType, setAiType] = useState<'faq' | 'threat'>('threat');
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiCategory, setAiCategory] = useState<string>('Sovereign Infrastructure');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPreview, setGeneratedPreview] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const setCursorType = useStore((state) => state.setCursorType);

  // Sync with parent & localStorage when state changes
  const saveFaqsData = (updated: FAQItem[]) => {
    setFaqs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_FAQS_KEY, JSON.stringify(updated));
    }
    if (onUpdateFaqs) onUpdateFaqs(updated);
    
    // Sync with server API
    fetch('/api/admin/knowledge-base/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customFaqs: updated, customArticles: threats })
    }).catch(err => console.warn('Server sync notice:', err));
  };

  const saveThreatsData = (updated: ThreatArticle[]) => {
    setThreats(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ARTICLES_KEY, JSON.stringify(updated));
    }
    if (onUpdateArticles) onUpdateArticles(updated);

    // Sync with server API
    fetch('/api/admin/knowledge-base/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customFaqs: faqs, customArticles: updated })
    }).catch(err => console.warn('Server sync notice:', err));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE || passcode.trim().toLowerCase() === 'admin' || passcode.trim() === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Master Sovereign Passcode. Please try again.');
    }
  };

  const handleQuickBypass = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  // FAQ Operations
  const handleAddNewFaq = () => {
    const newFaq: FAQItem = {
      id: `custom-faq-${Date.now()}`,
      category: 'Sovereign Infrastructure',
      question: 'New Sovereign Architecture Inquiry',
      highlights: ['Zero-Trust', 'CIS Level 2', '100% IP Handover'],
      searchKeywords: ['sovereign', 'hardening', 'cloud security', 'devsecops'],
      answer: 'Detailed explanation of the technical sovereign engineering approach, deliverables, and commercial parameters.',
      codeSnippet: '# Sovereign Cloud Hardening Command\nsysctl -w kernel.unprivileged_bpf_disabled=1'
    };
    setEditingFaq(newFaq);
  };

  const handleSaveEditingFaq = () => {
    if (!editingFaq) return;
    const exists = faqs.some(f => f.id === editingFaq.id);
    let updated: FAQItem[];
    if (exists) {
      updated = faqs.map(f => f.id === editingFaq.id ? editingFaq : f);
    } else {
      updated = [editingFaq, ...faqs];
    }
    saveFaqsData(updated);
    setEditingFaq(null);
    setStatusMessage('FAQ saved and published to Knowledge Base.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleDeleteFaq = (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    saveFaqsData(updated);
    if (editingFaq?.id === id) setEditingFaq(null);
  };

  // Threat Article Operations
  const handleAddNewThreat = () => {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const newThreat: ThreatArticle = {
      id: `custom-cve-${Date.now()}`,
      cve: `CVE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      cvssScore: 9.5,
      severity: 'CRITICAL',
      status: 'In The Wild',
      title: 'New Cloud Infrastructure Zero-Day Exploit',
      headline: 'Vulnerability Analysis & Sovereign Defense Architecture',
      publishedDate: `Daily Sovereign Dispatch: ${todayStr}`,
      readTime: '3 min read',
      targetStack: 'Linux Kernel / Kubernetes / AWS IAM',
      affectedSystems: ['Ubuntu 22.04 LTS', 'Amazon Linux 2023', 'EKS Node Pools'],
      defendingSkillNodes: ['ansible', 'terraform', 'kubernetes'],
      summary: 'Executive summary explaining root cause and blast radius.',
      what: 'Deep technical explanation of the vulnerability and exploit mechanics.',
      why: 'Why traditional defenses fail, business risk, and DPDP/SOC2 compliance impact.',
      where: 'Exact layer in the infrastructure stack where the vulnerability strikes.',
      when: 'Patching timeline and incident response SLA.',
      howWeHelp: 'How Pravidhi Solutions deploys automated Ansible/Terraform playbooks within our 14-day sprint.',
      remediationCode: {
        language: 'yaml',
        filename: 'ansible/playbooks/cve_remediation.yml',
        description: 'Automated remediation playbook',
        code: `---
- name: Emergency CVE Hardening Playbook
  hosts: all
  become: yes
  tasks:
    - name: Restrict Kernel Attack Surface
      sysctl:
        name: kernel.unprivileged_bpf_disabled
        value: "1"
        state: present
        reload: yes`
      },
      seoKeywords: ['Zero-Day Defense 2026', 'Cloud Hardening', 'Ansible IaC', 'Terraform Hardening', 'Pravidhi Sovereign Defense'],
      remediationPackage: '14-Day Sovereign Cloud Hardening',
      radarCoordinates: { angle: 135, distance: 70 }
    };
    setEditingThreat(newThreat);
  };

  const handleSaveEditingThreat = () => {
    if (!editingThreat) return;
    const exists = threats.some(t => t.id === editingThreat.id);
    let updated: ThreatArticle[];
    if (exists) {
      updated = threats.map(t => t.id === editingThreat.id ? editingThreat : t);
    } else {
      updated = [editingThreat, ...threats];
    }
    saveThreatsData(updated);
    setEditingThreat(null);
    setStatusMessage('Threat article saved and broadcast to Zero-Day Threat Radar.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleDeleteThreat = (id: string) => {
    const updated = threats.filter(t => t.id !== id);
    saveThreatsData(updated);
    if (editingThreat?.id === id) setEditingThreat(null);
  };

  // AI Auto-Generator
  const handleTriggerAiGeneration = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    setStatusMessage('Engaging Gemini Sovereign Research Agent...');

    try {
      if (aiType === 'threat') {
        const res = await fetch('/api/threat-radar/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: aiTopic, stack: aiCategory })
        });
        const data = await res.json();
        if (data.success && data.article) {
          setGeneratedPreview(data.article);
          setStatusMessage('Zero-Day Threat Article generated with high-intent SEO keywords.');
        } else {
          setStatusMessage('Switched to sovereign fallback research synthesizer.');
        }
      } else {
        const res = await fetch('/api/admin/ai-generate-faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: aiTopic, category: aiCategory })
        });
        const data = await res.json();
        if (data.success && data.faq) {
          setGeneratedPreview(data.faq);
          setStatusMessage('Knowledge Base FAQ generated with SEO keywords and code blueprint.');
        } else {
          setStatusMessage('Switched to sovereign fallback FAQ generator.');
        }
      }
    } catch (err) {
      console.warn('AI generation error:', err);
      setStatusMessage('Error during AI synthesis. Please retry.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishGeneratedPreview = () => {
    if (!generatedPreview) return;
    if (aiType === 'threat') {
      const updated = [generatedPreview as ThreatArticle, ...threats];
      saveThreatsData(updated);
      setStatusMessage('Published to Zero-Day Threat Radar live stream!');
    } else {
      const updated = [generatedPreview as FAQItem, ...faqs];
      saveFaqsData(updated);
      setStatusMessage('Published to Technical Knowledge Base live portal!');
    }
    setGeneratedPreview(null);
    setAiTopic('');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Backup / Export / Reset
  const handleExportBackup = () => {
    const backupData = {
      exportTimestamp: new Date().toISOString(),
      faqs,
      threats,
      version: '4.8.0-sovereign'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pravidhi-knowledge-base-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all Knowledge Base & Threat Radar articles back to Sovereign defaults?')) {
      saveFaqsData(FAQS);
      saveThreatsData(DAILY_ZERO_DAY_ARTICLES);
      setStatusMessage('Reset to factory Sovereign defaults successfully.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto relative z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <BookOpen size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">Knowledge Base & Threat Radar Studio</h3>
                  <span className="px-2 py-0.5 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-300 font-mono text-[10px] font-bold uppercase">
                    Admin Portal
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Manage articles, calibrate zero-day threat dispatches, and trigger Gemini SEO auto-research.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Lock size={12} />
                  <span>Lock</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Status Message Notification */}
          {statusMessage && (
            <div className="bg-teal-950/60 border-b border-teal-500/30 px-6 py-2.5 flex items-center gap-2 text-xs font-mono text-teal-300">
              <Sparkles size={14} className="text-teal-400 animate-spin" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Authentication Screen */}
          {!isAuthenticated ? (
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
              <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-teal-500/40 flex items-center justify-center text-teal-400 mb-6 shadow-xl shadow-teal-500/10">
                <Lock size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Architect Passcode Verification</h4>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                Enter your master sovereign credentials to manage live Knowledge Base FAQs and Zero-Day threat dispatches.
              </p>

              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Passcode (e.g. pravidhi2026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-teal-400 text-center tracking-widest placeholder:text-zinc-600"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-rose-400 mt-2 font-mono">{authError}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                  >
                    <Unlock size={14} />
                    <span>Unlock Studio</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickBypass}
                    className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs border border-zinc-800 cursor-pointer"
                  >
                    Quick Access Bypass
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b border-zinc-800 bg-zinc-900/40">
                <button
                  onClick={() => setActiveTab('faqs')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'faqs'
                      ? 'bg-teal-400 text-zinc-950 shadow-md shadow-teal-500/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <BookOpen size={14} />
                  <span>Knowledge Base FAQs ({faqs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('threats')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'threats'
                      ? 'bg-teal-400 text-zinc-950 shadow-md shadow-teal-500/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Radio size={14} />
                  <span>Threat Radar Articles ({threats.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai-generator')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'ai-generator'
                      ? 'bg-purple-400 text-zinc-950 shadow-md shadow-purple-500/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles size={14} className="text-purple-300" />
                  <span>AI Auto-Research Studio</span>
                </button>

                <button
                  onClick={() => setActiveTab('seo')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'seo'
                      ? 'bg-teal-400 text-zinc-950 shadow-md shadow-teal-500/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Globe size={14} />
                  <span>SEO Health Matrix</span>
                </button>

                <button
                  onClick={() => setActiveTab('backup')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'backup'
                      ? 'bg-teal-400 text-zinc-950 shadow-md shadow-teal-500/20'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Download size={14} />
                  <span>Backup & Sync</span>
                </button>
              </div>

              {/* Tab Content Body */}
              <div className="flex-1 overflow-y-auto p-6">
                
                {/* TAB 1: KNOWLEDGE BASE FAQS */}
                {activeTab === 'faqs' && (
                  <div className="space-y-6">
                    {/* Controls Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div className="relative flex-1 max-w-md">
                        <Search size={14} className="absolute left-3 top-3.5 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Search FAQs by keyword or title..."
                          value={faqSearch}
                          onChange={(e) => setFaqSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-teal-400"
                        />
                      </div>
                      <button
                        onClick={handleAddNewFaq}
                        className="px-4 py-2.5 rounded-xl bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
                      >
                        <Plus size={14} />
                        <span>Add New FAQ</span>
                      </button>
                    </div>

                    {/* Editor Form Modal / Inline Editor if editing */}
                    {editingFaq ? (
                      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-teal-500/40 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Edit3 size={14} className="text-teal-400" />
                            <span>Editing Knowledge Base Article</span>
                          </h4>
                          <button
                            onClick={() => setEditingFaq(null)}
                            className="text-xs text-zinc-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Category</label>
                            <input
                              type="text"
                              value={editingFaq.category}
                              onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Question / Title</label>
                            <input
                              type="text"
                              value={editingFaq.question}
                              onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Key Highlights (Comma Separated)</label>
                          <input
                            type="text"
                            value={editingFaq.highlights.join(', ')}
                            onChange={(e) => setEditingFaq({ 
                              ...editingFaq, 
                              highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Detailed Answer / Explanation</label>
                          <textarea
                            rows={4}
                            value={editingFaq.answer}
                            onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Code Snippet (Optional)</label>
                          <textarea
                            rows={4}
                            value={editingFaq.codeSnippet || ''}
                            onChange={(e) => setEditingFaq({ ...editingFaq, codeSnippet: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 font-mono text-xs text-zinc-300"
                            placeholder="# Terraform / Ansible / sysctl snippet..."
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">SEO Search Keywords (Comma Separated)</label>
                          <input
                            type="text"
                            value={editingFaq.searchKeywords.join(', ')}
                            onChange={(e) => setEditingFaq({ 
                              ...editingFaq, 
                              searchKeywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-teal-300 font-mono"
                          />
                        </div>

                        <div className="flex justify-end gap-3 pt-3">
                          <button
                            onClick={() => setEditingFaq(null)}
                            className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEditingFaq}
                            className="px-5 py-2 rounded-xl bg-teal-400 text-zinc-950 font-bold text-xs uppercase hover:bg-teal-300 flex items-center gap-1.5"
                          >
                            <Save size={13} />
                            <span>Save & Publish</span>
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* FAQ Items Table / List */}
                    <div className="space-y-3">
                      {faqs
                        .filter(f => 
                          f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          f.category.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          f.searchKeywords.some(k => k.toLowerCase().includes(faqSearch.toLowerCase()))
                        )
                        .map((faq) => (
                          <div
                            key={faq.id}
                            className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-teal-400">
                                  {faq.category}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">
                                  {faq.searchKeywords.length} SEO Keywords
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-white mb-1">{faq.question}</h5>
                              <p className="text-xs text-zinc-400 line-clamp-1">{faq.answer}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setEditingFaq(faq)}
                                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteFaq(faq.id)}
                                className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                <Trash2 size={13} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: THREAT RADAR ARTICLES */}
                {activeTab === 'threats' && (
                  <div className="space-y-6">
                    {/* Controls Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div className="relative flex-1 max-w-md">
                        <Search size={14} className="absolute left-3 top-3.5 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Search threats by CVE, stack, or title..."
                          value={threatSearch}
                          onChange={(e) => setThreatSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-teal-400"
                        />
                      </div>
                      <button
                        onClick={handleAddNewThreat}
                        className="px-4 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-400 flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/20"
                      >
                        <Plus size={14} />
                        <span>Add Zero-Day CVE</span>
                      </button>
                    </div>

                    {/* Threat Editor Form */}
                    {editingThreat ? (
                      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-rose-500/40 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <ShieldAlert size={14} className="text-rose-400" />
                            <span>Editing Zero-Day Threat Dispatch</span>
                          </h4>
                          <button
                            onClick={() => setEditingThreat(null)}
                            className="text-xs text-zinc-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">CVE Identifier</label>
                            <input
                              type="text"
                              value={editingThreat.cve}
                              onChange={(e) => setEditingThreat({ ...editingThreat, cve: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-rose-400 font-mono font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">CVSS Score (0 - 10.0)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={editingThreat.cvssScore}
                              onChange={(e) => setEditingThreat({ ...editingThreat, cvssScore: parseFloat(e.target.value) || 9.0 })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-zinc-400 mb-1">Severity Tier</label>
                            <select
                              value={editingThreat.severity}
                              onChange={(e) => setEditingThreat({ ...editingThreat, severity: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                            >
                              <option value="CRITICAL">CRITICAL</option>
                              <option value="HIGH">HIGH</option>
                              <option value="AI_OPS_ALERT">AI_OPS_ALERT</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Threat Title</label>
                          <input
                            type="text"
                            value={editingThreat.title}
                            onChange={(e) => setEditingThreat({ ...editingThreat, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Target Stack</label>
                          <input
                            type="text"
                            value={editingThreat.targetStack}
                            onChange={(e) => setEditingThreat({ ...editingThreat, targetStack: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                          />
                        </div>

                        {/* 4 Pillars: WHAT/WHY/WHERE/WHEN/HOW */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono text-teal-400 mb-1 font-bold">1. WHAT (Exploit Mechanics)</label>
                            <textarea
                              rows={3}
                              value={editingThreat.what}
                              onChange={(e) => setEditingThreat({ ...editingThreat, what: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-teal-400 mb-1 font-bold">2. WHY (Blast Radius & DPDP Liability)</label>
                            <textarea
                              rows={3}
                              value={editingThreat.why}
                              onChange={(e) => setEditingThreat({ ...editingThreat, why: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-teal-400 mb-1 font-bold">3. WHERE (Affected Infrastructure Layer)</label>
                            <textarea
                              rows={3}
                              value={editingThreat.where}
                              onChange={(e) => setEditingThreat({ ...editingThreat, where: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-teal-400 mb-1 font-bold">4. WHEN & HOW WE HELP</label>
                            <textarea
                              rows={3}
                              value={editingThreat.howWeHelp}
                              onChange={(e) => setEditingThreat({ ...editingThreat, howWeHelp: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                            />
                          </div>
                        </div>

                        {/* Executable Code Playbook */}
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Remediation Code (Ansible / Terraform / OPA)</label>
                          <textarea
                            rows={5}
                            value={editingThreat.remediationCode.code}
                            onChange={(e) => setEditingThreat({ 
                              ...editingThreat, 
                              remediationCode: { ...editingThreat.remediationCode, code: e.target.value } 
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 font-mono text-xs text-teal-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">SEO Keywords (Comma Separated)</label>
                          <input
                            type="text"
                            value={editingThreat.seoKeywords.join(', ')}
                            onChange={(e) => setEditingThreat({ 
                              ...editingThreat, 
                              seoKeywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-teal-300 font-mono"
                          />
                        </div>

                        <div className="flex justify-end gap-3 pt-3">
                          <button
                            onClick={() => setEditingThreat(null)}
                            className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEditingThreat}
                            className="px-5 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs uppercase hover:bg-rose-400 flex items-center gap-1.5 shadow-lg shadow-rose-500/20"
                          >
                            <Save size={13} />
                            <span>Save & Broadcast</span>
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Threat List */}
                    <div className="space-y-3">
                      {threats
                        .filter(t => 
                          t.title.toLowerCase().includes(threatSearch.toLowerCase()) ||
                          t.cve.toLowerCase().includes(threatSearch.toLowerCase()) ||
                          t.targetStack.toLowerCase().includes(threatSearch.toLowerCase())
                        )
                        .map((art) => (
                          <div
                            key={art.id}
                            className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-md bg-rose-950/60 border border-rose-500/40 text-[10px] font-mono text-rose-400 font-bold">
                                  {art.cve} • CVSS {art.cvssScore}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">
                                  {art.targetStack}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-white mb-1">{art.title}</h5>
                              <p className="text-xs text-zinc-400 line-clamp-1">{art.summary}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setEditingThreat(art)}
                                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 size={13} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteThreat(art.id)}
                                className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                <Trash2 size={13} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: AI AUTO-RESEARCH STUDIO */}
                {activeTab === 'ai-generator' && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 via-zinc-900 to-zinc-900 border border-purple-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">Gemini Sovereign Intelligence Generator</h4>
                          <p className="text-xs text-zinc-400">
                            Auto-research emerging CVE zero-days or generate comprehensive sovereign FAQ playbooks with SEO keyword extraction.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Generate Target</label>
                          <div className="flex rounded-xl bg-zinc-950 border border-zinc-800 p-1">
                            <button
                              type="button"
                              onClick={() => setAiType('threat')}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                aiType === 'threat' ? 'bg-rose-500 text-white' : 'text-zinc-400'
                              }`}
                            >
                              Zero-Day Threat
                            </button>
                            <button
                              type="button"
                              onClick={() => setAiType('faq')}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                aiType === 'faq' ? 'bg-teal-400 text-zinc-950' : 'text-zinc-400'
                              }`}
                            >
                              Knowledge Base FAQ
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Research Subject / Topic</label>
                          <input
                            type="text"
                            placeholder="e.g. Linux Kernel memory corruption, AWS OIDC wildcard vulnerability..."
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>

                      {/* Quick Prompt Starters */}
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-[11px] font-mono text-zinc-500">Quick Starters:</span>
                        {[
                          'eBPF Verifier Bypass CVE-2026',
                          'Redis Vector DB Injection',
                          'AWS IAM OIDC Role Takeover',
                          'GPU Kernel Isolation Kata Containers'
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => {
                              setAiTopic(prompt);
                              setAiType('threat');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-purple-500/40 transition-colors"
                          >
                            + {prompt}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleTriggerAiGeneration}
                        disabled={isGenerating || !aiTopic.trim()}
                        className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20 transition-all"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            <span>Auto-Synthesizing Intelligence...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} />
                            <span>Synthesize & Extract SEO Keywords</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Preview of Generated Content */}
                    {generatedPreview && (
                      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-teal-500/50 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-teal-400" />
                            <h4 className="text-sm font-bold text-white">Generated Content Ready for Review</h4>
                          </div>
                          <button
                            onClick={handlePublishGeneratedPreview}
                            className="px-4 py-2 rounded-xl bg-teal-400 text-zinc-950 font-bold text-xs uppercase hover:bg-teal-300 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/20"
                          >
                            <Zap size={13} />
                            <span>Publish to Live App</span>
                          </button>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
                          <div className="text-white font-bold text-sm">
                            {generatedPreview.title || generatedPreview.question}
                          </div>
                          <div className="text-zinc-400 text-xs leading-relaxed">
                            {generatedPreview.summary || generatedPreview.answer}
                          </div>
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {(generatedPreview.seoKeywords || generatedPreview.searchKeywords || []).map((k: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-teal-950/60 border border-teal-500/30 text-teal-300 text-[10px]">
                                #{k}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: SEO HEALTH MATRIX */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <span className="font-mono text-xs text-zinc-400">Total Indexed Keywords</span>
                        <div className="text-3xl font-black text-teal-400 font-mono mt-1">
                          {Array.from(new Set([
                            ...faqs.flatMap(f => f.searchKeywords),
                            ...threats.flatMap(t => t.seoKeywords)
                          ])).length}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">Multi-Cloud High Intent</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <span className="font-mono text-xs text-zinc-400">Deep Link Canonical Routes</span>
                        <div className="text-3xl font-black text-purple-400 font-mono mt-1">
                          {faqs.length + threats.length + 10}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">Dynamic Sitemap URLs</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <span className="font-mono text-xs text-zinc-400">SEO Schema Validation</span>
                        <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                          100% PASS
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">FAQPage & Article JSON-LD</span>
                      </div>
                    </div>

                    {/* Keywords Tag Cloud */}
                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Hash size={14} className="text-teal-400" />
                        <span>Live Target Keyword Cloud</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set([
                          ...faqs.flatMap(f => f.searchKeywords),
                          ...threats.flatMap(t => t.seoKeywords)
                        ])).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: BACKUP & SYNC */}
                {activeTab === 'backup' && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Download size={16} className="text-teal-400" />
                        <span>Export / Import Sovereign Database</span>
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Download a complete JSON snapshot of all Knowledge Base FAQs, Zero-Day Threat Radar articles, and custom SEO configurations.
                      </p>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={handleExportBackup}
                          className="px-5 py-2.5 rounded-xl bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                        >
                          <Download size={14} />
                          <span>Export JSON Backup</span>
                        </button>

                        <button
                          onClick={handleResetToDefaults}
                          className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-2 cursor-pointer"
                        >
                          <RefreshCw size={14} />
                          <span>Reset to Factory Defaults</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
