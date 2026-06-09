import type { ComponentType, SVGProps } from "react";
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Cloud,
  Database,
  Factory,
  GitBranch,
  Layers3,
  Mail,
  Network,
  Presentation,
  Workflow,
} from "lucide-react";

export type Skill = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  unlockWhen?: string[];
};

export type TimelineStage = {
  id: string;
  period: string;
  title: string;
  organization: string;
  shortStory: string;
  unlockedSkills: string[];
  hardSkills: string[];
  softSkills: string[];
  highlights: string[];
  gameObject: string;
  unlockLabel: string;
  accent: string;
};

export const profile = {
  name: "Ong Kim Hoo",
  shortName: "Kim Hoo",
  positioning: "Data & BI Expert · Trainer · Product-minded Builder",
  heroDescription:
    "I turn messy business processes into clear dashboards, smart automation, and practical digital solutions.",
  heroSupport:
    "I'm curious about technology, love hands-on learning, and believe consistent effort can turn any skill into a strength.",
};

export const navItems = ["About", "Skills", "Projects", "Journey", "Contact"];

export const socialLinks = [
  { label: "GitHub", href: "#", icon: GitBranch },
  { label: "LinkedIn", href: "#", icon: Network },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export const skills: Skill[] = [
  { name: "SQL", icon: Database, color: "sky" },
  { name: "Power BI", icon: ChartNoAxesCombined, color: "amber" },
  { name: "DAX", icon: BrainCircuit, color: "yellow" },
  {
    name: "Power Query",
    icon: Workflow,
    color: "emerald",
    unlockWhen: ["Power Query", "M Query"],
  },
  { name: "Python", icon: Bot, color: "orange" },
  { name: "Power Automate", icon: Workflow, color: "blue" },
  { name: "Azure", icon: Cloud, color: "cyan" },
  {
    name: "Fabric",
    icon: Factory,
    color: "lime",
    unlockWhen: ["Fabric", "Microsoft Fabric"],
  },
  { name: "Snowflake", icon: Cloud, color: "sky" },
  {
    name: "Data Modeling",
    icon: Layers3,
    color: "indigo",
    unlockWhen: ["Data Modeling", "Data Modelling"],
  },
  { name: "ETL", icon: Network, color: "violet" },
  {
    name: "Business Process",
    icon: BriefcaseBusiness,
    color: "amber",
    unlockWhen: [
      "Business Process",
      "Business Process Digitalisation",
    ],
  },
  {
    name: "Training",
    icon: Presentation,
    color: "purple",
    unlockWhen: ["Training", "Training Design"],
  },
  {
    name: "AI Tools",
    icon: BrainCircuit,
    color: "yellow",
    unlockWhen: [
      "AI Tools",
      "Claude Code",
      "Codex",
      "Prompt Engineering",
      "AI-assisted Development",
    ],
  },
  {
    name: "Product Thinking",
    icon: BadgeCheck,
    color: "emerald",
    unlockWhen: ["Product Thinking", "Solution Design", "Self-Learning"],
  },
];

export const timelineStages: TimelineStage[] = [
  {
    id: "university",
    period: "2017–2021",
    title: "University Foundation",
    organization: "University of Malaya",
    shortStory:
      "Built my foundation in coding, AI, data, and pitching through academic projects and competitions.",
    unlockedSkills: [
      "Java",
      "Python",
      "SQL",
      "Tableau",
      "AI Fundamentals",
      "Pitching",
      "Leadership",
    ],
    hardSkills: [
      "Java",
      "Python",
      "SQL",
      "Tableau",
      "Software Engineering",
      "AI Fundamentals",
      "Data Preparation",
      "Data Mining",
      "Data Modelling",
      "Model Evaluation",
      "Word Documentation",
      "Excel Documentation",
    ],
    softSkills: [
      "Leadership",
      "Pitching",
      "Presentation",
      "Problem Solving",
      "Team Coordination",
      "Self-learning",
    ],
    highlights: [
      "HSBC Hackathon — 2nd Runner-Up, Leader",
      "The Hult Prize — Campus 2nd Runner-Up, Leader",
      "Axiata Datathon — Involvement, Leader",
      "SAS Fintech Challenge — Involvement",
    ],
    gameObject: "graduation",
    unlockLabel: "Foundation Unlocked",
    accent: "#3f6ddf",
  },
  {
    id: "business-exchange",
    period: "2019",
    title: "Business Exchange Chapter",
    organization: "Nanyang Business School",
    shortStory:
      "Expanded my business perspective through taxation, investment, and leadership fundamentals.",
    unlockedSkills: [
      "Business Thinking",
      "Investment Basics",
      "Taxation Fundamentals",
      "Leadership Management",
    ],
    hardSkills: [
      "Taxation Fundamentals",
      "Investment Fundamentals",
      "Business Concepts",
    ],
    softSkills: [
      "Leadership Management",
      "Business Thinking",
      "Commercial Awareness",
      "Strategic Thinking",
      "Decision Making",
    ],
    highlights: ["Exchange chapter at Nanyang Technological University"],
    gameObject: "scroll",
    unlockLabel: "Business Lens Unlocked",
    accent: "#c0842f",
  },
  {
    id: "bi-builder",
    period: "2021–2023",
    title: "Data & BI Builder",
    organization: "Fraser & Neave",
    shortStory:
      "Turned raw business data into dashboards, automation workflows, and decision-support reports.",
    unlockedSkills: [
      "Power BI",
      "DAX",
      "M Query",
      "Power Automate",
      "Talend",
      "BigQuery",
      "SharePoint",
      "ETL",
    ],
    hardSkills: [
      "Power BI",
      "DAX",
      "Power Query / M Query",
      "Power Automate",
      "Talend",
      "BigQuery",
      "Vertex AI",
      "SharePoint",
      "Dashboard Development",
      "Reporting Automation",
      "Data Modeling",
      "ETL",
      "KPI Design",
      "Report Optimization",
      "Data Validation",
      "Workflow Automation",
    ],
    softSkills: [
      "Business Requirement Gathering",
      "User Support",
      "Process Understanding",
      "Data Storytelling",
      "Attention to Detail",
    ],
    highlights: ["Built practical BI and automation workflows for business teams"],
    gameObject: "dashboard",
    unlockLabel: "BI Builder Mode",
    accent: "#5c8d4a",
  },
  {
    id: "digital-transformation",
    period: "2023–2025",
    title: "Digital Transformation Expert",
    organization: "Nestlé",
    shortStory:
      "Worked across business and technology teams to digitalise processes, automate reporting, and build scalable data solutions.",
    unlockedSkills: [
      "Azure",
      "Fabric",
      "Snowflake",
      "Stakeholder Management",
      "Business Process Digitalisation",
      "Internal Training",
    ],
    hardSkills: [
      "Azure",
      "Microsoft Fabric",
      "Snowflake",
      "Power BI",
      "Dashboard Development",
      "Reporting Automation",
      "Business Process Digitalisation",
      "Data Platform Integration",
      "Data Governance",
      "Solution Design",
      "Process Mapping",
    ],
    softSkills: [
      "Cross-functional Collaboration",
      "Stakeholder Management",
      "Internal Training",
      "Facilitation",
      "Requirement Analysis",
      "Change Management",
      "User Adoption",
      "Business Analysis",
      "Project Coordination",
    ],
    highlights: ["Connected process, people, and platforms into scalable solutions"],
    gameObject: "platform",
    unlockLabel: "Digital Transformation Unlocked",
    accent: "#8364d3",
  },
  {
    id: "certified-trainer",
    period: "2026",
    title: "Certified Trainer",
    organization: "HRDF Accredited & Certified",
    shortStory:
      "Strengthened my ability to design, prepare, and deliver structured training sessions for technical and business audiences.",
    unlockedSkills: [
      "Training Design",
      "Facilitation",
      "Advanced Presentation",
      "Knowledge Transfer",
    ],
    hardSkills: [
      "Training Preparation",
      "Training Management",
      "Course Structuring",
      "Presentation Design",
      "Learning Material Development",
      "Workshop Design",
      "Knowledge Transfer",
    ],
    softSkills: [
      "Facilitation",
      "Public Speaking",
      "Audience Engagement",
      "Coaching",
      "Communication",
      "Storytelling",
    ],
    highlights: ["HRDF Accredited & Certified"],
    gameObject: "badge",
    unlockLabel: "Trainer Badge Earned",
    accent: "#dc5169",
  },
  {
    id: "ai-trading",
    period: "2026+",
    title: "AI & Trading Self-Learning Chapter",
    organization: "Gap Year / Self-Learning",
    shortStory:
      "Exploring AI development tools, coding agents, and trading methodology to sharpen technical creativity and analytical discipline.",
    unlockedSkills: [
      "Claude Code",
      "Codex",
      "Prompt Engineering",
      "TradingView",
      "Al Brooks Methodology",
      "Self-Learning",
    ],
    hardSkills: [
      "Claude Code",
      "Codex",
      "AI-assisted Development",
      "TradingView",
      "Al Brooks Trading Methodology",
      "Prompt Engineering",
      "Rapid Prototyping",
      "AI Workflow Design",
      "Technical Exploration",
      "Market Structure Analysis",
    ],
    softSkills: [
      "Independent Learning",
      "Discipline",
      "Pattern Recognition",
      "Decision Making",
      "Experimentation",
      "Consistency",
      "Risk Thinking",
    ],
    highlights: ["Next chapter focused on technical creativity and analytical discipline"],
    gameObject: "portal",
    unlockLabel: "Next Chapter Loading",
    accent: "#2aa7a2",
  },
];

export const currentlyLearning = [
  "Claude Code",
  "Codex",
  "Prompt Engineering",
  "AI Workflow Design",
  "TradingView",
  "Al Brooks Methodology",
];

export const fullSkillGroups = [
  {
    title: "Data & BI",
    skills: [
      "Power BI",
      "DAX",
      "Power Query",
      "SQL",
      "Tableau",
      "Dashboard Development",
      "Data Modeling",
      "KPI Design",
      "Report Optimization",
      "Data Validation",
    ],
  },
  {
    title: "Automation & Data Engineering",
    skills: [
      "Power Automate",
      "Talend",
      "BigQuery",
      "Azure",
      "Microsoft Fabric",
      "Snowflake",
      "ETL",
      "SharePoint",
      "Data Platform Integration",
      "Workflow Automation",
    ],
  },
  {
    title: "AI & Technical Exploration",
    skills: [
      "Python",
      "Vertex AI",
      "Claude Code",
      "Codex",
      "AI-assisted Development",
      "Prompt Engineering",
      "Data Mining",
      "Data Preparation",
      "Model Evaluation",
    ],
  },
  {
    title: "Business & People Skills",
    skills: [
      "Business Process Digitalisation",
      "Stakeholder Management",
      "Cross-functional Collaboration",
      "Training",
      "Facilitation",
      "Presentation",
      "Pitching",
      "Leadership",
      "Business Analysis",
      "Change Management",
      "User Adoption",
    ],
  },
  {
    title: "Trading & Analytical Thinking",
    skills: [
      "TradingView",
      "Al Brooks Trading Methodology",
      "Market Structure Analysis",
      "Pattern Recognition",
      "Risk Thinking",
      "Decision Making",
      "Discipline",
      "Consistency",
    ],
  },
];
