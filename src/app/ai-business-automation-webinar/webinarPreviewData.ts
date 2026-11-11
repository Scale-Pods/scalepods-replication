export type PreviewCategory = "track" | "partner" | "founder" | "curriculum";

export interface WebinarPreviewItem {
  id: string;
  category: PreviewCategory;
  badge: string;
  accent: "green" | "blue" | "claude";
  title: string;
  subtitle: string;
  summary: string;
  highlightsTitle: string;
  highlights: string[];
  outcomeNote: string;
  ctaLabel: string;
  rolePrefill?: string;
}

export const WEBINAR_PREVIEW_ITEMS: Record<string, WebinarPreviewItem> = {
  // ── Fold 3: Leadership Role Tracks ──────────────────────────────────────────
  "track-owners": {
    id: "track-owners",
    category: "track",
    badge: "TRACK PREVIEW • LEADERSHIP",
    accent: "green",
    title: "Business Owners & Founders",
    subtitle: "Scale operations cleanly without linear headcount growth",
    summary:
      "See how founder-led teams audit hidden manual bottlenecks across departments and deploy interconnected AI workflows that keep running reliably as volume grows.",
    highlightsTitle: "Live Workflows Covered in This Session",
    highlights: [
      "Identify your top 3 repetitive operational drains using the Priority & Effort Matrix",
      "Replace scattered spreadsheets and manual approvals with unified workflow pipelines",
      "Set clear human-in-the-loop checkpoints so critical decisions stay under founder control",
    ],
    outcomeNote: "Walk away with a prioritized automation roadmap tailored to your company size.",
    ctaLabel: "Reserve Seat for Founders Track (₹99)",
    rolePrefill: "Business Owner / Founder",
  },
  "track-sales": {
    id: "track-sales",
    category: "track",
    badge: "TRACK PREVIEW • REVENUE SYSTEMS",
    accent: "green",
    title: "Sales Leaders",
    subtitle: "Sub-60s lead response & structured CRM qualification",
    summary:
      "Learn how high-velocity sales teams eliminate manual CRM data entry and dropped leads by automating instant qualification, routing, and follow-up cadences.",
    highlightsTitle: "Live Workflows Covered in This Session",
    highlights: [
      "Instant (< 60s) inbound lead capture, enrichment, and qualification routing",
      "Automated follow-up sequences triggered by CRM pipeline stage and prospect intent",
      "Real-time deal hygiene and daily pipeline summaries without manual CRM updates",
    ],
    outcomeNote: "Designed for consistent lead handling without increasing SDR/sales ops headcount.",
    ctaLabel: "Reserve Seat for Sales Track (₹99)",
    rolePrefill: "Sales Leader",
  },
  "track-marketing": {
    id: "track-marketing",
    category: "track",
    badge: "TRACK PREVIEW • GROWTH ENGINE",
    accent: "green",
    title: "Marketing Leaders",
    subtitle: "Connected campaigns, lead handoff & trackable attribution",
    summary:
      "Bridge the gap between campaign execution, AI-assisted content workflows, and sales handoff so leads never stall between ad click and booked conversation.",
    highlightsTitle: "Live Workflows Covered in This Session",
    highlights: [
      "End-to-end campaign lead capture synced directly into qualification and nurturing flows",
      "Structured AI content repurposing pipelines guided by brand context and guardrails",
      "Automated weekly campaign performance digests pulled across ad and CRM sources",
    ],
    outcomeNote: "Move from disconnected marketing tools to measurable, connected execution.",
    ctaLabel: "Reserve Seat for Marketing Track (₹99)",
    rolePrefill: "Marketing Leader",
  },
  "track-hr": {
    id: "track-hr",
    category: "track",
    badge: "TRACK PREVIEW • PEOPLE OPS",
    accent: "green",
    title: "HR & Recruitment Leaders",
    subtitle: "Cut hiring turnaround times & eliminate screening bottlenecks",
    summary:
      "Automate repetitive resume triage, interview scheduling coordination, and candidate updates while keeping final hiring judgment firmly in human hands.",
    highlightsTitle: "Live Workflows Covered in This Session",
    highlights: [
      "Structured AI-assisted candidate screening against role criteria without manual PDF sorting",
      "Automated interview slot coordination, reminders, and stage status updates",
      "Seamless candidate-to-onboarding task triggers once an offer is accepted",
    ],
    outcomeNote: "Give your recruiters back hours each week to spend on top candidates.",
    ctaLabel: "Reserve Seat for HR Track (₹99)",
    rolePrefill: "HR & Recruitment Leader",
  },
  "track-ops": {
    id: "track-ops",
    category: "track",
    badge: "TRACK PREVIEW • EXECUTION",
    accent: "green",
    title: "Operations Managers",
    subtitle: "Eliminate manual data entry, handoff delays & blind spots",
    summary:
      "Turn fragmented inbox approvals, spreadsheets, and multi-system handovers into reliable, auditable workflows with real-time operational visibility.",
    highlightsTitle: "Live Workflows Covered in This Session",
    highlights: [
      "Document and data extraction workflows that sync records cleanly across existing tools",
      "Cross-department task handover triggers with automatic status tracking and escalations",
      "Exception-based reporting so managers focus only on bottlenecks that need attention",
    ],
    outcomeNote: "Integrate directly with your existing business stack without breaking daily operations.",
    ctaLabel: "Reserve Seat for Operations Track (₹99)",
    rolePrefill: "Operations Manager",
  },
  "track-entrepreneurs": {
    id: "track-entrepreneurs",
    category: "track",
    badge: "TRACK PREVIEW • PRACTICAL AI",
    accent: "green",
    title: "Entrepreneurs & Professionals",
    subtitle: "Practical, ROI-first workflow systems—zero coding required",
    summary:
      "Skip the random tool lists and prompt hype. Understand the exact architecture behind reliable business automations you can map and apply immediately.",
    highlightsTitle: "Live Workflows Covered in This Session",
    highlights: [
      "How inputs, rules, AI reasoning steps, and system actions fit into one clean workflow",
      "When to use deterministic automation vs. LLM reasoning vs. human sign-off",
      "Live walkthroughs of practical workflows you can adapt to your own business model",
    ],
    outcomeNote: "Focused 100% on real operational ROI with plain-English systems thinking.",
    ctaLabel: "Reserve Your Seat (₹99)",
    rolePrefill: "Entrepreneur / Professional",
  },

  // ── Fold 2: Certified AI Partners ───────────────────────────────────────────
  "partner-claude": {
    id: "partner-claude",
    category: "partner",
    badge: "OFFICIAL AI PARTNER • ANTHROPIC",
    accent: "claude",
    title: "Claude by Anthropic Architecture",
    subtitle: "Complex reasoning, long-context document analysis & safe execution",
    summary:
      "During the masterclass, you will see how ScalePods deploys Claude inside production workflows that require nuanced judgment, structured extraction, and strict operational guardrails.",
    highlightsTitle: "Where Claude Powers Production Workflows",
    highlights: [
      "Deep analysis of contracts, resumes, proposals, and unstructured client briefs",
      "Multi-step reasoning chains with structured JSON outputs for reliable downstream triggers",
      "Enterprise-grade safety boundaries for customer-facing and internal operations flows",
    ],
    outcomeNote: "Includes partner framework certification concepts covered live in the session.",
    ctaLabel: "Join Live Masterclass (₹99)",
  },
  "partner-openai": {
    id: "partner-openai",
    category: "partner",
    badge: "OFFICIAL AI PARTNER • OPENAI",
    accent: "blue",
    title: "OpenAI Production Workflows",
    subtitle: "High-speed classification, multimodal pipelines & system integration",
    summary:
      "Discover how ScalePods pairs OpenAI models with APIs and webhooks to handle high-volume triage, instant lead engagement, and seamless multi-tool synchronization.",
    highlightsTitle: "Where OpenAI Powers Production Workflows",
    highlights: [
      "Fast lead qualification, inbox intent triage, and CRM enrichment in under 60 seconds",
      "Multimodal document, voice note, and image-to-structured-record automation pipelines",
      "Reliable API orchestration connecting marketing, sales, and support tools seamlessly",
    ],
    outcomeNote: "See how both Business Brain and Technology Brain approaches complement each model.",
    ctaLabel: "Join Live Masterclass (₹99)",
  },

  // ── Fold 1: Founders / Hosts ────────────────────────────────────────────────
  "founder-adnan": {
    id: "founder-adnan",
    category: "founder",
    badge: "HOST PROFILE • BUSINESS BRAIN",
    accent: "green",
    title: "Adnan Shaikh",
    subtitle: "Co-Founder & CEO, ScalePods • Sales & Revenue OS",
    summary:
      "Adnan leads the business strategy perspective of the masterclass—helping founders and department heads pinpoint where revenue leaks and manual bottlenecks slow down growth.",
    highlightsTitle: "What Adnan Covers in the Live Session",
    highlights: [
      "Auditing high-friction tasks across Sales, Marketing, and Revenue Operations",
      "Connecting automated lead follow-up and qualification directly to pipeline revenue",
      "Prioritizing quick-win automations based on business ROI rather than tech hype",
    ],
    outcomeNote: "Live Q&A with Adnan included during the masterclass.",
    ctaLabel: "Learn Live with Adnan (₹99)",
  },
  "founder-raunak": {
    id: "founder-raunak",
    category: "founder",
    badge: "HOST PROFILE • TECHNOLOGY BRAIN",
    accent: "blue",
    title: "Raunak Kumar",
    subtitle: "Co-Founder, CTO & CPO, ScalePods • Enterprise AI & Architecture",
    summary:
      "Raunak translates business bottlenecks into dependable system architectures—demonstrating live how disconnected tools connect safely using modern AI partner frameworks.",
    highlightsTitle: "What Raunak Covers in the Live Session",
    highlights: [
      "Blueprint of the 4-layer workflow engine (Triggers, Rules, AI Reasoning, Actions)",
      "Hands-on system walkthroughs with OpenAI & Claude partner frameworks—no code needed",
      "Integrating automation safely into your existing stack without breaking operations",
    ],
    outcomeNote: "Live architecture Q&A with Raunak included during the masterclass.",
    ctaLabel: "Learn Live with Raunak (₹99)",
  },

  // ── Fold 6: 6-Module Curriculum Breakdown ───────────────────────────────────
  "curriculum-start": {
    id: "curriculum-start",
    category: "curriculum",
    badge: "CURRICULUM MODULE 01",
    accent: "green",
    title: "Where to Start",
    subtitle: "Recognize repetitive, rule-based tasks primed for automation",
    summary:
      "Stop guessing where AI fits. Learn a repeatable audit checklist to spot high-volume, copy-paste, and rule-based tasks holding back your team today.",
    highlightsTitle: "Key Takeaways from Module 01",
    highlights: [
      "The 5-signal checklist that separates automatable busywork from strategic human work",
      "Examples across Sales inbox triage, HR screening, and Ops status handovers",
      "Common traps that cause teams to automate the wrong process first",
    ],
    outcomeNote: "Immediate clarity on your first high-impact automation candidate.",
    ctaLabel: "Unlock Full 6-Part Masterclass (₹99)",
  },
  "curriculum-prioritize": {
    id: "curriculum-prioritize",
    category: "curriculum",
    badge: "CURRICULUM MODULE 02",
    accent: "blue",
    title: "What to Prioritize",
    subtitle: "Evaluate by business impact, frequency, time spent & effort",
    summary:
      "Not every workflow should be built first. Score automation candidates using ScalePods' Impact vs. Effort framework to ship measurable wins fast.",
    highlightsTitle: "Key Takeaways from Module 02",
    highlights: [
      "Weighted scoring across time saved, error reduction, revenue speed, and setup effort",
      "Separating quick-win workflows (ship in days) from deeper cross-team integrations",
      "How to build team momentum before tackling complex operational overhauls",
    ],
    outcomeNote: "Leaves you with a ranked sequence instead of an overwhelming wish list.",
    ctaLabel: "Unlock Full 6-Part Masterclass (₹99)",
  },
  "curriculum-connect": {
    id: "curriculum-connect",
    category: "curriculum",
    badge: "CURRICULUM MODULE 03",
    accent: "green",
    title: "How Workflows Connect",
    subtitle: "Unify inputs, decisions, systems & follow-up actions cleanly",
    summary:
      "Individual tools don't create scale—connected workflows do. See how triggers, routing logic, AI processing, and downstream actions lock together seamlessly.",
    highlightsTitle: "Key Takeaways from Module 03",
    highlights: [
      "Mapping end-to-end data flow from customer or internal form trigger to final record sync",
      "Preventing dropped handoffs between Marketing, Sales, HR, and Operations",
      "Designing fallback alerts so broken webhooks or edge cases are caught automatically",
    ],
    outcomeNote: "Turns siloed software subscriptions into one cohesive operating system.",
    ctaLabel: "Unlock Full 6-Part Masterclass (₹99)",
  },
  "curriculum-ai-value": {
    id: "curriculum-ai-value",
    category: "curriculum",
    badge: "CURRICULUM MODULE 04",
    accent: "blue",
    title: "Where AI Adds Value",
    subtitle: "Distinguish rules vs. AI reasoning vs. human oversight",
    summary:
      "Overusing AI makes workflows brittle; underusing it limits ROI. Learn the exact boundary between deterministic rules, LLM intelligence, and human approval.",
    highlightsTitle: "Key Takeaways from Module 04",
    highlights: [
      "Using classic deterministic rules for exact routing, math, and status syncing",
      "Deploying Claude & OpenAI for summarization, classification, and unstructured data",
      "Embedding human review gates on high-stakes client or financial outputs",
    ],
    outcomeNote: "Build reliable workflows your leadership team can actually trust in production.",
    ctaLabel: "Unlock Full 6-Part Masterclass (₹99)",
  },
  "curriculum-integrate": {
    id: "curriculum-integrate",
    category: "curriculum",
    badge: "CURRICULUM MODULE 05",
    accent: "green",
    title: "How to Approach Integration",
    subtitle: "Connect automation into your existing stack without disruption",
    summary:
      "You don't need to rip and replace your CRM, email, or spreadsheets. See how ScalePods layers automation around tools your team already uses daily.",
    highlightsTitle: "Key Takeaways from Module 05",
    highlights: [
      "Connecting CRMs, forms, spreadsheets, Slack/WhatsApp, and email cleanly",
      "Rolling out workflows in parallel without halting live customer or internal operations",
      "Security, data access, and reliability standards for enterprise readiness",
    ],
    outcomeNote: "Zero-disruption rollout blueprint designed for real business teams.",
    ctaLabel: "Unlock Full 6-Part Masterclass (₹99)",
  },
  "curriculum-next": {
    id: "curriculum-next",
    category: "curriculum",
    badge: "CURRICULUM MODULE 06",
    accent: "blue",
    title: "What to Do Next",
    subtitle: "Identify immediate opportunities across Sales, Marketing, HR & Ops",
    summary:
      "Close the 2-day session with a concrete action plan covering the exact workflows to map on Monday morning across every core department.",
    highlightsTitle: "Key Takeaways from Module 06",
    highlights: [
      "Ready-to-adapt starter workflow patterns for Sales, Marketing, HR, and Operations",
      "How to scope internal ownership vs. partner implementation support",
      "Live Q&A with Adnan & Raunak to stress-test your specific business use case",
    ],
    outcomeNote: "Walk out ready to deploy real AI workflow systems immediately.",
    ctaLabel: "Unlock Full 6-Part Masterclass (₹99)",
  },
};

