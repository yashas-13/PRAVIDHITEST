import express from "express";
import path from "path";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// High-speed HTTP response compression (gzip / deflate)
app.use(
  compression({
    level: 6,
    threshold: 256, // Compress all payloads above 256 bytes (JSON, HTML, JS, CSS, SVG)
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(express.json({ limit: "1mb" }));

// In-memory cache store for ultra-low-latency API responses (<1ms)
const apiCache = new Map<string, { data: any; expiry: number }>();

function getCachedData<T>(key: string): T | null {
  const cached = apiCache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data as T;
  }
  if (cached) {
    apiCache.delete(key);
  }
  return null;
}

function setCachedData<T>(key: string, data: T, ttlMs: number = 60000): void {
  // Bound cache size to prevent memory bloat
  if (apiCache.size > 500) {
    const firstKey = apiCache.keys().next().value;
    if (firstKey) apiCache.delete(firstKey);
  }
  apiCache.set(key, { data, expiry: Date.now() + ttlMs });
}

// Performance & security response headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Lazy-initialization helper for Gemini client as recommended in the safety guidelines
let aiClient: GoogleGenAI | null = null;
let isKeyInvalid = false;

function isKeyConfigured(key?: string): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  if (
    !trimmed || 
    trimmed === "MY_GEMINI_API_KEY" || 
    trimmed === "YOUR_API_KEY" || 
    trimmed === "undefined" || 
    trimmed === "null" ||
    trimmed.length < 10
  ) {
    return false;
  }
  return true;
}

function getAi(): GoogleGenAI | null {
  if (isKeyInvalid) return null;
  const key = process.env.GEMINI_API_KEY;
  if (!isKeyConfigured(key)) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key!,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

function recordApiError(err: any) {
  const errMsg = typeof err === "string" ? err : err?.message || JSON.stringify(err || "");
  if (
    errMsg.includes("API key not valid") ||
    errMsg.includes("API_KEY_INVALID") ||
    errMsg.includes("INVALID_ARGUMENT") ||
    err?.status === 400 ||
    err?.status === 401 ||
    err?.status === 403 ||
    err?.code === 400 ||
    err?.code === 401 ||
    err?.code === 403
  ) {
    isKeyInvalid = true;
    aiClient = null;
  }
}

// Offline Architectural Knowledge Engine for fallback scenarios
function getFallbackSuggestions(query: string) {
  const q = query.toLowerCase();
  const allSuggestions = [
    {
      title: "Automated Zero-Day Threat Radar",
      category: "Threat Reconnaissance",
      description: "Live CVE telemetry and daily SEO intelligence brief with Ansible & Terraform fixes.",
      readyTime: "Real-Time Feed"
    },
    {
      title: "14-Day Sovereign Cloud Hardening",
      category: "Core Infrastructure",
      description: "CIS Benchmark Level 2 zero-trust lockdown across AWS, GCP, Azure & Linux kernels.",
      readyTime: "14-Day Cycle"
    },
    {
      title: "AI Ops & Inference Cost Optimizer",
      category: "AI & LLM Ops",
      description: "Semantic caching, spot GPU failovers, and prompt token pruning saving 30%–60% compute.",
      readyTime: "7-Day Sprint"
    },
    {
      title: "Compliance-as-Code (DPDP & SOC2)",
      category: "Governance",
      description: "Automated OPA gatekeeper policies enforcing Indian data residency and continuous audit logs.",
      readyTime: "Instant IaC"
    },
    {
      title: "Managed DevSecOps Solo-Retainer",
      category: "Dedicated Retainer",
      description: "Direct 15-minute P0 incident SLA and 10-year veteran principal architect oversight.",
      readyTime: "Immediate"
    },
    {
      title: "Private VPC & mTLS Service Mesh",
      category: "Zero-Trust Network",
      description: "Eliminates all public ingress exposure with automated mutual TLS cryptographic certificates.",
      readyTime: "5-Day Sprint"
    }
  ];

  if (!q.trim()) return allSuggestions.slice(0, 3);
  
  const filtered = allSuggestions.filter(
    s => s.title.toLowerCase().includes(q) || 
         s.category.toLowerCase().includes(q) || 
         s.description.toLowerCase().includes(q)
  );

  return filtered.length > 0 ? filtered.slice(0, 3) : allSuggestions.slice(0, 3);
}

function getFallbackChatResponse(message: string): string {
  const q = message.toLowerCase();

  if (q.includes("radar") || q.includes("zero-day") || q.includes("zero day") || q.includes("cve") || q.includes("exploit") || q.includes("threat")) {
    return "Pravidhi Automated Zero-Day Threat Radar actively monitors 2,418+ global CVE streams.\n\n" +
      "Active Defenses Online:\n" +
      "• Linux Kernel eBPF Subsystem Zero-Day (CVE-2026-9812): Neutralized via Ansible sysctl hardening.\n" +
      "• Multi-Cloud OIDC Token Confusion (CVE-2026-4419): Remediated via Terraform pinned commit ABAC policies.\n" +
      "• Ingress NGINX Snippet Injection (CVE-2026-7721): Blocked via OPA Gatekeeper constraint policies.\n" +
      "• NVIDIA CUDA UAF Host Escape (CVE-2026-3190): Isolated via Kata Containers & GPU sandboxing.\n\n" +
      "Every detected threat includes executable Ansible/Terraform remediation playbooks and is packaged into our 14-Day Sovereign Cloud Hardening Sprint.";
  }

  if (q.includes("hardening") || q.includes("5l") || q.includes("3.5l") || q.includes("14-day") || q.includes("deliverables") || q.includes("cost")) {
    return "The 14-Day Sovereign Cloud Hardening Sprint (₹3,50,000 / $4,200 USD flat-rate) delivers:\n\n" +
      "1. Automated Terraform/OpenTofu IaC modules enforcing CIS Benchmark Level 2 across AWS, Azure, GCP, or bare-metal Linux.\n" +
      "2. Complete elimination of public ingress with private VPC peering and automated mTLS service meshes.\n" +
      "3. KMS-backed envelope encryption on all databases, storage volumes, and secrets.\n" +
      "4. Open Policy Agent (OPA) gatekeeper guardrails and automated DPDP Act 2023 / SOC2 compliance evidence generation.\n" +
      "5. 100% full intellectual property and source code transfer upon completion.";
  }

  if (q.includes("ai ops") || q.includes("2.5l") || q.includes("audit") || q.includes("token") || q.includes("llm") || q.includes("gpu")) {
    return "Our AI Ops & Infrastructure Audit (₹2,50,000 / $3,000 USD flat-rate 7-day sprint) optimizes your machine learning architecture:\n\n" +
      "• Semantic Caching: Implements Redis/Qdrant-backed vector caching to eliminate redundant inference calls.\n" +
      "• GPU Spot Orchestration: Automates seamless spot GPU failover for up to 60% compute savings.\n" +
      "• Prompt Token Pruning: Minimizes context token bloat with deterministic tokenizer profiles.\n" +
      "• Zero-Trust Isolation: Prevents prompt injection vulnerabilities and data leaks to public foundation models.";
  }

  if (q.includes("retainer") || q.includes("sla") || q.includes("solo") || q.includes("principal")) {
    return "The Managed DevSecOps Solo-Retainer (₹4,50,000 / $5,500 USD per month) offers:\n\n" +
      "• Dedicated access to a 10-year veteran principal cloud security architect.\n" +
      "• Guaranteed 15-minute response SLA for P0 catastrophic infrastructure incidents.\n" +
      "• Strictly capped at a maximum of 2 active enterprise clients concurrently for uncompromised focus.\n" +
      "• Continuous vulnerability patching, CI/CD hardening, and proactive architecture reviews.";
  }

  if (q.includes("nda") || q.includes("confidentiality") || q.includes("ip") || q.includes("ownership")) {
    return "Pravidhi's Sovereign Confidentiality & IP Standard:\n\n" +
      "• 100% Unencumbered IP Ownership: You own every line of Terraform, Ansible playbook, Dockerfile, and pipeline written.\n" +
      "• Zero Vendor Lock-in: No recurring software royalties, proprietary control planes, or licensing fees.\n" +
      "• Sovereign Zero-Trust NDA: Strict mutual confidentiality agreements protecting proprietary architecture diagrams and sensitive cloud credentials.";
  }

  return "PRAVIDHI Sovereign Infrastructure Node initialized.\n\n" +
    "We specialize in sovereign-grade cloud security hardening, AI Ops cost optimization, and fixed-cycle DevSecOps delivery with 100% unencumbered IP ownership.\n\n" +
    "Key Fixed-Price Packages:\n" +
    "1. 14-Day Sovereign Cloud Hardening Sprint: ₹3,50,000\n" +
    "2. AI Ops Cost & Security Audit: ₹2,50,000\n" +
    "3. Managed DevSecOps Solo-Retainer: ₹4,50,000/mo (15-min P0 SLA, Max 2 clients)\n\n" +
    "How can our principal architect assist your engineering roadmap today?";
}

// 1. Instant Autocomplete / Intelligent Prompt Suggested Results (Low-Latency Response)
app.post("/api/agent/autocomplete", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required" });
    }

    const trimmedQuery = query.trim().toLowerCase();
    const cacheKey = `autocomplete_${trimmedQuery}`;
    const cached = getCachedData<any>(cacheKey);
    if (cached) {
      res.setHeader("X-Cache-Status", "HIT");
      return res.json(cached);
    }

    const ai = getAi();
    if (!ai) {
      // Fallback directly to high-speed deterministic suggestions
      const fallbackData = { suggestions: getFallbackSuggestions(query) };
      setCachedData(cacheKey, fallbackData, 120000);
      res.setHeader("X-Cache-Status", "MISS-FALLBACK");
      return res.json(fallbackData);
    }

    const systemPrompt = `You are a real-time, ultra-fast autocomplete sub-routine for PRAVIDHI, an elite software engineering agency.
Based on the partial search query or command entered by the user, immediately generate exactly 3 highly specific engineering sub-routine suggestions, custom features, or solutions that PRAVIDHI can build in response. 

Return ONLY a valid JSON array of objects conforming to:
interface Suggestion {
  title: string;
  category: string;
  description: string;
  readyTime: string;
}
Do not include markdown wrappers. Keep suggestions sharp, futuristic, and professional.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: `Query: "${query}"`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "[]";
      const parsed = JSON.parse(text);
      const payload = { suggestions: parsed };
      setCachedData(cacheKey, payload, 300000); // 5 min cache
      res.setHeader("X-Cache-Status", "MISS-AI");
      return res.json(payload);
    } catch (apiErr: any) {
      recordApiError(apiErr);
      const fallbackData = { suggestions: getFallbackSuggestions(query) };
      setCachedData(cacheKey, fallbackData, 120000);
      return res.json(fallbackData);
    }
  } catch (err: any) {
    recordApiError(err);
    res.json({ suggestions: getFallbackSuggestions(req.body?.query || "") });
  }
});

// Automated Cyber Threats Zero-Day Threat Radar API
app.get("/api/threat-radar/feed", (req, res) => {
  const cacheKey = "threat_radar_feed";
  const cached = getCachedData<any>(cacheKey);
  if (cached) {
    res.setHeader("X-Cache-Status", "HIT");
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.json(cached);
  }

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const payload = {
    radarStatus: "ACTIVE_SWEEP_ONLINE",
    lastSyncTimestamp: new Date().toISOString(),
    dailyCycleDate: `Daily Sovereign Dispatch: ${today}`,
    totalThreatsScanned: 2418,
    activeZeroDaysTracked: 6,
    criticalVulnerabilityScoreAverage: 9.4,
    activeDefenseEngines: [
      { id: "ansible", name: "Ansible Automation", status: "ONLINE", mitigatedCount: 42 },
      { id: "terraform", name: "Terraform / OpenTofu", status: "ONLINE", mitigatedCount: 56 },
      { id: "kubernetes", name: "Kubernetes Isolation", status: "ONLINE", mitigatedCount: 38 },
      { id: "opa", name: "OPA Gatekeeper", status: "ONLINE", mitigatedCount: 29 },
      { id: "ai-vector-shield", name: "AI Ops Vector Shield", status: "ONLINE", mitigatedCount: 24 },
      { id: "ebpf-kernel", name: "eBPF & Kernel Lockdown", status: "ONLINE", mitigatedCount: 31 },
      { id: "vault", name: "HashiCorp Vault HSM", status: "ONLINE", mitigatedCount: 47 }
    ]
  };

  setCachedData(cacheKey, payload, 60000);
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.json(payload);
});

// Auto-fetch latest zero-day intelligence findings
app.post("/api/threat-radar/auto-fetch", async (req, res) => {
  try {
    const ai = getAi();
    const todayStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    
    if (!ai) {
      // Deterministic dynamic generator for offline mode
      const freshZeroDays = [
        {
          id: `cve-2026-${Date.now().toString().slice(-4)}-ebpf-privilege`,
          cve: `CVE-2026-9812`,
          cvssScore: 9.8,
          severity: "CRITICAL",
          status: "In The Wild",
          title: "Linux eBPF Subsystem Verifier Bypass & Kernel Escalation",
          headline: "Unauthenticated Ring-0 Memory Overwrite via Malformed BPF Bytecode Maps",
          publishedDate: `Daily Sovereign Dispatch: ${todayStr}`,
          readTime: "4 min read",
          targetStack: "Linux Kernels 5.15–6.8 / Kubernetes Pod Workers",
          affectedSystems: ["Ubuntu 22.04/24.04 LTS", "Amazon Linux 2023", "RedHat Enterprise Linux 9", "GKE/EKS Node Pools"],
          defendingSkillNodes: ["ansible", "kubernetes", "ebpf-kernel"],
          summary: "A critical flaw in the Linux kernel eBPF bytecode verifier allows local container processes to write directly to kernel memory address space, bypassing seccomp and namespaces.",
          what: "The eBPF sub-verifier miscalculates register value bounds during integer arithmetic loops, enabling out-of-bounds pointer manipulation inside the kernel memory page table.",
          why: "Allows untrusted container workloads to escape isolation boundaries, hijack host system calls, and exfiltrate cloud provider metadata service (IMDSv2) access tokens.",
          where: "Executes on bare-metal host kernels, container runtime daemon nodes (containerd/CRI-O), and unhardened multi-tenant Kubernetes clusters.",
          when: "Critical 0-hour SLA. Exploit binaries are actively circulating across public security repositories.",
          howWeHelp: "Pravidhi deploys automated Ansible kernel hardening playbooks that disable unprivileged eBPF syscalls, restrict kernel pointer dumps, and apply strict OPA Gatekeeper pod security policies within 24 hours.",
          remediationCode: {
            language: "yaml",
            filename: "ansible/playbooks/ebpf_kernel_lockdown.yml",
            description: "Automated kernel-level eBPF syscall restriction playbook",
            code: `---
- name: Sovereign Kernel Lockdown & eBPF Mitigation
  hosts: kubernetes_nodes
  become: yes
  tasks:
    - name: Disable unprivileged eBPF subsystem execution
      sysctl:
        name: kernel.unprivileged_bpf_disabled
        value: '1'
        state: present
        reload: yes
    - name: Restrict Kernel Pointer Leaks
      sysctl:
        name: kernel.kptr_restrict
        value: '2'
        state: present
        reload: yes`
          },
          seoKeywords: ["eBPF Zero Day 2026", "Kernel Hardening Ansible", "Kubernetes Pod Security", "CVE-2026-9812 Fix", "CIS Benchmark L2", "Sovereign Cloud Security"],
          remediationPackage: "14-Day Sovereign Cloud Hardening",
          radarCoordinates: { angle: 45, distance: 75 }
        },
        {
          id: `cve-2026-${Date.now().toString().slice(-4)}-iam-oidc-bypass`,
          cve: `CVE-2026-4419`,
          cvssScore: 9.4,
          severity: "CRITICAL",
          status: "Zero-Day Unpatched",
          title: "Multi-Cloud OIDC Federation & IAM Role Chaining Bypass",
          headline: "Cryptographic Signature Validation Flaw in Cloud IAM Trust Policies",
          publishedDate: `Daily Sovereign Dispatch: ${todayStr}`,
          readTime: "3 min read",
          targetStack: "AWS IAM / Azure Entra ID / GCP Workload Identity",
          affectedSystems: ["AWS STS Token Broker", "GCP Service Accounts", "GitHub Actions CI/CD OIDC Connectors"],
          defendingSkillNodes: ["terraform", "opa", "vault"],
          summary: "Improper wildcard sub-claim evaluation in federated OIDC identity providers allows rogue CI/CD workflow tokens to assume highest-tier cloud administrative roles.",
          what: "Wildcard regex matching in the condition clause of IAM assume-role policies matches arbitrary external repository branches, bypassing organization scoping restrictions.",
          why: "An attacker who opens a pull request against any open-source fork can generate an OIDC token that inherits full production cloud infrastructure write access.",
          where: "Strikes multi-cloud IAM role definitions, automated CI/CD deployment pipelines, and KMS key management policies.",
          when: "Immediate emergency audit required. Audit all STS AssumeRoleWithWebIdentity events across all regions.",
          howWeHelp: "Pravidhi provides immutable Terraform modules and OPA CI/CD linters enforcing exact string matching on GitHub/GitLab repository IDs, eliminating wildcard IAM privilege escalations.",
          remediationCode: {
            language: "hcl",
            filename: "terraform/modules/iam/strict_oidc_trust.tf",
            description: "Immutable Terraform strict OIDC claim lock",
            code: `resource "aws_iam_role" "strict_sovereign_ci" {
  name = "SovereignDeployerRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:pravidhi-org/production-infra:ref:refs/heads/main"
        }
      }
    }]
  })
}`
          },
          seoKeywords: ["IAM OIDC Security", "Terraform Cloud Hardening", "AWS IAM Vulnerability", "Zero Trust Architecture", "SOC2 IAM Compliance", "DPDP Cloud Security"],
          remediationPackage: "Sovereign-Grade Cloud Security Hardening",
          radarCoordinates: { angle: 160, distance: 60 }
        }
      ];

      return res.json({
        success: true,
        isLiveAI: false,
        source: "Sovereign Threat Reconnaissance Feed",
        fetchedAt: new Date().toISOString(),
        articles: freshZeroDays
      });
    }

    // Live AI Generation using Gemini
    const prompt = `You are PRAVIDHI SOVEREIGN ZERO-DAY THREAT RADAR AI.
Generate 2 authoritative, cutting-edge, technically precise Zero-Day cyber threat findings and articles for today (${todayStr}).
The vulnerabilities should target modern cloud architectures (e.g. Linux Kernel, Kubernetes, Multi-Cloud IAM, eBPF, Vector DBs, or LLM AI pipelines).

For each article, you MUST strictly explain:
1. HOW Pravidhi Solutions helps (Ansible/Terraform playbooks, 14-day sovereign sprint)
2. WHY traditional defenses fail & why it matters (blast radius, compliance risk)
3. WHEN to patch (0-hour urgency)
4. WHERE in the infrastructure it strikes (VPCs, kernel, pods)
5. Executable remediation code (Ansible, Terraform, OPA, or sysctl)
6. 6 high-intent SEO keywords.

Return ONLY a valid JSON array of objects conforming to this schema (do NOT wrap in markdown like \`\`\`json):
[
  {
    "id": "cve-2026-auto-${Date.now()}-1",
    "cve": "CVE-2026-XXXX",
    "cvssScore": 9.7,
    "severity": "CRITICAL",
    "status": "In The Wild",
    "title": "Concise Technical Title",
    "headline": "High-impact investigative headline",
    "publishedDate": "Daily Sovereign Dispatch: ${todayStr}",
    "readTime": "4 min read",
    "targetStack": "Specific target technology stack",
    "affectedSystems": ["System 1", "System 2", "System 3"],
    "defendingSkillNodes": ["ansible", "terraform", "kubernetes"],
    "summary": "Executive summary of the zero-day exploit",
    "what": "Exact technical vulnerability & root cause mechanics",
    "why": "Business and architectural impact",
    "where": "Infrastructure layer affected",
    "when": "Patching urgency SLA",
    "howWeHelp": "How Pravidhi's fixed sprint protects the organization",
    "remediationCode": {
      "language": "yaml",
      "filename": "ansible/playbooks/cve_mitigation.yml",
      "description": "Remediation blueprint",
      "code": "executable code snippet"
    },
    "seoKeywords": ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5", "Keyword 6"],
    "remediationPackage": "14-Day Sovereign Cloud Hardening",
    "radarCoordinates": { "angle": 75, "distance": 65 }
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "[]";
    const articles = JSON.parse(text);
    return res.json({
      success: true,
      isLiveAI: true,
      source: "Gemini 3.7 Flash Sovereign Reconnaissance Engine",
      fetchedAt: new Date().toISOString(),
      articles
    });
  } catch (err: any) {
    recordApiError(err);
    res.json({
      success: false,
      error: "Switched to local threat feed",
      articles: []
    });
  }
});

// Admin KB & Threat Radar Storage Endpoints (Server Memory + Local Storage Sync)
let serverCustomArticles: any[] = [];
let serverCustomFaqs: any[] = [];

app.get("/api/admin/knowledge-base", (req, res) => {
  res.json({
    success: true,
    customArticles: serverCustomArticles,
    customFaqs: serverCustomFaqs,
    syncedAt: new Date().toISOString()
  });
});

app.post("/api/admin/knowledge-base/save", (req, res) => {
  try {
    const { customArticles, customFaqs } = req.body;
    if (Array.isArray(customArticles)) {
      serverCustomArticles = customArticles;
    }
    if (Array.isArray(customFaqs)) {
      serverCustomFaqs = customFaqs;
    }
    // Bust cached threat feed
    apiCache.delete("threat_radar_feed");
    res.json({
      success: true,
      message: "Knowledge base and threat radar database persisted successfully",
      articleCount: serverCustomArticles.length,
      faqCount: serverCustomFaqs.length,
      updatedAt: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/admin/ai-generate-faq", async (req, res) => {
  try {
    const { topic, category } = req.body;
    const targetTopic = topic || "Sovereign Cloud Hardening Architecture";
    const targetCategory = category || "Sovereign Infrastructure";

    const ai = getAi();
    if (!ai) {
      return res.json({
        success: true,
        isLiveAI: false,
        faq: {
          id: `faq-${Date.now()}`,
          category: targetCategory,
          question: `How does Pravidhi implement sovereign-grade architecture for ${targetTopic}?`,
          highlights: ["Zero-Trust Isolation", "CIS Benchmark L2", "100% IP Handover"],
          searchKeywords: [targetTopic.toLowerCase(), "sovereign", "cloud security", "hardening", "devsecops", "pravidhi"],
          answer: `Pravidhi executes sovereign-grade engineering for ${targetTopic} by enforcing strict perimeter isolation, removing public ingress pathways, applying automated CIS Benchmark Level 2 controls, and transferring 100% intellectual property with zero recurring vendor royalties.`,
          codeSnippet: `# Automated Hardening Blueprint for ${targetTopic}\nkernel.unprivileged_bpf_disabled = 1\nfs.protected_fifos = 2\nnet.ipv4.tcp_syncookies = 1`
        }
      });
    }

    const prompt = `You are PRAVIDHI KNOWLEDGE BASE ARCHITECT AI.
Generate a structured, authoritative FAQ item for the topic: "${targetTopic}" under the category "${targetCategory}".
Focus on high-ticket sovereign cloud engineering, DevSecOps, zero-trust hardening, or AI ops.

Return ONLY a valid JSON object conforming to this schema (do NOT wrap in markdown like \`\`\`json):
{
  "id": "faq-${Date.now()}",
  "category": "${targetCategory}",
  "question": "Clear, search-intent driven technical question",
  "highlights": ["3-4 word highlight 1", "3-4 word highlight 2", "3-4 word highlight 3"],
  "searchKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "answer": "3-4 sentence authoritative, direct answer explaining the sovereign engineering approach, deliverables, and commercial benefits",
  "codeSnippet": "clean 4-8 line code snippet (Ansible, Terraform, OPA, or bash)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const faq = JSON.parse(text);
    return res.json({ success: true, isLiveAI: true, faq });
  } catch (err: any) {
    recordApiError(err);
    res.json({
      success: false,
      error: "Switched to fallback FAQ generator"
    });
  }
});

app.post("/api/threat-radar/research", async (req, res) => {
  try {
    const { topic, stack } = req.body;
    const searchTarget = topic || stack || "Linux Kernel zero day memory corruption";

    const ai = getAi();
    if (!ai) {
      return res.json({
        success: true,
        isLiveAI: false,
        article: {
          id: `custom-threat-${Date.now()}`,
          cve: `CVE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          cvssScore: 9.6,
          severity: "CRITICAL",
          status: "In The Wild",
          title: `Dynamic Threat Analysis: ${searchTarget}`,
          headline: `Exploit Vector Analysis & Sovereign Defense Architecture for ${searchTarget}`,
          publishedDate: `Daily Sovereign Dispatch: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          readTime: "3 min read",
          targetStack: stack || "Multi-Cloud Infrastructure / Kubernetes",
          affectedSystems: ["Linux Kernels", "Kubernetes Pods", "AWS IAM", "Cloud VPCs"],
          defendingSkillNodes: ["ansible", "terraform", "kubernetes"],
          summary: `Automated zero-day threat analysis detected anomalous privilege escalation and remote payload execution vectors targeting ${searchTarget}.`,
          what: `The vulnerability represents a critical architectural gap where unauthenticated inputs bypass traditional boundary inspection in ${searchTarget}, leading to potential memory or credential exfiltration.`,
          why: `Unchecked exploitation leads to catastrophic lateral movement across cloud VPCs, total administrative privilege compromise, and statutory DPDP Act 2023 violation liability.`,
          where: `Affects unhardened infrastructure perimeter services, container worker nodes, and IAM trust policies lacking cryptographic verification.`,
          when: `Immediate 0-hour mitigation SLA required. Weaponized proof-of-concepts have been identified across global threat monitoring networks.`,
          howWeHelp: `Pravidhi executes an immediate automated Ansible & Terraform zero-trust hardening playbook, enforcing least-privilege RBAC, kernel parameter lockdown, and OPA gatekeeper policies within a 14-day sprint.`,
          remediationCode: {
            language: "yaml",
            filename: "ansible/playbooks/sovereign_hardening.yml",
            description: `Automated zero-trust remediation playbook for ${searchTarget}`,
            code: `---
- name: Sovereign Hardening & CVE Mitigation Playbook
  hosts: all
  become: yes
  tasks:
    - name: Restrict Kernel Attack Surface
      sysctl:
        name: "{{ item }}"
        value: "1"
        state: present
        reload: yes
      loop:
        - kernel.unprivileged_bpf_disabled
        - kernel.dmesg_restrict`
          },
          seoKeywords: ["Zero-Day Defense 2026", "Cloud Hardening", "Terraform IaC", "Ansible Automation", "CIS Benchmark L2", "Pravidhi Sovereign Defense"],
          remediationPackage: "14-Day Sovereign Cloud Hardening",
          radarCoordinates: { angle: 120, distance: 70 }
        }
      });
    }

    const prompt = `You are the PRAVIDHI SOVEREIGN ZERO-DAY THREAT RADAR AI.
Generate a structured, authoritative, technical zero-day intelligence report and daily article for the topic/stack: "${searchTarget}".

You MUST strictly cover:
1. WHAT: Deep exploit mechanics and root cause
2. WHY: Business blast radius, DPDP Act 2023 and SOC2 compliance impact
3. WHERE: Where in cloud infrastructure it strikes (VPCs, pods, IAM)
4. WHEN: Urgency timeline and incident response SLA
5. HOW WE HELP: How Pravidhi Solutions helps with fixed-price sprint/retainer and automated code
6. Executable remediation code (Ansible, Terraform, OPA, or sysctl)
7. 6 SEO keywords.

Return ONLY a valid JSON object conforming to this schema (do NOT wrap in markdown like \`\`\`json):
{
  "id": "cve-2026-dynamic-${Date.now()}",
  "cve": "CVE-2026-XXXX",
  "cvssScore": 9.5,
  "severity": "CRITICAL",
  "status": "In The Wild",
  "title": "Concise Technical Threat Name",
  "headline": "High-impact investigative headline",
  "publishedDate": "Daily Sovereign Dispatch: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}",
  "readTime": "3 min read",
  "targetStack": "Target technology stack and version",
  "affectedSystems": ["System 1", "System 2"],
  "defendingSkillNodes": ["ansible", "terraform", "kubernetes"],
  "summary": "2-sentence executive summary of the vulnerability",
  "what": "Deep explanation of the exploit mechanics and CVE root cause",
  "why": "Why it's dangerous (blast radius, DPDP/SOC2 compliance breach)",
  "where": "Where in the infrastructure it strikes (VPCs, pods, IAM)",
  "when": "When to patch (Urgency timeline)",
  "howWeHelp": "How Pravidhi Solutions helps with 14-Day Sovereign Sprint / Retainer",
  "remediationCode": {
    "language": "yaml",
    "filename": "ansible/security/cve-remediation.yml",
    "description": "Short explanation of the fix",
    "code": "executable code snippet (Ansible, Terraform, OPA, or sysctl)"
  },
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "remediationPackage": "14-Day Sovereign Cloud Hardening",
  "radarCoordinates": { "angle": 210, "distance": 65 }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const article = JSON.parse(text);
    return res.json({ success: true, isLiveAI: true, article });
  } catch (err: any) {
    recordApiError(err);
    res.json({
      success: true,
      isLiveAI: false,
      error: "Switched to sovereign fallback research engine",
      article: null
    });
  }
});

// 2. Chat Assistant Streaming (SSE for Conversational Agent that feels alive)
app.get("/api/agent/stream", async (req, res) => {
  // Set headers for standard Server-Sent Events (SSE)
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const { message, history } = req.query;
  if (!message || typeof message !== "string") {
    res.write("data: " + JSON.stringify({ error: "Message parameter is required" }) + "\n\n");
    res.end();
    return;
  }

  const ai = getAi();
  
  // If no AI client or key is invalid, stream from the sovereign knowledge engine seamlessly
  if (!ai) {
    const fallbackText = getFallbackChatResponse(message);
    const words = fallbackText.split(" ");
    for (let i = 0; i < words.length; i++) {
      const chunk = (i === 0 ? "" : " ") + words[i];
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      // Small simulated streaming delay for natural readability
      await new Promise(r => setTimeout(r, 20));
    }
    res.write("data: [DONE]\n\n");
    res.end();
    return;
  }

  const systemInstruction = `You are PRAVIDHI SOVEREIGN ARCHITECT PROXY, a high-authority technical agent representing Pravidhi Solutions LLP.
Pravidhi specializes in Sovereign-Grade Infrastructure, Cloud Automation, Zero-Trust Hardening, and Secure AI Systems, led by a 10-year veteran multi-cloud architect.
All engagements are flat-rate, fixed-cycle packages with 100% IP ownership and sovereign confidentiality (strict NDAs):
1. Sovereign-Grade Cloud Security Hardening: ₹3,50,000 / $4,200 USD (14-Day Cycle)
2. AI Ops & Infrastructure Audit: ₹2,50,000 / $3,000 USD (7-Day Sprint)
3. Managed DevSecOps Solo-Retainer: ₹4,50,000 / $5,500 USD / month (Dedicated Principal Architect, Max 2 clients active, 15-min P0 SLA)
4. Compliance-as-Code Automation Kit: ₹10,00,000 (Enterprise Terraform/Ansible IP License)

Speak clearly, objectively, and with elite technical authority. Provide concise, razor-sharp architectural answers without fluff or generic SaaS jargon. Always emphasize sovereign zero-trust security and fixed-cycle delivery.`;

  try {
    const chatHistory = history ? JSON.parse(history as string) : [];
    const contents: any[] = [];
    if (Array.isArray(chatHistory)) {
      chatHistory.forEach((item: any) => {
        contents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.content }],
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err: any) {
    recordApiError(err);
    // Stream fallback smoothly
    const fallbackText = getFallbackChatResponse(message);
    const words = fallbackText.split(" ");
    for (let i = 0; i < words.length; i++) {
      const chunk = (i === 0 ? "" : " ") + words[i];
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      await new Promise(r => setTimeout(r, 20));
    }
    res.write("data: [DONE]\n\n");
    res.end();
  }
});

// Dynamic Sitemap Generator Helper based on application structure
function generateDynamicSitemap(): string {
  const baseUrl = "https://pravidhisolutions.in";
  const today = new Date().toISOString().split("T")[0];

  const routes = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/#deep-search", priority: "0.98", changefreq: "daily" },
    { path: "/#productised-services", priority: "0.95", changefreq: "weekly" },
    { path: "/#threat-radar", priority: "0.95", changefreq: "daily" },
    { path: "/#services", priority: "0.9", changefreq: "weekly" },
    { path: "/#ai-services", priority: "0.9", changefreq: "weekly" },
    { path: "/#ai-employees", priority: "0.85", changefreq: "weekly" },
    { path: "/#insights-faq", priority: "0.9", changefreq: "weekly" },
    { path: "/#philosophy", priority: "0.8", changefreq: "monthly" },
    { path: "/#contact", priority: "0.9", changefreq: "monthly" },
    // High-Intent Zero-Day Threat & Architecture Deep Links for search bot indexing
    { path: "/#cve-2026-9812-ebpf-privilege-escalation", priority: "0.9", changefreq: "weekly" },
    { path: "/#cve-2026-4419-iam-oidc-bypass", priority: "0.9", changefreq: "weekly" },
    { path: "/#cve-2026-7721-k8s-ingress-rce", priority: "0.9", changefreq: "weekly" },
    { path: "/#cve-2026-3190-gpu-kernel-escape", priority: "0.9", changefreq: "weekly" },
    { path: "/#cve-2026-5502-redis-vector-injection", priority: "0.9", changefreq: "weekly" },
    { path: "/#sovereign-grade-infrastructure-definition", priority: "0.85", changefreq: "weekly" },
    { path: "/#fixed-price-dev-packages", priority: "0.85", changefreq: "weekly" },
    { path: "/#14-day-hardening-deliverables", priority: "0.85", changefreq: "weekly" },
    { path: "/#ai-ops-cost-reduction", priority: "0.85", changefreq: "weekly" },
    { path: "/#sovereign-code-ownership", priority: "0.85", changefreq: "weekly" },
    { path: "/#dpdp-soc2-compliance", priority: "0.85", changefreq: "weekly" },
    { path: "/#solo-retainer-sla", priority: "0.85", changefreq: "weekly" },
    { path: "/#multi-cloud-kubernetes-sovereignty", priority: "0.85", changefreq: "weekly" }
  ];

  const xmlEntries = routes.map(r => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

// Deep Search Dynamic Semantic Search & AdSense Content Quality API
app.get("/api/seo/deep-search", (req, res) => {
  const query = ((req.query.q as string) || "").toLowerCase().trim();
  
  const seoKeywordsIndex = [
    { keyword: "Zero-Day Vulnerability 2026", cve: "CVE-2026-9812", cpcScore: "High Intent", targetRoute: "/#threat-radar" },
    { keyword: "Linux Kernel eBPF Hardening", cve: "CVE-2026-9812", cpcScore: "High Intent", targetRoute: "/#threat-radar" },
    { keyword: "Multi-Cloud IAM OIDC Takeover", cve: "CVE-2026-4419", cpcScore: "High Intent", targetRoute: "/#threat-radar" },
    { keyword: "Kubernetes Ingress RCE Mitigation", cve: "CVE-2026-7721", cpcScore: "High Intent", targetRoute: "/#threat-radar" },
    { keyword: "GPU Inference Memory Escape", cve: "CVE-2026-3190", cpcScore: "High Intent", targetRoute: "/#threat-radar" },
    { keyword: "Vector Database RAG Poisoning", cve: "CVE-2026-5502", cpcScore: "High Intent", targetRoute: "/#threat-radar" },
    { keyword: "CIS Benchmark Level 2 Hardening", cve: "Standards", cpcScore: "Enterprise Tier", targetRoute: "/#services" },
    { keyword: "DPDP Act 2023 India Compliance", cve: "Statutory", cpcScore: "Enterprise Tier", targetRoute: "/#insights-faq" },
    { keyword: "AI Ops 60% GPU Cost Optimization", cve: "Compute Ops", cpcScore: "High Value", targetRoute: "/#ai-services" },
    { keyword: "14-Day Sovereign Cloud Sprint", cve: "Fixed-Price", cpcScore: "Commercial", targetRoute: "/#productised-services" }
  ];

  if (!query) {
    return res.json({
      status: "INDEX_ACTIVE",
      totalVerifiedKeywords: seoKeywordsIndex.length,
      adsenseCompliant: true,
      keywords: seoKeywordsIndex
    });
  }

  const matches = seoKeywordsIndex.filter(k => 
    k.keyword.toLowerCase().includes(query) || 
    k.cve.toLowerCase().includes(query) || 
    k.cpcScore.toLowerCase().includes(query)
  );

  return res.json({
    status: "QUERY_RESOLVED",
    query,
    matchCount: matches.length,
    keywords: matches
  });
});

// Direct Webmaster & AdSense Verification Endpoints
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nAllow: /\n\nSitemap: https://pravidhisolutions.in/sitemap.xml\n`);
});

app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.send(generateDynamicSitemap());
});

app.get("/ads.txt", (req, res) => {
  res.type("text/plain");
  res.send(`# Google AdSense ads.txt file\ngoogle.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n`);
});

app.get("/api/compliance/info", (req, res) => {
  res.json({
    entity: "Pravidhi Solutions LLP",
    jurisdiction: "Bengaluru, Karnataka, India",
    dpo_email: "legal@pravidhisolutions.in",
    contact_email: "contact@pravidhisolutions.in",
    standards: ["DPDP Act 2023", "GDPR", "CCPA", "CIS-Benchmark L2", "SOC2 Readiness"],
    adsense_ready: true,
    last_policy_update: "2026-08-20"
  });
});

// Vite middleware flow for development & static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        maxAge: "1d",
        setHeaders: (res, filePath) => {
          if (filePath.includes("/assets/")) {
            // Hashed JS & CSS chunks: cache for 1 year immutable
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else if (/\.(svg|png|jpg|jpeg|webp|ico|woff2?)$/i.test(filePath)) {
            res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
          }
        },
      })
    );
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
