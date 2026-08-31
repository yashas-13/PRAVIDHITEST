import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldCheck, FileText, Lock, Cookie, AlertCircle, 
  Building2, Mail, MapPin, Scale, CheckCircle2, ChevronRight,
  ExternalLink, ArrowRight
} from 'lucide-react';
import { useStore } from '../store';

export type LegalTab = 'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'about' | 'grievance';

interface LegalCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export default function LegalCenterModal({ isOpen, onClose, initialTab = 'privacy' }: LegalCenterModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const setCursorType = useStore((state) => state.setCursorType);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: LegalTab; label: string; icon: any }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Service', icon: Scale },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
    { id: 'disclaimer', label: 'Disclaimer', icon: AlertCircle },
    { id: 'about', label: 'About & Publisher', icon: Building2 },
    { id: 'grievance', label: 'Grievance & Contact', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl h-[88vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 z-10"
      >
        {/* Modal Header */}
        <div className="h-16 px-6 md:px-8 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Lock size={16} />
            </div>
            <div>
              <div className="text-sm font-bold font-sans tracking-tight text-white flex items-center gap-2">
                <span>Pravidhi Solutions LLP</span>
                <span className="text-[10px] font-mono uppercase bg-zinc-800 text-teal-300 px-2 py-0.5 rounded border border-zinc-700">
                  Legal & Policy Center
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">Effective Date: August 20, 2026 • Verified Publisher</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation & Content Split */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar Tabs */}
          <div className="w-full md:w-64 bg-zinc-900/40 border-b md:border-b-0 md:border-r border-zinc-800/80 p-3 md:p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-teal-400 text-zinc-950 font-bold shadow-md shadow-teal-500/20' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight size={13} className={`hidden md:block ${isActive ? 'text-zinc-950' : 'text-zinc-600'}`} />
                </button>
              );
            })}

            <div className="hidden md:block mt-auto pt-4 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 p-2 space-y-1">
              <div>Pravidhi Solutions LLP</div>
              <div>CIN/Reg: Available on Request</div>
              <div className="text-teal-400">SOC2 & DPDP Compliant</div>
            </div>
          </div>

          {/* Right Scrollable Content Pane */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 text-zinc-300 text-sm leading-relaxed font-sans">
            
            {/* 1. PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Privacy Policy</h2>
                  <p className="text-xs font-mono text-teal-400">Last Revised: August 20, 2026 | Full Google AdSense & DPDP Compliance</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                  <span className="font-bold text-white uppercase tracking-wider block font-mono">Executive Summary</span>
                  <p>
                    Pravidhi Solutions LLP ("we", "us", or "our") respects your privacy and is fully committed to protecting personal and enterprise data. This Privacy Policy details how we collect, store, safeguard, and disclose information when you visit our website (<strong>https://pravidhisolutions.in</strong>) or engage our sovereign-grade DevSecOps, multi-cloud hardening, and AI infrastructure consulting services.
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">1. Information We Collect</h3>
                  <p>We collect information in the following ways:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                    <li><strong>Voluntary Contact Information:</strong> Name, work email address, company name, infrastructure cloud environment, and technical project briefs submitted via our Qualification Form.</li>
                    <li><strong>Automated Telemetry & Log Files:</strong> Standard server access logs including IP addresses, browser types, Internet Service Provider (ISP), referring/exit pages, operating systems, date/time stamps, and clickstream metrics.</li>
                    <li><strong>Cookies & Tracking Identifiers:</strong> Cookies used to preserve user preferences, session integrity, and deliver relevant contextual insights.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">2. Google AdSense & Third-Party Advertising Vendors</h3>
                  <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 text-zinc-300 space-y-2 text-xs">
                    <p className="font-bold text-teal-300">Mandatory Google Advertising Disclosures:</p>
                    <p>
                      Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites on the Internet.
                    </p>
                    <p>
                      Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
                    </p>
                    <p>
                      Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-teal-400 underline font-mono">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-teal-400 underline font-mono">www.aboutads.info</a>.
                    </p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">3. How We Use Collected Information</h3>
                  <p>We process information exclusively for lawful business purposes:</p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                    <li>To initiate Mutual Non-Disclosure Agreements (NDAs) and deliver tailored technical architecture scopes.</li>
                    <li>To operate, maintain, and optimize site performance and security safeguards.</li>
                    <li>To prevent fraudulent access, unauthorized penetration, and DDoS attacks.</li>
                    <li>To comply with regulatory and legal audit obligations under Indian and global frameworks.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">4. Compliance with DPDP Act, GDPR & CCPA</h3>
                  <p>
                    Under the <strong>Digital Personal Data Protection (DPDP) Act, 2023 (India)</strong>, the <strong>General Data Protection Regulation (GDPR, EU)</strong>, and the <strong>California Consumer Privacy Act (CCPA, USA)</strong>, you are entitled to the following rights:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
                    <li><strong>Right to Access & Rectification:</strong> Request copies of your personal data held by us and rectify inaccurate details.</li>
                    <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your intake records, subject to statutory retention limits.</li>
                    <li><strong>Right to Withdraw Consent:</strong> Revoke consent for processing or marketing communications at any time.</li>
                    <li><strong>Non-Discrimination:</strong> Exercising your privacy rights will never result in degraded service quality or altered pricing terms.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">5. Sovereign Data Security & Zero-Trust Architecture</h3>
                  <p>
                    We apply military-grade AES-256 encryption at rest and TLS 1.3 in transit. Client codebase architectures, credentials, and configuration playbooks are strictly air-gapped and never stored in multi-tenant environments.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">6. Children's Information (COPPA)</h3>
                  <p>
                    Pravidhi Solutions does not knowingly collect any Personal Identifiable Information from children under the age of 18. If you believe your child provided information on our website, contact our Data Protection Officer immediately for swift deletion.
                  </p>
                </section>
              </div>
            )}

            {/* 2. TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Terms of Service</h2>
                  <p className="text-xs font-mono text-teal-400">Effective Date: August 20, 2026 | Legally Binding Commercial Agreement</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                  <span className="font-bold text-white uppercase tracking-wider block font-mono">Overview & Scope</span>
                  <p>
                    These Terms of Service govern your access to and use of the website, products, and consulting engagements provided by Pravidhi Solutions LLP. By accessing this website or executing an engineering sprint with us, you agree to be bound by these Terms.
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">1. Sovereign Sprint Engagements & Pricing</h3>
                  <p>
                    Our fixed-price productised solutions (such as the ₹5,00,000 14-Day Cloud Security Hardening and ₹2,50,000 AI Ops Audit) are executed pursuant to written Statements of Work (SOW) and Mutual NDAs. Milestone criteria, deliverables, and signoff conditions are strictly defined prior to sprint kickoff.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">2. Intellectual Property (100% Client Ownership)</h3>
                  <p>
                    Upon receipt of full payment for an engagement, all custom infrastructure code, Terraform configurations, Ansible playbooks, and architectural documentation produced exclusively for the client shall become the sole, unencumbered Intellectual Property (IP) of the client. Pravidhi retains no residual proprietary claim over client-specific scripts.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">3. Non-Disclosure & Strict Confidentiality</h3>
                  <p>
                    Both parties agree that all confidential architecture diagrams, credential vaults, server topology maps, and source codes exchanged during any evaluation or active sprint remain strictly confidential under a binding Mutual NDA.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">4. Limitation of Liability</h3>
                  <p>
                    To the maximum extent permitted by applicable law, Pravidhi Solutions LLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of this site or any technical implementation beyond the total fees paid under the applicable SOW.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">5. Governing Law & Dispute Resolution</h3>
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of the Republic of India. The courts located in <strong>Bengaluru, Karnataka, India</strong> shall have exclusive jurisdiction over any dispute arising under this agreement.
                  </p>
                </section>
              </div>
            )}

            {/* 3. COOKIE POLICY */}
            {activeTab === 'cookies' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Cookie Policy</h2>
                  <p className="text-xs font-mono text-teal-400">Transparent Tracking & Consent Standards</p>
                </div>

                <p>
                  This Cookie Policy explains how Pravidhi Solutions uses cookies and similar technologies (web beacons, local storage) to recognize you when you visit our website.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <CheckCircle2 size={16} className="text-teal-400" />
                      <span>Essential / Functional Cookies (Required)</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies are strictly necessary to provide you with core web services, security authentication, and session continuity. They cannot be disabled in our systems.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <CheckCircle2 size={16} className="text-sky-400" />
                      <span>Analytical & Performance Cookies (Optional)</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies allow us to count visits and traffic sources to measure and improve our site's loading velocity and interactive telemetry responsiveness.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <CheckCircle2 size={16} className="text-amber-400" />
                      <span>Advertising & Contextual Cookies (Google AdSense)</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies may be set through our site by advertising partners such as Google AdSense to build a profile of your interests and show you relevant technical advertisements on other sites.
                    </p>
                  </div>
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">How to Control Cookies</h3>
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your preferences through our Cookie Consent Banner or by adjusting your browser settings (Chrome, Firefox, Safari, Edge).
                  </p>
                </section>
              </div>
            )}

            {/* 4. DISCLAIMER */}
            {activeTab === 'disclaimer' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Disclaimer & Disclosure</h2>
                  <p className="text-xs font-mono text-teal-400">Professional Engineering & Third-Party Trademark Notice</p>
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">1. Professional Technical Advice Disclaimer</h3>
                  <p>
                    The information contained on this website is for general technical informational and educational purposes only. While our principal architect reviews all technical whitepapers and configuration references for accuracy, we make no express warranties regarding suitability for specific unregulated production clusters without a comprehensive scoping audit.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">2. Third-Party Trademarks & Brands</h3>
                  <p>
                    AWS, Amazon Web Services, Microsoft Azure, Google Cloud Platform (GCP), Terraform, Ansible, Docker, Kubernetes, Linux, and other associated brand names or logos referenced on this website are registered trademarks of their respective owners. Their mention does not imply any direct corporate affiliation, endorsement, or sponsorship.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">3. Security Warranties</h3>
                  <p>
                    Cybersecurity and DevSecOps hardening significantly reduce attack surfaces and enforce least-privilege zero-trust controls; however, no software configuration can guarantee absolute immunity against zero-day exploits or state-sponsored advanced persistent threats (APTs).
                  </p>
                </section>
              </div>
            )}

            {/* 5. ABOUT & PUBLISHER */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">About & Publisher Identity</h2>
                  <p className="text-xs font-mono text-teal-400">Verified Technical Entity Profile</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Legal Entity</span>
                    <div className="text-sm font-bold text-white">Pravidhi Solutions LLP</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Headquarters</span>
                    <div className="text-sm font-bold text-white">Bengaluru, Karnataka, India</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Principal Leadership</span>
                    <div className="text-sm font-bold text-white">10-Year Veteran Principal Architect</div>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Focus Domains</span>
                    <div className="text-sm font-bold text-teal-300">DevSecOps, Multi-Cloud, LLM Security</div>
                  </div>
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-white">Our Mission & Editorial Standards</h3>
                  <p>
                    Pravidhi Solutions LLP was founded to bridge the critical gap between hyper-growth cloud adoption and sovereign zero-trust security. We reject opaque, open-ended agency billing in favor of crystal-clear, flat-rate 14-day outcome sprints with 100% intellectual property handover.
                  </p>
                  <p>
                    All architectural whitepapers and infrastructure guides published on this platform undergo rigorous peer review and benchmark testing against CIS Level 2, NIST 800-53, and ISO 27001 standards.
                  </p>
                </section>
              </div>
            )}

            {/* 6. GRIEVANCE & CONTACT */}
            {activeTab === 'grievance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Grievance Redressal & Contact Us</h2>
                  <p className="text-xs font-mono text-teal-400">Mandated Under IT Rules & DPDP Act 2023</p>
                </div>

                <p>
                  In accordance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, the name and contact details of our designated Grievance and Data Protection Officer are provided below:
                </p>

                <div className="p-6 rounded-2xl bg-zinc-900/80 border border-teal-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-white">Grievance & Legal Officer</div>
                      <div className="text-xs text-zinc-400 font-mono">Pravidhi Solutions LLP</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono border-t border-zinc-800 pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-zinc-800/60">
                      <span className="text-zinc-400">Official Legal Email:</span>
                      <a href="mailto:legal@pravidhisolutions.in" className="text-teal-400 font-bold hover:underline">legal@pravidhisolutions.in</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-zinc-800/60">
                      <span className="text-zinc-400">General Inquiries:</span>
                      <a href="mailto:contact@pravidhisolutions.in" className="text-zinc-200 hover:underline">contact@pravidhisolutions.in</a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-zinc-800/60">
                      <span className="text-zinc-400">Registered Office:</span>
                      <span className="text-zinc-200">Bangalore, Karnataka, India - 560001</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between py-1">
                      <span className="text-zinc-400">Resolution SLA:</span>
                      <span className="text-emerald-400 font-bold">Within 24 to 48 Business Hours</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="h-14 px-6 md:px-8 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between shrink-0 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AdSense & Legal Compliance Verified</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
          >
            Acknowledge & Close
          </button>
        </div>

      </motion.div>
    </div>
  );
}
