import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import GlitchEntrance from './GlitchEntrance';
import { 
  Terminal, Sparkles, Zap, ArrowRight, CheckCircle, 
  Coins, MessageSquare, Shield, Clock, Languages, Database, FileSpreadsheet
} from 'lucide-react';
import { useStore } from '../store';

// Define the structural type of our Indian AI Employees
interface AIEmployee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  specialization: string;
  ctcComparison: {
    traditional: string;
    ai: string;
    savings: string;
  };
  tools: string[];
  skills: string[];
  languages: string[];
  useCases: {
    label: string;
    description: string;
    steps: {
      type: 'info' | 'success' | 'warn' | 'database';
      text: string;
      delay: number;
    }[];
    resultHeader: string;
    resultMarkdown: string;
  }[];
}

const indianAiEmployees: AIEmployee[] = [
  {
    id: "priya",
    name: "Priya.ai",
    avatar: "👩‍💻",
    role: "Taxation, GST & Audit Coordinator",
    specialization: "Automates Indian compliance, tax mapping, and corporate accounting",
    ctcComparison: {
      traditional: "₹12-18 Lakhs CTC / year",
      ai: "₹45,000 / month flat",
      savings: "Save up to 75% overheads"
    },
    tools: ["GSTN Portal", "Tally ERP 9 / Prime", "Zoho Books", "Excel / Sheets", "Razorpay Route"],
    skills: ["GSTR-2B & Purchase Ledger Reconcile", "GST SCN (Show Cause Notice) Response Drafting", "Unclaimed Input Tax Credit (ITC) Discovery", "E-Invoicing and E-Way Bill Generation"],
    languages: ["English", "Hindi"],
    useCases: [
      {
        label: "GSTR-2B Audit Reconciliation",
        description: "Scans purchase ledger against government GSTR-2B JSON imports to pinpoint missed ITC.",
        steps: [
          { type: "info", text: "Initializing GSTR-2B Audit engine for fiscal quarter Q3...", delay: 400 },
          { type: "database", text: "Importing Purchase Register (3,420 entries) from Tally.ERP Prime API...", delay: 800 },
          { type: "info", text: "Fetching live GSTR-2B returns from GSTN Portal API...", delay: 1300 },
          { type: "warn", text: "Discrepancy identified: PAN matching fault in Row #412 (Vendor: Raj Enterprises).", delay: 1800 },
          { type: "database", text: "Running fuzzy-similarity alignment algorithms on GSTINs...", delay: 2200 },
          { type: "success", text: "Successfully matched 99.4% mismatch records. Resolved ₹1,42,000 of previously missing Input Tax Credit (ITC)!", delay: 2800 },
        ],
        resultHeader: "ITC Discrepancy Reconciliation Summary",
        resultMarkdown: "Reconciliation Complete.\n\n- **Matched Records:** 3,412 / 3,420\n- **Unclaimed ITC Recovered:** ₹1,42,390/- \n- **Tally Sync Status:** Updated auto-ledger adjustment keys.\n- **Action Recommended:** Approved ledger offsets filed on GSTR-3B."
      },
      {
        label: "GST Show Cause Notice Draft",
        description: "Generates custom legal-grade responses to notices under Section 73/74 with appropriate case references.",
        steps: [
          { type: "info", text: "Analyzing scanned PDF of GST SCN ref ref: SC/2026/0394...", delay: 500 },
          { type: "warn", text: "Detected allegation: Alleged short payment of tax on outward supply by ₹3,50,000.", delay: 1000 },
          { type: "database", text: "Retrieving corresponding GSTR-1, GSTR-9, & e-Invoice logs...", delay: 1600 },
          { type: "info", text: "Formulating legal reply citing Section 73 CGST Act (no intent of fraud/misstatement)...", delay: 2100 },
          { type: "success", text: "Generated 4-page formal reply draft with supporting annexures & credit register proofs.", delay: 2700 }
        ],
        resultHeader: "SCN Reply Draft Ready (Section 73)",
        resultMarkdown: "Response successfully compiled.\n\n- **Recipient:** Deputy Commissioner of State Tax, Audit Circle 4, Bangalore.\n- **Legal Defence Principle:** Verified supply matching at checkout with physical e-way bill records.\n- **Status:** High accuracy legal prose drafted, ready for CA sign-off."
      }
    ]
  },
  {
    id: "karan",
    name: "Karan.ai",
    avatar: "💼",
    role: "Bilingual Inside Sales & WhatsApp SDR",
    specialization: "Converts leads on WhatsApp, emails, and Indiamart portals 24/7",
    ctcComparison: {
      traditional: "₹7-12 Lakhs CTC + 15% incentive",
      ai: "₹35,000 / month flat",
      savings: "Save 70% cost, 10x speed"
    },
    tools: ["WhatsApp Business API", "IndiaMart", "HubSpot CRM", "Gmail / SMTP", "Razorpay Links"],
    skills: ["B2B RFQ instant reply", "Multilingual qualification support", "Fuzzy search pricing lookup", "Automated Razorpay invoice dispatch"],
    languages: ["English/Angreji", "Hindi/Hinglish", "Tamil"],
    useCases: [
      {
        label: "Indiamart RFQ Auto-Response",
        description: "Drafts tailored quote replies immediately to incoming enquiries, bypassing manual lead delay.",
        steps: [
          { type: "info", text: "Received real-time IndiaMart Lead Alert: 'Enquiry for 500 units of Polypropylene Valves'...", delay: 300 },
          { type: "database", text: "Checking dynamic stock pricing database in CRM...", delay: 700 },
          { type: "info", text: "Translating technical catalogue to Hinglish for local buyer preference...", delay: 1200 },
          { type: "info", text: "Auto-generating bulk volume discount (12% off standard MRP)...", delay: 1700 },
          { type: "success", text: "Drafted custom WhatsApp response & IndiaMart portal RFQ response in Hindi & English, attach PDF proposal.", delay: 2200 }
        ],
        resultHeader: "Indiamart Lead response payload",
        resultMarkdown: "Indiamart RFQ qualified.\n\n- **Client:** Vardhaman Operations (Pvt. Ltd.), Ahmedabad.\n- **Quote Value:** ₹1,64,000 (Freight delivery to GIDC incl.)\n- **WhatsApp Ping Send:** 'नमस्ते वर्धमान टीम! आपके वाल्व्स इंक्वायरी के लिए कोटेशन तैयार है...'\n- **Status:** CRM record initialized, stage: Proposal Dispatched."
      },
      {
        label: "Bilingual Lead Qualification",
        description: "Engages cold WhatsApp leads to qualify firm budget, timing, and authority parameters.",
        steps: [
          { type: "info", text: "Initiating WhatsApp welcome trigger sequence for landing page sign-up...", delay: 400 },
          { type: "info", text: "Outgoing: 'Hi! Got your interest in our tech modules. Looking for customized setups or off-the-shelf?'", delay: 900 },
          { type: "info", text: "User Reply: 'Hame custom setup chahiye, can we do a call? Budget is around 5L.'", delay: 1400 },
          { type: "success", text: "Bilingual intent matching: Identified 'Custom Setup', validated budget (₹5,00,000 > ₹2,00,000 threshold)...", delay: 2000 },
          { type: "success", text: "Auto-scheduled Cal.com demo link and updated inside HubSpot for senior AE close.", delay: 2500 }
        ],
        resultHeader: "Qualified WhatsApp Session",
        resultMarkdown: "Qualification complete.\n\n- **Language match:** Hinglish / English Hybrid\n- **Identified Pain point:** Legacy infrastructure replacement\n- **Qualified Budget:** ₹5.00 Lakhs (High Tier)\n- **Meeting booked:** 14th June, 11:30 AM IST"
      }
    ]
  },
  {
    id: "aarav",
    name: "Aarav.ai",
    avatar: "⚙️",
    role: "Operations & Payment Settlement Coordinator",
    specialization: "Resolves transactional delays, courier exceptions, and back-office pipelines",
    ctcComparison: {
      traditional: "₹10-15 Lakhs CTC / year",
      ai: "₹48,000 / month flat",
      savings: "Eliminate downtime, 100% SLA"
    },
    tools: ["Razorpay Dashboard", "Shiprocket Portal", "Jira API", "IndiaPost", "Slack Channels"],
    skills: ["UPI settlement delay traceback", "Shiprocket claim/dispute filing", "Merchant ledger reconciliation", "Slack escalation alert pinging"],
    languages: ["English"],
    useCases: [
      {
        label: "UPI Failed Transaction Audit",
        description: "Intercepts support tickets about double-deductions, queries payment gateways, and files refunds.",
        steps: [
          { type: "info", text: "Support Ticket #UPI-1092 opened: 'Money deducted from GPay but booking failed'...", delay: 300 },
          { type: "database", text: "Querying Razorpay Payment API using UTR #48190284901...", delay: 700 },
          { type: "warn", text: "Razorpay state: 'Authorized' but not 'Captured' (Escrow rollback state).", delay: 1200 },
          { type: "info", text: "Executing secure API capture request to bank node override...", delay: 1700 },
          { type: "success", text: "Capture complete. Released booking invoice ID: INV-03829-26.", delay: 2200 },
          { type: "success", text: "Dispatched automated WhatsApp + SMS confirmation with PDF ticket. Ticket closed.", delay: 2600 }
        ],
        resultHeader: "UPI Transaction Audit Log",
        resultMarkdown: "Audit Action Success.\n\n- **UTR Reference:** 48190284901\n- **Customer:** Anish Sharma, Pune\n- **Transaction Value:** ₹4,999/-\n- **Refund Initiated:** No (Ledger captured, service delivered safely)\n- **Operational SLA:** 4.2 seconds (vs standard 24 hours)"
      },
      {
        label: "Shiprocket Delivery Exception Dispute",
        description: "Monitors transit stalls, drafts dynamic delay declarations, and files cargo insurance claims.",
        steps: [
          { type: "info", text: "Shiprocket API webhook received: 'RTO Initiated / Customer Refused' for AWB: 90284920...", delay: 400 },
          { type: "database", text: "Querying warehouse tracking log & support WhatsApp logs for proof of intent...", delay: 900 },
          { type: "warn", text: "Discovered WhatsApp log: Customer confirmed delivery window next-day (not refused).", delay: 1400 },
          { type: "info", text: "Filing courier dispute on Shiprocket Dashboard against Delhivery node...", delay: 1900 },
          { type: "success", text: "Uploaded WhatsApp delivery proof as Annexure-B. Held RTO charge & ordered re-attempt.", delay: 2400 }
        ],
        resultHeader: "Logistics Dispute Submission",
        resultMarkdown: "Shiprocket Dispute Lodged.\n\n- **AWB Reference:** 90284920 (Delhivery Air)\n- **RTO Fees Paused:** Save ₹120/- returning surcharge.\n- **Action Taken:** Delivery agent forced to re-attempt supply within 12 hours."
      }
    ]
  }
];

export default function AiEmployees() {
  const setCursorType = useStore((state) => state.setCursorType);
  const [selectedEmployee, setSelectedEmployee] = useState<AIEmployee>(indianAiEmployees[0]);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  
  // Console logs tracking
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConsoleRunning, setIsConsoleRunning] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Switch employees
  const handleEmployeeSelect = (emp: AIEmployee) => {
    setSelectedEmployee(emp);
    setSelectedCaseIdx(0);
    setConsoleLogs([]);
    setShowResult(false);
    setIsConsoleRunning(false);
  };

  // Run simulated task
  const runSimulator = () => {
    if (isConsoleRunning) return;
    setIsConsoleRunning(true);
    setShowResult(false);
    setConsoleLogs([]);

    const activeCase = selectedEmployee.useCases[selectedCaseIdx];
    let currentLogs: string[] = [];

    activeCase.steps.forEach((step, idx) => {
      setTimeout(() => {
        let prefix = "⚙️ [SYSTEM]: ";
        if (step.type === 'success') prefix = "✔ [COMPLETED]: ";
        if (step.type === 'warn') prefix = "⚠ [ALERT]: ";
        if (step.type === 'database') prefix = "🗄 [DATABASE]: ";
        
        currentLogs = [...currentLogs, `${prefix}${step.text}`];
        setConsoleLogs(currentLogs);

        // Scroll to bottom of terminal optionally
        const term = document.getElementById("terminal-scroll-area");
        if (term) term.scrollTop = term.scrollHeight;

        // If it was the last step, show result panel
        if (idx === activeCase.steps.length - 1) {
          setTimeout(() => {
            setIsConsoleRunning(false);
            setShowResult(true);
          }, 600);
        }
      }, step.delay);
    });
  };

  return (
    <section 
      id="ai-employees" 
      className="py-24 relative z-30 px-6 md:px-12 w-full bg-zinc-950 text-white snap-center min-h-screen flex items-center justify-center border-t border-zinc-900"
    >
      <GlitchEntrance id="ai-employees-glitch" className="w-full">
        <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="font-mono text-xs text-teal-400 uppercase tracking-[0.3em] font-semibold">
            Digital Coworkers • Indian Standard Built
          </span>
          <h2 className="text-4xl md:text-6xl tracking-tighter mt-4 max-w-3xl leading-tight font-sans font-black">
            Meet the <span className="font-serif italic font-normal text-teal-400">Next-Gen</span> Localized AI Workforce.
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl text-base md:text-lg">
            High-performance digital specialists optimized for complex Indian corporate codes, taxes, WhatsApp engagement, and operational compliance.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 5 COLS: Choose Employee Profile Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Select AI Assistant Profile</span>
            
            {indianAiEmployees.map((emp) => {
              const worksAsActive = selectedEmployee.id === emp.id;
              return (
                <div 
                  key={emp.id}
                  onClick={() => handleEmployeeSelect(emp)}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  role="button"
                  tabIndex={0}
                  className={`p-6 rounded-[1.5rem] border transition-all duration-400 text-left relative overflow-hidden group select-none ${
                    worksAsActive 
                      ? 'bg-zinc-900 border-teal-500/40 shadow-[0_10px_30px_rgba(20,184,166,0.1)]' 
                      : 'bg-zinc-950 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700/80'
                  }`}
                >
                  {/* Subtle Background Glow for Active Employee */}
                  {worksAsActive && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-2xl rounded-full" />
                  )}

                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{emp.avatar}</span>
                    <div>
                      <h3 className="text-xl font-bold font-sans text-white group-hover:text-teal-400 transition-colors duration-300">
                        {emp.name}
                      </h3>
                      <p className="text-xs text-teal-400/80 font-mono tracking-wide">{emp.role}</p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                    {emp.specialization}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {emp.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="text-[10px] font-mono tracking-wide bg-zinc-850 px-2 py-1 rounded border border-zinc-800 text-zinc-300">
                        {tool}
                      </span>
                    ))}
                    {emp.tools.length > 3 && (
                      <span className="text-[10px] font-mono tracking-wide bg-zinc-850 px-2 py-1 rounded border border-zinc-800 text-zinc-500">
                        +{emp.tools.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTC Comparison Bar */}
                  <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="block text-zinc-500 text-[9px] font-mono uppercase tracking-wider">Traditional Cost</span>
                      <span className="font-semibold text-zinc-300 line-through decoration-zinc-600">{emp.ctcComparison.traditional}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-teal-500 text-[9px] font-mono uppercase tracking-wider">Priya.ai Cost</span>
                      <span className="font-black text-teal-400">{emp.ctcComparison.ai}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 7 COLS: Action Selection & Active Operational Simulator Console */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[2rem] border border-zinc-800/80 bg-zinc-950 p-6 md:p-8 relative overflow-hidden">
            {/* Top glass highlights visual layout */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
            
            <div>
              {/* Profile details header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                <div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Active Workspace: {selectedEmployee.name}</span>
                  <p className="text-sm text-zinc-300 mt-1">Multi-tool orchestration across platforms</p>
                </div>
                <div className="flex gap-2">
                  {selectedEmployee.languages.map((l, i) => (
                    <span key={i} className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                      <Languages className="w-2.5 h-2.5" />
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Task Options selector */}
              <div className="mt-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-3">Choose Simulated Indian Workflow</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedEmployee.useCases.map((useCase, idx) => {
                    const isActive = selectedCaseIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isConsoleRunning) return;
                          setSelectedCaseIdx(idx);
                          setConsoleLogs([]);
                          setShowResult(false);
                        }}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                          isConsoleRunning ? 'opacity-50 pointer-events-none' : ''
                        } ${
                          isActive 
                            ? 'bg-zinc-850 border-teal-500/50' 
                            : 'bg-zinc-900/40 border-zinc-800/60 hover:bg-zinc-900/80 hover:border-zinc-700'
                        }`}
                      >
                        <h4 className={`text-sm font-bold ${isActive ? 'text-teal-400' : 'text-zinc-200'}`}>
                          {useCase.label}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2">
                          {useCase.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Console Trigger Button */}
              <div className="mt-6 flex flex-col md:flex-row items-center gap-4 justify-between bg-zinc-900/40 px-5 py-4 rounded-xl border border-zinc-800/50">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block font-bold">Operation Target</span>
                  <span className="text-sm text-zinc-300 font-medium">Evaluate output trace in real-time execution</span>
                </div>
                <button
                  onClick={runSimulator}
                  disabled={isConsoleRunning}
                  onMouseEnter={() => setCursorType('pointer')}
                  onMouseLeave={() => setCursorType('default')}
                  className={`px-5 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
                    isConsoleRunning 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-teal-500 hover:bg-teal-400 text-black shadow-[0_4px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_4px_30px_rgba(20,184,166,0.5)] active:scale-95'
                  }`}
                >
                  {isConsoleRunning ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-zinc-500 animate-spin" />
                      Running Trace...
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Trigger simulated run
                    </>
                  )}
                </button>
              </div>

              {/* Dynamic Terminal Box */}
              <div className="mt-6 rounded-xl border border-zinc-800 bg-black p-4 text-left font-mono text-xs overflow-hidden relative shadow-inner">
                {/* Console header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest ml-1">Live Agent Logs</span>
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                </div>

                {/* Log messages scrollbox */}
                <div 
                  id="terminal-scroll-area"
                  className="h-44 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent select-text"
                >
                  {consoleLogs.length === 0 ? (
                    <div className="text-zinc-600 italic h-full flex items-center justify-center text-[11px]">
                      // Waiting for trigger... Press 'Trigger Simulated Run' to stream operational logic.
                    </div>
                  ) : (
                    consoleLogs.map((log, i) => {
                      let colorClass = "text-zinc-400";
                      if (log.startsWith("✔")) colorClass = "text-emerald-400 font-semibold";
                      if (log.startsWith("⚠")) colorClass = "text-rose-400";
                      if (log.startsWith("🗄")) colorClass = "text-indigo-400";
                      
                      return (
                        <div key={i} className={`leading-relaxed whitespace-pre-wrap ${colorClass}`}>
                          {log}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Output Result panel (reveals dynamically on trace end) */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 border border-teal-500/30 bg-teal-950/20 rounded-xl p-5 text-left"
                >
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm mb-3">
                    <CheckCircle className="w-4 h-4" />
                    <span>{selectedEmployee.useCases[selectedCaseIdx].resultHeader}</span>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-line bg-black/45 p-4 rounded border border-zinc-800/50">
                    {selectedEmployee.useCases[selectedCaseIdx].resultMarkdown}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Bottom SLA disclaimer metrics */}
            <div className="mt-8 pt-5 border-t border-zinc-800/85 flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                DPA GDPR & ISO Compliant Sandbox
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                Average Resolution: &lt;10 seconds
              </span>
            </div>

          </div>

        </div>
      </div>
      </GlitchEntrance>
    </section>
  );
}
