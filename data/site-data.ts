// ─── Central data store 

import { Sparkles, Target, Users } from "lucide-react";

export const SITE = {
  name: "ResumeAI",
  tagline: "Land your dream job — intelligently.",
  description:
    "AI-powered resume analysis that beats ATS systems, surfaces gaps, and gives you an unfair advantage in every application.",
  url: "https://resumeai.app",
  twitter: "@resumeai",
};

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Stats", href: "#stats" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

// ─── Hero
export const HERO = {
  badge: "🚀 Trusted by 200k+ job seekers",
  headline: ["Think, analyze,", "and get hired"],
  subheadline: "all with AI",
  body: "Upload your resume. Paste a job description. Our AI gives you a score, highlights gaps, rewrites bullets, and helps you beat applicant tracking systems in seconds.",
  cta: "Analyze My Resume — Free",
  ctaSub: "sign-up required · Results in 8 seconds",
  image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80",
};

// ─── Stats
export const STATS = [
  { value: "94%", label: "ATS Pass Rate", sub: "vs 43% industry avg" },
  { value: "3.2×", label: "More Interviews", sub: "after optimization" },
  { value: "8s", label: "Analysis Time", sub: "real-time AI engine" },
  { value: "200k+", label: "Resumes Analyzed", sub: "this month alone" },
];

// ─── Features
export const FEATURES = [
  {
    icon: "🎯",
    title: "ATS Score & Gap Analysis",
    desc: "Instantly see how well your resume matches any job description. Know exactly what keywords are missing before you apply.",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: "✍️",
    title: "AI Bullet Rewriter",
    desc: "Transform weak bullet points into powerful, quantified achievements that catch recruiters' eyes in under 6 seconds.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: "📊",
    title: "Competitive Benchmarking",
    desc: "See how your resume stacks up against thousands of successful candidates who landed roles at top companies.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: "🔍",
    title: "Keyword Optimization",
    desc: "Our NLP engine extracts the exact phrases ATS systems are trained to find — then maps them to your experience.",
    color: "from-emerald-400 to-green-500",
  },
  {
    icon: "🧠",
    title: "Skills Gap Detector",
    desc: "Uncover hidden skill requirements, get personalized learning paths, and close gaps before your next application.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: "⚡",
    title: "One-Click Tailoring",
    desc: "Automatically tailor your resume to any job in one click. Apply to 10× more jobs without 10× the effort.",
    color: "from-blue-400 to-indigo-500",
  },
];

// ─── How It Works
export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload Your Resume",
    desc: "Drag & drop your PDF or paste your text. We support all major formats.",
    icon: "📄",
  },
  {
    step: "02",
    title: "Paste Job Description",
    desc: "Copy the job posting you're targeting. Our AI extracts what matters.",
    icon: "📋",
  },
  {
    step: "03",
    title: "Get Your AI Analysis",
    desc: "Receive your ATS score, keyword map, rewritten bullets, and action plan.",
    icon: "🤖",
  },
  {
    step: "04",
    title: "Apply With Confidence",
    desc: "Download your optimized resume and land interviews 3× faster.",
    icon: "🚀",
  },
];

// ─── World Stats / Impact
export const WORLD_IMPACT = [
  {
    title: "The ATS Problem",
    stat: "75%",
    body: "of resumes are rejected by ATS bots before a human ever reads them. Most candidates never know why.",
    source: "Jobscan Research 2024",
    accent: "#ef4444",
  },
  {
    title: "The AI Advantage",
    stat: "3.2×",
    body: "Job seekers who optimize with AI get 3.2× more interview callbacks than those who don't.",
    source: "ResumeAI Internal Data",
    accent: "#05c8c8",
  },
  {
    title: "The Speed Edge",
    stat: "6 sec",
    body: "Recruiters spend an average of 6 seconds on an initial resume scan. Every word must count.",
    source: "TheLadders Eye-Tracking Study",
    accent: "#f0b429",
  },
];

// ─── Testimonials 
export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Product Manager @ Google",
    avatar: "https://i.pravatar.cc/80?img=47",
    quote:
      "ResumeAI bumped my ATS score from 42% to 91%. I got 3 Google interviews in one week after months of silence.",
    stars: 5,
  },
  {
    name: "Marcus Chen",
    role: "Software Engineer @ Stripe",
    avatar: "https://i.pravatar.cc/80?img=12",
    quote:
      "The keyword optimization alone was worth it. I had no idea my resume was missing 60% of the job's key terms.",
    stars: 5,
  },
  {
    name: "Aisha Johnson",
    role: "Data Scientist @ Netflix",
    avatar: "https://i.pravatar.cc/80?img=32",
    quote:
      "The AI bullet rewriter transformed my resume from a list of duties to a showcase of achievements. Game changer.",
    stars: 5,
  },
  {
    name: "Tom Fischer",
    role: "UX Designer @ Figma",
    avatar: "https://i.pravatar.cc/80?img=67",
    quote:
      "I went from zero callbacks to 7 interviews in 2 weeks. The competitive benchmarking showed me exactly what I was missing.",
    stars: 5,
  },
  {
    name: "Leila Nazari",
    role: "Finance Analyst @ JP Morgan",
    avatar: "https://i.pravatar.cc/80?img=25",
    quote:
      "Applied to 12 jobs with my optimized resume. Got 9 first-round interviews. The ROI is insane.",
    stars: 5,
  },
  {
    name: "James Okafor",
    role: "ML Engineer @ OpenAI",
    avatar: "https://i.pravatar.cc/80?img=55",
    quote:
      "The skills gap detector told me to add 'distributed systems' experience. I framed my side project correctly and got the job.",
    stars: 5,
  },
];

// ─── Pricing 
export const PRICING = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for your first analysis",
    features: [
      "3 resume analyses / month",
      "ATS compatibility score",
      "Basic keyword suggestions",
      "PDF export",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For serious job seekers",
    features: [
      "Unlimited analyses",
      "AI bullet point rewriter",
      "One-click job tailoring",
      "Competitive benchmarking",
      "Skills gap analysis",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Teams",
    price: "$49",
    period: "/mo",
    desc: "For career coaches & agencies",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "White-label reports",
      "API access",
      "Analytics dashboard",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

// ─── Footer links 
export const FOOTER_LINKS = {
  Product: ["Features", "How It Works", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Resume Templates", "Career Tips", "ATS Guide"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

// ─── Trusted companies 
export const TRUSTED_LOGOS = [
  { name: "Google", color: "#4285F4" },
  { name: "Microsoft", color: "#00A4EF" },
  { name: "Amazon", color: "#FF9900" },
  { name: "Meta", color: "#0866FF" },
  { name: "Apple", color: "#555555" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Notion", color: "#000000" },
];


export const PROFESSIONS = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
  "Marketing",
  "Sales",
  "Finance",
  "Other",
];

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0–2 yrs)" },
  { value: "mid", label: "Mid Level (3–5 yrs)" },
  { value: "senior", label: "Senior (6–9 yrs)" },
  { value: "lead", label: "Lead / Principal (10+ yrs)" },
];

export const FOCUS_OPTIONS = [
  { value: "general", label: "General ATS Optimization" },
  { value: "tailor", label: "Tailor to a Specific Job" },
  { value: "pivot", label: "Career Change / Pivot" },
  { value: "exec", label: "Executive / Leadership Review" },
];


// Plan Details
export const PLAN_DETAILS: Record<string, { name: string; price: string; features: string[] }> = {
  starter: {
    name: "Starter",
    price: "$0",
    features: ["3 resume analyses / month", "Basic ATS scoring", "Email support"],
  },
  pro: {
    name: "Pro",
    price: "$19/mo",
    features: ["Unlimited analyses", "Job-description matching", "Priority AI processing", "Downloadable reports"],
  },
  team: {
    name: "Team",
    price: "$49/mo",
    features: ["Everything in Pro", "5 team seats", "Shared analysis history", "Priority support"],
  },
};

export const COUNTRIES = ["United States", "India", "United Kingdom", "Canada", "Australia", "Germany", "Other"];
export const BRAND_LABEL: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
};

// Watch Demo Page Data
export const CHAPTERS = [
  { time: "0:00", label: "Uploading a resume and picking a target role" },
  { time: "0:45", label: "Reading the ATS score and identified skills" },
  { time: "1:30", label: "Applying suggested fixes and re-analyzing" },
  { time: "2:15", label: "Comparing results against a real job description" },
];

export const HIGHLIGHTS = [
  { icon: Target, title: "Role-aware scoring", text: "The score adjusts to the target role and experience level you select — not a generic checklist." },
  { icon: Sparkles, title: "AI-generated fixes", text: "Suggestions come from the same model reviewers use, phrased as concrete edits you can make today." },
  { icon: Users, title: "Built for real pipelines", text: "Designed around how ATS systems actually parse resumes, not just keyword stuffing." },
];