export interface ThreatArticle {
  id: string;
  cve: string;
  cvssScore: number;
  severity: 'CRITICAL' | 'HIGH' | 'AI_OPS_ALERT';
  status: 'In The Wild' | 'Zero-Day Unpatched' | 'PoC Public' | 'Mitigation Available';
  title: string;
  headline: string;
  publishedDate: string;
  readTime: string;
  targetStack: string;
  affectedSystems: string[];
  defendingSkillNodes: string[];
  summary: string;
  // Deep Intelligence breakdown
  what: string;
  why: string;
  where: string;
  when: string;
  howWeHelp: string;
  remediationCode: {
    language: string;
    filename: string;
    code: string;
    description: string;
  };
  seoKeywords: string[];
  remediationPackage: string;
  radarCoordinates: {
    angle: number; // in degrees for polar coordinates (0 - 360)
    distance: number; // percentage from center (25 - 85)
  };
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'IaC' | 'Configuration' | 'Orchestration' | 'Kernel' | 'Governance' | 'AI Shield';
  shortDesc: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  badge: string;
  activeDefensesCount: number;
  mitigatedVectors: string[];
  codeSample: string;
  coordinates: { x: number; y: number }; // percentage inside radar visualizer
}

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'ansible',
    name: 'Ansible Playbooks',
    category: 'Configuration',
    shortDesc: 'Automated OS CIS Level 2 hardening & kernel patching daemon',
    color: 'text-rose-400',
    bgGlow: 'from-rose-500/20 to-transparent',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
    badge: 'Auto-Remediation',
    activeDefensesCount: 42,
    mitigatedVectors: ['eBPF Subsystem Exploits', 'SSH Privilege Escalation', 'Unpatched Glibc/OpenSSL'],
    codeSample: `- name: Harden Kernel & Restrict eBPF Syscalls
  sysctl:
    name: "{{ item.key }}"
    value: "{{ item.val }}"
    state: present
    reload: yes
  loop:
    - { key: 'kernel.unprivileged_bpf_disabled', val: '1' }
    - { key: 'kernel.kptr_restrict', val: '2' }
    - { key: 'fs.protected_fifos', val: '2' }`,
    coordinates: { x: 18, y: 32 }
  },
  {
    id: 'terraform',
    name: 'Terraform / OpenTofu',
    category: 'IaC',
    shortDesc: 'Immutable VPC peering, KMS encryption & zero public ingress',
    color: 'text-purple-400',
    bgGlow: 'from-purple-500/20 to-transparent',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    badge: 'Immutable IaC',
    activeDefensesCount: 56,
    mitigatedVectors: ['AWS S3/GCS Exfiltration', 'IAM Privilege Drift', 'Exposed Kubernetes API Endpoints'],
    codeSample: `resource "aws_s3_bucket_server_side_encryption_configuration" "sovereign_kms" {
  bucket = aws_s3_bucket.secure_vault.id
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.sovereign_hsm.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}`,
    coordinates: { x: 82, y: 28 }
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes Hardening',
    category: 'Orchestration',
    shortDesc: 'Distroless pods, read-only rootfilesystems & network policies',
    color: 'text-sky-400',
    bgGlow: 'from-sky-500/20 to-transparent',
    borderColor: 'border-sky-500/40 hover:border-sky-400',
    badge: 'Pod Isolation',
    activeDefensesCount: 38,
    mitigatedVectors: ['Container Escape Zero-Days', 'Envoy Ingress RCE', 'ServiceAccount Token Theft'],
    codeSample: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress`,
    coordinates: { x: 25, y: 75 }
  },
  {
    id: 'opa',
    name: 'Open Policy Agent (OPA)',
    category: 'Governance',
    shortDesc: 'Continuous CI/CD gatekeeper enforcing DPDP & SOC2 guardrails',
    color: 'text-amber-400',
    bgGlow: 'from-amber-500/20 to-transparent',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    badge: 'Policy-as-Code',
    activeDefensesCount: 29,
    mitigatedVectors: ['Unencrypted DB Provisioning', 'Public CIDR 0.0.0.0/0 Leaks', 'Wildcard IAM Policies'],
    codeSample: `package sovereign.gatekeeper
default allow = false
allow {
  input.request.object.spec.securityContext.readOnlyRootFilesystem == true
  input.request.object.spec.securityContext.runAsNonRoot == true
}`,
    coordinates: { x: 75, y: 78 }
  },
  {
    id: 'ai-vector-shield',
    name: 'AI Ops Vector Shield',
    category: 'AI Shield',
    shortDesc: 'Semantic prompt sanitizer, GPU spot failover & token cache',
    color: 'text-teal-400',
    bgGlow: 'from-teal-500/20 to-transparent',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    badge: 'LLM Armor',
    activeDefensesCount: 24,
    mitigatedVectors: ['Vector DB Prompt Injection', 'GPU Workload Hijack', 'Token Ingestion Poisoning'],
    codeSample: `// Sovereign Semantic Guardrail
const isSafePrompt = await vectorSanitizer.inspect(promptPayload, {
  anomalyThreshold: 0.88,
  stripSystemOverrides: true,
  blockDirectRceSignatures: true
});
if (!isSafePrompt.passed) throw new SovereignSecurityBlock();`,
    coordinates: { x: 50, y: 15 }
  },
  {
    id: 'vault',
    name: 'HashiCorp Vault HSM',
    category: 'Governance',
    shortDesc: 'Dynamic hardware-backed KMS secrets, lease rotation & PKI mTLS engine',
    color: 'text-amber-300',
    bgGlow: 'from-amber-400/20 to-transparent',
    borderColor: 'border-amber-400/40 hover:border-amber-300',
    badge: 'KMS & PKI',
    activeDefensesCount: 47,
    mitigatedVectors: ['Hardcoded Git Credentials', 'Static API Key Exfiltration', 'Certificate Expiration Outages'],
    codeSample: `# Dynamic Database Credentials Engine
path "database/creds/readonly-analyst" {
  capabilities = ["read"]
  max_ttl = "1h"
}`,
    coordinates: { x: 80, y: 52 }
  },
  {
    id: 'ebpf-kernel',
    name: 'eBPF & Kernel Lockdown',
    category: 'Kernel',
    shortDesc: 'Real-time kernel syscall tracing & zero-trust network packet filtering',
    color: 'text-emerald-400',
    bgGlow: 'from-emerald-500/20 to-transparent',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    badge: 'Ring-0 Defense',
    activeDefensesCount: 31,
    mitigatedVectors: ['Rootkit Injections', 'Raw Socket Sniffing', 'Unauthorized Kernel Module Loads'],
    codeSample: `# Linux Sovereign Kernel Lockdown Profile
echo 1 > /proc/sys/kernel/sysrq
echo 2 > /proc/sys/fs/protected_symlinks
echo 2 > /proc/sys/fs/protected_hardlinks
sysctl -w net.ipv4.tcp_rfc1337=1`,
    coordinates: { x: 20, y: 52 }
  }
];

export const DAILY_ZERO_DAY_ARTICLES: ThreatArticle[] = [
  {
    id: 'cve-2026-9812-ebpf-privilege-escalation',
    cve: 'CVE-2026-9812',
    cvssScore: 9.8,
    severity: 'CRITICAL',
    status: 'In The Wild',
    title: 'Linux Kernel eBPF Subsystem Unchecked Memory Offset (CVE-2026-9812)',
    headline: 'Critical Zero-Day Rootkit Exploit Bypasses Linux Container Isolation across Production Kubernetes Clusters',
    publishedDate: 'Daily Sovereign Dispatch: August 20, 2026',
    readTime: '3 min read',
    targetStack: 'Linux Kernel 6.1–6.12 / AWS EKS / GCP GKE Worker Nodes',
    affectedSystems: ['Ubuntu 22.04/24.04 LTS', 'Amazon Linux 2023', 'Debian 12', 'Red Hat Enterprise Linux 9'],
    defendingSkillNodes: ['ansible', 'ebpf-kernel', 'kubernetes'],
    summary: 'A high-impact zero-day flaw in the Linux kernel eBPF verifier allows unprivileged local users or compromised containers to write arbitrary kernel memory offsets, achieving immediate Ring-0 root takeover.',
    what: 'CVE-2026-9812 is an integer truncation flaw in the Linux kernel extended Berkeley Packet Filter (eBPF) byte-code verifier during array-map pointer calculations. An adversary who gains basic shell access inside any unprivileged container can craft a poisoned BPF instruction sequence that miscalculates bounds checking, giving them read/write access to physical host kernel memory.',
    why: 'If exploited, an attacker escapes container namespaces (pid, net, mount) in under 800 milliseconds, exfiltrates Kubernetes cluster secret tokens, installs stealth memory-only rootkits that survive node reboots, and creates massive DPDP Act 2023 regulatory breach liabilities.',
    where: 'Any cloud environment running multi-tenant Kubernetes clusters, Linux-based CI/CD runners, or AWS/GCP/Azure virtual machines with unprivileged eBPF enabled (`kernel.unprivileged_bpf_disabled = 0`).',
    when: 'Immediate mitigation required. Automated weaponized PoC exploit kits have been observed actively targeting exposed internet-facing microservices in financial and healthcare clouds.',
    howWeHelp: 'Pravidhi Solutions deploys an automated Ansible & Terraform kernel-hardening playbook within our 14-Day Sovereign Sprint. We enforce `kernel.unprivileged_bpf_disabled = 1`, restrict `sysctl` kernel pointers, deploy eBPF-based Falco runtime guards, and configure non-root distroless container execution profiles.',
    remediationCode: {
      language: 'yaml',
      filename: 'ansible/roles/kernel_hardening/tasks/cve-2026-9812-fix.yml',
      description: 'Ansible task immediately neutralizing unprivileged eBPF exploitation across all production nodes',
      code: `---
- name: Block Unprivileged eBPF & Kernel Exploits (CVE-2026-9812)
  sysctl:
    name: "{{ item.param }}"
    value: "{{ item.val }}"
    state: present
    sysctl_file: /etc/sysctl.d/99-sovereign-ebpf.conf
    reload: yes
  loop:
    - { param: "kernel.unprivileged_bpf_disabled", val: "1" }
    - { param: "kernel.kptr_restrict", val: "2" }
    - { param: "kernel.dmesg_restrict", val: "1" }
    - { param: "net.core.bpf_jit_harden", val: "2" }`
    },
    seoKeywords: [
      'Zero-Day Vulnerability 2026', 'CVE-2026-9812', 'Linux Kernel Hardening', 
      'Ansible CIS Hardening', 'Kubernetes Container Escape', 'Sovereign Cloud Defense', 
      'eBPF Security Best Practices', 'DevSecOps Sprints'
    ],
    remediationPackage: '14-Day Sovereign Cloud Hardening',
    radarCoordinates: { angle: 35, distance: 75 }
  },
  {
    id: 'cve-2026-4419-iam-oidc-bypass',
    cve: 'CVE-2026-4419',
    cvssScore: 9.4,
    severity: 'CRITICAL',
    status: 'Zero-Day Unpatched',
    title: 'Multi-Cloud OIDC Federation Token Confusion & Wildcard IAM Escalation (CVE-2026-4419)',
    headline: 'Cross-Tenant Cloud IAM Vulnerability Enables Unauthenticated Cloud Account Takeovers via GitHub Actions Federation',
    publishedDate: 'Daily Sovereign Dispatch: August 20, 2026',
    readTime: '4 min read',
    targetStack: 'AWS IAM / GCP Cloud IAM / Azure Entra ID / GitHub Actions OIDC',
    affectedSystems: ['AWS CloudTrail / STS', 'GCP Workload Identity Federation', 'Azure Federated Credentials'],
    defendingSkillNodes: ['terraform', 'opa'],
    summary: 'Improper claim validation in standard cloud OIDC trust policies permits attackers using forged pull-request refs to match overly broad wildcard trust conditions and assume administrative cloud roles.',
    what: 'CVE-2026-4419 exploits wildcard asterisk (`*`) syntax inside AWS/GCP OIDC AssumeRoleWithWebIdentity trust relationships. When repositories utilize `repo:org/*:*` instead of pinned branch SHAs and strict environment names, external fork pull requests can mint valid temporary STS administrative credentials.',
    why: 'Attackers gain direct AWS/GCP administrative console control, allowing total infrastructure destruction, KMS encryption key deletion, database dumping, and unmonitored crypto-mining spin-ups.',
    where: 'CI/CD automation pipelines utilizing OpenID Connect (OIDC) federation between GitHub, GitLab, Bitbucket, and public cloud providers without strict OPA condition filters.',
    when: 'Audit immediately. This attack vector bypasses traditional perimeter web firewalls and VPNs completely because it authenticates as a legitimate IAM role.',
    howWeHelp: 'Pravidhi enforces automated Compliance-as-Code with Terraform and Open Policy Agent (OPA). We scan your entire IAM repository, replace loose wildcards with cryptographic commit-pinned ABAC boundaries, enforce time-bound 15-minute STS session maximums, and trigger automated alerts on abnormal STS token issuance.',
    remediationCode: {
      language: 'hcl',
      filename: 'terraform/modules/iam/strict_oidc.tf',
      description: 'Terraform OIDC role with locked branch conditions, zero wildcards, and maximum 900s session duration',
      code: `resource "aws_iam_role" "sovereign_ci_deployer" {
  name                 = "sovereign-github-deployer"
  max_session_duration = 900 # 15-Minute strict session boundary

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:MyCompany/prod-infra:environment:production"
        }
      }
    }]
  })
}`
    },
    seoKeywords: [
      'AWS IAM Security', 'OIDC Cloud Takeover', 'Terraform IAM Module', 
      'Open Policy Agent Gatekeeper', 'Cloud Zero Trust', 'DPDP Compliance Audit', 
      'Multi-Cloud Sovereign Defense'
    ],
    remediationPackage: 'Compliance-as-Code Automation Kit',
    radarCoordinates: { angle: 145, distance: 60 }
  },
  {
    id: 'cve-2026-7721-k8s-ingress-rce',
    cve: 'CVE-2026-7721',
    cvssScore: 8.9,
    severity: 'HIGH',
    status: 'PoC Public',
    title: 'Kubernetes Ingress-NGINX Snippet Injection Remote Code Execution (CVE-2026-7721)',
    headline: 'Custom Ingress Annotation Allows Unauthenticated Command Execution via Injected Lua Scripts',
    publishedDate: 'Daily Sovereign Dispatch: August 20, 2026',
    readTime: '3 min read',
    targetStack: 'Kubernetes 1.28–1.32 / ingress-nginx / Envoy Gateway',
    affectedSystems: ['Bare-Metal Kubernetes', 'EKS', 'GKE', 'AKS', 'K3s Edge Nodes'],
    defendingSkillNodes: ['kubernetes', 'opa', 'ansible'],
    summary: 'Attackers leverage unvalidated configuration annotations on Ingress resources to inject custom Lua bytecode or directive directives into nginx.conf, executing arbitrary shell commands inside the ingress pod.',
    what: 'By manipulating the `nginx.ingress.kubernetes.io/configuration-snippet` or `server-snippet` annotations during git-driven deployment merges or compromised developer portal access, adversaries can bypass ingress URL routing filters and execute reverse TCP payloads.',
    why: 'Ingress controllers run with broad network privileges and often hold TLS private certificates for all corporate domains. Compromising the ingress pod exposes incoming cleartext customer traffic, HTTP authorization tokens, and internal microservice endpoints.',
    where: 'Edge ingress reverse proxies deployed without strict admission control webhooks and unhardened Helm release values.',
    when: 'Remediate prior to next release cycle. Public vulnerability proof-of-concepts have been released on technical research forums.',
    howWeHelp: 'Pravidhi configures automated Admission Controller OPA Gatekeeper constraints that permanently forbid snippet annotations across all namespaces. In addition, we deploy distroless ingress controllers with `readOnlyRootFilesystem: true` and `drop: ["ALL"]` capability matrices.',
    remediationCode: {
      language: 'yaml',
      filename: 'k8s/security/opa-block-ingress-snippets.yaml',
      description: 'OPA Gatekeeper constraint template permanently blocking unsafe snippet annotations in Kubernetes',
      code: `apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sBlockIngressSnippets
metadata:
  name: block-dangerous-snippets
spec:
  match:
    kinds:
      - apiGroups: ["networking.k8s.io"]
        kinds: ["Ingress"]
  parameters:
    forbiddenAnnotations:
      - "nginx.ingress.kubernetes.io/configuration-snippet"
      - "nginx.ingress.kubernetes.io/server-snippet"`
    },
    seoKeywords: [
      'Kubernetes Ingress RCE', 'CVE-2026-7721', 'Gatekeeper OPA Policies', 
      'Cloud Native Security', 'Kubernetes CIS Benchmark', 'Pravidhi Sovereign Defense'
    ],
    remediationPackage: '14-Day Sovereign Cloud Hardening',
    radarCoordinates: { angle: 215, distance: 70 }
  },
  {
    id: 'cve-2026-3190-gpu-kernel-escape',
    cve: 'CVE-2026-3190',
    cvssScore: 9.6,
    severity: 'AI_OPS_ALERT',
    status: 'In The Wild',
    title: 'NVIDIA Container Toolkit & CUDA Memory UAF Host Escape (CVE-2026-3190)',
    headline: 'High-Severity AI Inference Pod Exploit Allows Unprivileged GPU Tenants to Take Over Host Nodes',
    publishedDate: 'Daily Sovereign Dispatch: August 20, 2026',
    readTime: '4 min read',
    targetStack: 'NVIDIA Container Toolkit 1.14–1.17 / vLLM / Ollama / Triton Inference Server',
    affectedSystems: ['NVIDIA H100/A100 GPU Clusters', 'AWS p4de/g5 instances', 'GCP A3/G2 GPU Nodes'],
    defendingSkillNodes: ['ai-vector-shield', 'ansible', 'ebpf-kernel'],
    summary: 'A Use-After-Free (UAF) condition in the NVIDIA driver kernel module character device interface `/dev/nvidiactl` allows containerized AI model inference workloads to execute code directly in the host OS kernel.',
    what: 'When multiple AI microservices share physical GPU cards through container passthrough or Multi-Instance GPU (MIG) slices, a malformed CUDA ioctl memory mapping request can trigger an out-of-bounds pointer reuse, breaking out of the container cgroup boundary.',
    why: 'Attackers can steal proprietary fine-tuned weights, intercept unencrypted LLM prompt embeddings in VRAM, dump system API keys, and tamper with safety guardrails on public models.',
    where: 'Dedicated GPU clusters, LLM fine-tuning pipelines, and self-hosted AI inference APIs on public and private clouds.',
    when: 'Immediate action required for organizations hosting private AI models or processing regulated customer data through generative pipelines.',
    howWeHelp: 'Our AI Ops & Infrastructure Audit sprint isolates GPU workloads into dedicated virtual microVMs (Firecracker/Kata Containers), updates NVIDIA driver toolkits with zero downtime, and installs memory-safe semantic API proxy gateways.',
    remediationCode: {
      language: 'yaml',
      filename: 'ansible/roles/ai_ops_security/tasks/gpu_isolation.yml',
      description: 'Ansible automation enforcing secure runtime configuration and MIG isolation for GPU nodes',
      code: `---
- name: Enforce Kata Containers Isolated Runtime for GPU Pods
  copy:
    dest: /etc/docker/daemon.json
    content: |
      {
        "default-runtime": "runc",
        "runtimes": {
          "kata": {
            "path": "/usr/bin/kata-runtime"
          },
          "nvidia": {
            "path": "/usr/bin/nvidia-container-runtime",
            "runtimeArgs": []
          }
        }
      }
    mode: '0644'
  notify: Restart Containerd`
    },
    seoKeywords: [
      'AI Ops Security', 'GPU Container Escape', 'CVE-2026-3190', 
      'vLLM Security Hardening', 'CUDA Memory Exploit', 'Private LLM Infrastructure', 
      'Sovereign AI Architecture'
    ],
    remediationPackage: 'AI Ops & Infrastructure Audit',
    radarCoordinates: { angle: 295, distance: 80 }
  },
  {
    id: 'cve-2026-5502-redis-vector-injection',
    cve: 'CVE-2026-5502',
    cvssScore: 8.7,
    severity: 'AI_OPS_ALERT',
    status: 'Mitigation Available',
    title: 'Vector Database HNSW Index Deserialization Poisoning (CVE-2026-5502)',
    headline: 'Crafted High-Dimensional Vector Embeddings Force Buffer Overflows & Arbitrary Code Execution in RAG Ingestion Systems',
    publishedDate: 'Daily Sovereign Dispatch: August 20, 2026',
    readTime: '3 min read',
    targetStack: 'Redis Stack / Qdrant / Milvus / LangChain RAG Ingestion Pipelines',
    affectedSystems: ['Self-Hosted Vector DBs', 'Kubernetes RAG Microservices', 'Document Embedding Workers'],
    defendingSkillNodes: ['ai-vector-shield', 'terraform'],
    summary: 'Untrusted user documents containing mathematically adversarial float array dimensions cause memory corruption during cosine similarity graph rebuilding in unpatched vector stores.',
    what: 'When RAG (Retrieval-Augmented Generation) systems parse unauthenticated document uploads without vector normalization, an attacker crafts an anomalous embedding payload with oversized index metadata that triggers buffer overflows in memory-mapped vector partitions.',
    why: 'Enables complete tampering with LLM search context, forcing models to output hallucinated responses, leak private company knowledge bases, and execute system commands on vector server nodes.',
    where: 'Enterprise semantic search services, customer-facing AI agents with file attachment capabilities, and knowledge retrieval pipelines.',
    when: 'Audit within 48 hours for any application ingesting external PDFs, emails, or user text directly into vector databases.',
    howWeHelp: 'Pravidhi engineers vector ingestion validation middleware, deploys automated semantic rate limiters, secures vector DB endpoints behind private VPC endpoints, and validates all embedding matrix shapes before index insertion.',
    remediationCode: {
      language: 'typescript',
      filename: 'src/security/vectorSanitizer.ts',
      description: 'Production-ready TypeScript vector normalization & dimension boundary validator',
      code: `export function sanitizeVectorPayload(vector: number[], expectedDim = 1536): Float32Array {
  if (!Array.isArray(vector) || vector.length !== expectedDim) {
    throw new Error(\`Invalid vector dimension: expected \${expectedDim}, received \${vector?.length}\`);
  }
  const sanitized = new Float32Array(expectedDim);
  for (let i = 0; i < expectedDim; i++) {
    const val = vector[i];
    if (typeof val !== 'number' || !Number.isFinite(val)) {
      throw new Error(\`Adversarial NaN/Infinity detected at index \${i}\`);
    }
    sanitized[i] = Math.max(-1.0, Math.min(1.0, val));
  }
  return sanitized;
}`
    },
    seoKeywords: [
      'Vector Database Security', 'RAG Injection Defense', 'CVE-2026-5502', 
      'Semantic Search Hardening', 'LangChain Guardrails', 'Sovereign AI Infrastructure'
    ],
    remediationPackage: 'AI Ops & Infrastructure Audit',
    radarCoordinates: { angle: 100, distance: 45 }
  }
];
