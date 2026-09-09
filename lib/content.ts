/**
 * Central content source for AVD 360 Solution.
 * All company facts live here so pages/components stay consistent.
 */

/**
 * Brand logo asset path.
 * Default: the generated `/logo.svg` placeholder that matches the brand.
 * To use the real artwork, place `logo.jpeg` in /public and change this to
 * "/logo.jpeg".
 */
export const logoSrc = "/logo.jpeg";

export const company = {
  name: "AVD 360 Solution",
  tagline: "Elevating Business Performance",
  subTagline: "Not Just Software. A System. A Solution.",
  positioning:
    "Consulting • Business Excellence • Quality Management • ISO Management • Digital Transformation",
  strapline: "One System. Connected Processes. Better Control.",
  philosophy: "PEOPLE + PROCESS + TECHNOLOGY = EXCELLENCE",
  closingCta: "Let's Build Smarter Businesses Together.",
  phone: "+91 96629 86211",
  phoneHref: "tel:+919662986211",
  email: "jainishpatel772@gmail.com",
  emailHref: "mailto:jainishpatel772@gmail.com",
} as const;

export const aboutCopy = {
  intro:
    "AVD 360 Solution is an integrated Business Excellence and Digital Transformation company. It helps organizations improve operational efficiency, strengthen management systems, and achieve sustainable business growth through practical consulting and smart digital solutions.",
  approach:
    "Our approach connects People, Process and Technology to provide better control, real-time visibility, standardized processes and measurable performance improvement.",
  commitment:
    "We don't just deliver software — we deliver a connected system and a complete solution. From assessment and design to implementation and continual improvement, we partner with organizations to build operational excellence that lasts.",
};

export const peopleProcessTech = [
  {
    title: "People",
    description:
      "Empowered teams with clear roles, accountability, training and development that turn strategy into daily execution.",
  },
  {
    title: "Process",
    description:
      "Standardized, connected and continually improved processes that reduce waste, variation and manual effort.",
  },
  {
    title: "Technology",
    description:
      "Smart digital tools that deliver real-time visibility, automation and data-driven decision making.",
  },
];

export type Pillar = {
  id: string;
  title: string;
  short: string;
  highlights: string[];
};

export const pillars: Pillar[] = [
  {
    id: "consulting",
    title: "Consulting",
    short:
      "Practical, hands-on consulting that assesses your business and designs the right management system.",
    highlights: [
      "Business Assessment",
      "Gap Analysis",
      "System Design",
      "Implementation Support",
      "Training & Development",
      "Audit & Certification Readiness",
    ],
  },
  {
    id: "business-excellence",
    title: "Business Excellence",
    short:
      "Lean and operational excellence programs that improve productivity and eliminate waste.",
    highlights: [
      "Lean Manufacturing",
      "5S / Kaizen / Quality Circle",
      "OEE / TPM / VSM / SMED",
      "Productivity Improvement",
      "Waste Elimination",
      "Cost Reduction",
    ],
  },
  {
    id: "quality-management",
    title: "Quality Management",
    short:
      "End-to-end quality control that reduces rejection, rework and customer complaints.",
    highlights: [
      "Inspection & Testing",
      "CAPA & Root Cause Analysis",
      "Customer Complaints",
      "Rework & Rejection Analysis",
      "Supplier Quality",
      "Quality KPI & Dashboard",
    ],
  },
  {
    id: "iso-management",
    title: "ISO Management",
    short:
      "ISO implementation and certification readiness across all major standards.",
    highlights: [
      "ISO 9001",
      "ISO 14001",
      "ISO 45001",
      "ISO 27001",
      "ISO 22000",
      "ISO 50001",
      "IATF 16949",
      "BRCGS",
      "SA8000",
    ],
  },
  {
    id: "digital-solution",
    title: "Digital Solution",
    short:
      "Digitize processes and gain real-time control with workflows, dashboards and automation.",
    highlights: [
      "Process Digitization",
      "Task Management",
      "Dashboards & Reports",
      "Workflow Automation",
      "Document Management",
      "Real-time Monitoring",
      "Mobile Access",
    ],
  },
];

export const whatWeDo = [
  {
    title: "Consulting",
    description:
      "Assessment, gap analysis, system design and implementation support to build the right foundation.",
  },
  {
    title: "Business Excellence",
    description:
      "Lean, Kaizen and productivity programs that deliver measurable efficiency and cost gains.",
  },
  {
    title: "Digital Solution",
    description:
      "One connected platform that digitizes processes and gives you real-time control.",
  },
];

export type PlatformModule = {
  title: string;
  features: string[];
};

export const platformModules: PlatformModule[] = [
  {
    title: "Management",
    features: ["Dashboard", "Business Review", "KPI & KRA", "PMS", "Reports"],
  },
  {
    title: "Production",
    features: ["Planning", "Production Monitoring", "OEE", "Productivity"],
  },
  {
    title: "Quality",
    features: [
      "Incoming QC",
      "In-process QC",
      "Final Inspection",
      "NC & CAPA",
      "Quality KPI",
    ],
  },
  {
    title: "ISO",
    features: [
      "Document Control",
      "Internal Audit",
      "NC & CAPA",
      "Risk & Opportunity",
      "Compliance",
    ],
  },
  {
    title: "Maintenance",
    features: [
      "Breakdown",
      "Preventive Maintenance",
      "Critical Spares",
      "Machine History",
    ],
  },
  {
    title: "Stores",
    features: ["Inventory", "Material Control", "FIFO", "Material Movement"],
  },
  {
    title: "HR",
    features: [
      "Employee Management",
      "Training",
      "KPI/KRA & PMS",
      "Task Management",
    ],
  },
  {
    title: "CRM & Sales",
    features: [
      "Leads",
      "Customers",
      "Follow-up",
      "Sales Activities",
      "Customer Visits",
    ],
  },
];

export const platformHighlights = [
  {
    title: "Smart Task Management",
    description:
      "Automatic task generation, smart reminders and escalation for overdue or critical tasks, with full status tracking: Open → In Progress → Completed → Delayed.",
    points: [
      "Automatic task generation",
      "Smart reminders",
      "Escalation for overdue / critical tasks",
      "Status tracking: Open → In Progress → Completed → Delayed",
    ],
  },
  {
    title: "Digital ISO & Quality Management",
    description:
      "Fully digital control of documents, records and quality processes to keep you compliant and audit-ready.",
    points: [
      "Document / record control",
      "SOP & work instructions",
      "Internal audit",
      "CAPA",
      "Calibration",
      "Continual improvement",
    ],
  },
];

export const businessBenefits = [
  "Real-Time Visibility",
  "Improved Efficiency",
  "Reduced Cost",
  "Better Decision Making",
  "Compliance Assured",
  "Data-Driven Growth",
  "Better Productivity",
  "Better Quality",
  "Less Manual Work",
  "Higher Accountability",
  "Faster Decision-Making",
  "Stronger Compliance",
  "Better Coordination",
  "Continual Improvement",
  "Sustainable Growth",
];

export const whyChooseUs = [
  {
    title: "All Departments on One Platform",
    description:
      "Connect every function — from production to sales — in a single connected system.",
  },
  {
    title: "End-to-End Process Integration",
    description:
      "Break down silos with fully integrated, connected processes across the business.",
  },
  {
    title: "Customizable & Scalable",
    description:
      "Configure the platform to your workflows and scale as your business grows.",
  },
  {
    title: "Accessible Anytime Anywhere",
    description: "Cloud-based access from desktop and mobile, wherever you work.",
  },
  {
    title: "Expert Support & Training",
    description:
      "Hands-on consulting, onboarding and training from experienced practitioners.",
  },
  {
    title: "Real-time Data & Live Dashboards",
    description:
      "Make decisions on live data with dashboards that update in real time.",
  },
  {
    title: "Reduce Manual Work & Errors",
    description:
      "Automate repetitive tasks and eliminate error-prone manual processes.",
  },
  {
    title: "Secure, Reliable & Compliant",
    description:
      "Built with security and compliance in mind to protect your business data.",
  },
  {
    title: "Cost Effective & High ROI",
    description:
      "Reduce cost and manual effort while driving measurable performance gains.",
  },
  {
    title: "Future-Ready Technology",
    description:
      "Modern, extensible technology that keeps your business ahead of the curve.",
  },
];

export const isoStandards = [
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "ISO 27001",
  "ISO 22000",
  "ISO 50001",
  "IATF 16949",
  "BRCGS",
  "SA8000",
];

export const leanTools = [
  "Lean Manufacturing",
  "5S",
  "Kaizen",
  "Quality Circle",
  "OEE",
  "TPM",
  "VSM",
  "SMED",
  "Productivity Improvement",
  "Waste Elimination",
  "Cost Reduction",
];

export const qualityManagementList = [
  "Inspection & Testing",
  "CAPA & Root Cause Analysis",
  "Customer Complaints",
  "Rework & Rejection Analysis",
  "Supplier Quality",
  "Quality KPI & Dashboard",
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "AVD 360 Platform", href: "/platform" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
];
