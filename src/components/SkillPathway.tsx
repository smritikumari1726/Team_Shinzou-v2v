import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ChevronDown,
  Check,
  AlertTriangle,
  Clock,
  BarChart3,
  BadgeIndianRupee,
  ExternalLink,
  Sparkles,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Star,
  Shield,
} from "lucide-react";

/* ───────────────────────── data ───────────────────────── */

const DREAM_JOBS = [
  "Full-Stack Developer",
  "Data Scientist",
  "UX Designer",
  "Digital Marketer",
  "Business Analyst",
] as const;

type DreamJob = (typeof DREAM_JOBS)[number];

const ALL_SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Excel",
  "Communication",
  "Teamwork",
  "Problem Solving",
] as const;

type Skill = (typeof ALL_SKILLS)[number];

interface SkillMap {
  have: Skill[];
  need: string[];
  readiness: number;
}

const JOB_SKILL_MAP: Record<DreamJob, SkillMap> = {
  "Full-Stack Developer": {
    have: ["HTML", "CSS", "JavaScript", "Problem Solving"],
    need: ["React", "Node.js", "TypeScript", "SQL", "Git", "REST APIs"],
    readiness: 42,
  },
  "Data Scientist": {
    have: ["Python", "Excel", "Problem Solving"],
    need: [
      "Machine Learning",
      "Statistics",
      "Pandas",
      "SQL",
      "Data Visualization",
      "Deep Learning",
    ],
    readiness: 34,
  },
  "UX Designer": {
    have: ["Communication", "Teamwork", "Problem Solving"],
    need: [
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Accessibility",
    ],
    readiness: 28,
  },
  "Digital Marketer": {
    have: ["Communication", "Excel", "Teamwork"],
    need: [
      "SEO",
      "Google Ads",
      "Social Media Strategy",
      "Analytics",
      "Content Marketing",
      "Email Marketing",
    ],
    readiness: 38,
  },
  "Business Analyst": {
    have: ["Excel", "Communication", "Problem Solving", "Teamwork"],
    need: [
      "SQL",
      "Tableau",
      "Power BI",
      "Requirements Gathering",
      "Agile Methodology",
      "Data Modelling",
    ],
    readiness: 45,
  },
};

interface Course {
  name: string;
  provider: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  price: number; // 0 = free
  govtFunded: boolean;
}

const JOB_COURSES: Record<DreamJob, Course[]> = {
  "Full-Stack Developer": [
    { name: "React — The Complete Guide", provider: "Udemy", duration: "8 weeks", difficulty: "Intermediate", price: 499, govtFunded: false },
    { name: "Full-Stack Web Development", provider: "Coursera", duration: "12 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Node.js Backend Mastery", provider: "NPTEL", duration: "8 weeks", difficulty: "Intermediate", price: 0, govtFunded: true },
    { name: "JavaScript Algorithms & DS", provider: "Google", duration: "6 weeks", difficulty: "Intermediate", price: 0, govtFunded: false },
    { name: "TypeScript Fundamentals", provider: "Skill India", duration: "4 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "SQL & Database Design", provider: "Udemy", duration: "5 weeks", difficulty: "Beginner", price: 399, govtFunded: false },
  ],
  "Data Scientist": [
    { name: "Machine Learning A-Z", provider: "Coursera", duration: "10 weeks", difficulty: "Intermediate", price: 0, govtFunded: true },
    { name: "Data Science with Python", provider: "NPTEL", duration: "12 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Deep Learning Specialization", provider: "Google", duration: "10 weeks", difficulty: "Advanced", price: 0, govtFunded: false },
    { name: "Statistics for Data Science", provider: "Skill India", duration: "6 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Pandas & Data Wrangling", provider: "Udemy", duration: "4 weeks", difficulty: "Beginner", price: 499, govtFunded: false },
    { name: "SQL for Analytics", provider: "Coursera", duration: "5 weeks", difficulty: "Beginner", price: 0, govtFunded: false },
  ],
  "UX Designer": [
    { name: "Google UX Design Certificate", provider: "Google", duration: "10 weeks", difficulty: "Beginner", price: 0, govtFunded: false },
    { name: "Figma UI/UX Masterclass", provider: "Udemy", duration: "6 weeks", difficulty: "Beginner", price: 499, govtFunded: false },
    { name: "User Research Methods", provider: "Coursera", duration: "8 weeks", difficulty: "Intermediate", price: 0, govtFunded: true },
    { name: "Design Thinking", provider: "NPTEL", duration: "8 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Accessibility & Inclusive Design", provider: "Skill India", duration: "4 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Prototyping & Wireframing", provider: "Udemy", duration: "5 weeks", difficulty: "Intermediate", price: 399, govtFunded: false },
  ],
  "Digital Marketer": [
    { name: "Google Digital Marketing", provider: "Google", duration: "8 weeks", difficulty: "Beginner", price: 0, govtFunded: false },
    { name: "SEO Specialization", provider: "Coursera", duration: "6 weeks", difficulty: "Intermediate", price: 0, govtFunded: true },
    { name: "Social Media Strategy", provider: "Skill India", duration: "4 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Google Ads Certification", provider: "Google", duration: "6 weeks", difficulty: "Intermediate", price: 0, govtFunded: false },
    { name: "Content Marketing Mastery", provider: "Udemy", duration: "5 weeks", difficulty: "Beginner", price: 399, govtFunded: false },
    { name: "Email Marketing & Automation", provider: "NPTEL", duration: "4 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
  ],
  "Business Analyst": [
    { name: "Business Analytics Specialization", provider: "Coursera", duration: "10 weeks", difficulty: "Intermediate", price: 0, govtFunded: true },
    { name: "SQL for Business Intelligence", provider: "Udemy", duration: "6 weeks", difficulty: "Beginner", price: 499, govtFunded: false },
    { name: "Tableau Fundamentals", provider: "Skill India", duration: "4 weeks", difficulty: "Beginner", price: 0, govtFunded: true },
    { name: "Power BI Complete", provider: "NPTEL", duration: "8 weeks", difficulty: "Intermediate", price: 0, govtFunded: true },
    { name: "Agile & Scrum Certification", provider: "Google", duration: "6 weeks", difficulty: "Beginner", price: 0, govtFunded: false },
    { name: "Data Modelling Essentials", provider: "Udemy", duration: "5 weeks", difficulty: "Intermediate", price: 399, govtFunded: false },
  ],
};

const ROADMAP: Record<DreamJob, { title: string; description: string }[]> = {
  "Full-Stack Developer": [
    { title: "Foundation", description: "HTML, CSS & JavaScript fundamentals — build static pages & small scripts." },
    { title: "Frontend Mastery", description: "React, TypeScript & responsive design — create dynamic single-page apps." },
    { title: "Backend & APIs", description: "Node.js, Express & REST APIs — connect your frontend to real data." },
    { title: "Database & DevOps", description: "SQL, MongoDB, Git & deployment — go from code to production." },
    { title: "Portfolio & Placement", description: "Build 3 projects, polish your resume & ace mock interviews." },
  ],
  "Data Scientist": [
    { title: "Math & Statistics", description: "Probability, linear algebra & descriptive stats — the analytical backbone." },
    { title: "Python & Pandas", description: "Data wrangling, cleaning & exploratory analysis with Python." },
    { title: "Machine Learning", description: "Supervised & unsupervised models — regression, classification, clustering." },
    { title: "Deep Learning & NLP", description: "Neural networks, transformers & natural language processing." },
    { title: "Capstone & Placement", description: "End-to-end project, Kaggle competitions & interview prep." },
  ],
  "UX Designer": [
    { title: "Design Thinking", description: "Empathise, define, ideate — understand user needs deeply." },
    { title: "User Research", description: "Surveys, interviews & personas — ground designs in real data." },
    { title: "Wireframing & Prototyping", description: "Figma, low-fi & high-fi mockups — visualise solutions fast." },
    { title: "UI & Visual Design", description: "Typography, colour theory, design systems & accessibility." },
    { title: "Portfolio & Placement", description: "3 case studies, portfolio website & design challenges." },
  ],
  "Digital Marketer": [
    { title: "Marketing Foundations", description: "Content strategy, branding & audience targeting basics." },
    { title: "SEO & SEM", description: "On-page SEO, keyword research & Google Ads campaigns." },
    { title: "Social Media & Email", description: "Platform strategy, scheduling, A/B testing & automation." },
    { title: "Analytics & Optimisation", description: "Google Analytics, attribution models & conversion rate optimisation." },
    { title: "Campaign & Placement", description: "Run a live campaign, build case studies & get certified." },
  ],
  "Business Analyst": [
    { title: "Business Fundamentals", description: "Requirements gathering, stakeholder mapping & process flows." },
    { title: "SQL & Data Querying", description: "Write complex queries to extract & transform business data." },
    { title: "BI & Visualisation", description: "Tableau, Power BI dashboards — tell stories with data." },
    { title: "Agile & Project Mgmt", description: "Scrum, Kanban, user stories & sprint planning." },
    { title: "Capstone & Placement", description: "End-to-end BA project, mock stakeholder sessions & resume prep." },
  ],
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner: "text-emerald-300",
  Intermediate: "text-amber-300",
  Advanced: "text-rose-300",
};

/* ───────────── circular progress ───────────── */

function CircularProgress({ value }: { value: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute font-display text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
        {value}%
      </span>
    </div>
  );
}

/* ───────────── component ───────────── */

export default function SkillPathway() {
  const [selectedJob, setSelectedJob] = useState<DreamJob>("Full-Stack Developer");
  const [selectedSkills, setSelectedSkills] = useState<Set<Skill>>(
    new Set(ALL_SKILLS as unknown as Skill[])
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      next.has(skill) ? next.delete(skill) : next.add(skill);
      return next;
    });
  };

  const analysis = useMemo(() => {
    const map = JOB_SKILL_MAP[selectedJob];
    const matched = map.have.filter((s) => selectedSkills.has(s));
    const readinessDelta = ((matched.length / map.have.length) * map.readiness) | 0;
    return {
      have: matched,
      need: map.need,
      readiness: readinessDelta || map.readiness,
    };
  }, [selectedJob, selectedSkills]);

  const courses = JOB_COURSES[selectedJob];
  const roadmap = ROADMAP[selectedJob];

  /* ───── stagger helpers ───── */
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 40 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, amount: 0.2 } as const,
    transition: { duration: 0.5, delay: i * 0.1 },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1a] via-[#1a1028] to-[#120e1e] text-white font-sans overflow-x-hidden">
      {/* ─────────── decorative blobs ─────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[160px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-fuchsia-700/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-24">
        {/* ═══════════ HEADER ═══════════ */}
        <motion.section
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 text-sm text-purple-300">
            <Sparkles className="w-4 h-4" />
            AI-Powered Skill Analysis
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/10">
              <GraduationCap className="w-10 h-10 text-purple-300" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-300 bg-clip-text text-transparent leading-tight">
              Skill Pathway
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed">
            Bridging the skill gap for India's women — discover what you know, learn what you need, and land your dream job with{" "}
            <span className="text-purple-300 font-semibold">personalised roadmaps</span> and{" "}
            <span className="text-pink-300 font-semibold">free government-funded courses</span>.
          </p>
        </motion.section>

        {/* ═══════════ DREAM JOB SELECTOR ═══════════ */}
        <motion.section className="space-y-8" {...stagger(0)}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center">
            Choose Your <span className="text-purple-400">Dream Job</span>
          </h2>

          <div className="max-w-md mx-auto relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-left cursor-pointer"
            >
              <span className="text-lg font-medium">{selectedJob}</span>
              <ChevronDown
                className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-30 mt-2 w-full rounded-2xl bg-[#1e1730]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
              >
                {DREAM_JOBS.map((job) => (
                  <li key={job}>
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3.5 hover:bg-purple-500/20 transition-colors cursor-pointer ${
                        job === selectedJob ? "bg-purple-500/30 text-purple-200" : "text-white/80"
                      }`}
                    >
                      {job}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </motion.section>

        {/* ═══════════ CURRENT SKILLS ═══════════ */}
        <motion.section className="space-y-6" {...stagger(1)}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center">
            Your <span className="text-pink-400">Current Skills</span>
          </h2>
          <p className="text-center text-white/50 text-sm">Click to toggle skills you already have</p>

          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {ALL_SKILLS.map((skill) => {
              const active = selectedSkills.has(skill);
              return (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSkill(skill)}
                  className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer border ${
                    active
                      ? "bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-purple-400/50 text-white shadow-lg shadow-purple-500/20"
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
                  }`}
                >
                  {active && <Check className="inline w-4 h-4 mr-1.5 -mt-0.5" />}
                  {skill}
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════ SKILL GAP ANALYSIS ═══════════ */}
        <motion.section {...stagger(2)}>
          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 sm:p-10 space-y-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center">
              Skill Gap <span className="text-purple-400">Analysis</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* skills you have */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Skills You Have
                </h3>
                <ul className="space-y-2">
                  {analysis.have.length === 0 && (
                    <li className="text-white/30 text-sm italic">Select skills above</li>
                  )}
                  {analysis.have.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-emerald-300/90">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* readiness */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-sm uppercase tracking-widest text-purple-300 font-semibold">
                  Overall Readiness
                </h3>
                <CircularProgress value={analysis.readiness} />
                <p className="text-white/40 text-xs text-center max-w-[200px]">
                  Based on matched skills for <span className="text-purple-300">{selectedJob}</span>
                </p>
              </div>

              {/* skills you need */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Skills You Need
                </h3>
                <ul className="space-y-2">
                  {analysis.need.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-amber-300/90">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════ COURSE RECOMMENDATIONS ═══════════ */}
        <section className="space-y-10">
          <motion.div className="text-center space-y-2" {...stagger(0)}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Recommended <span className="text-pink-400">Courses</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-sm">
              Hand-picked courses to fill your skill gaps — many are completely free or government-funded.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.name}
                {...stagger(i)}
                className="group rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500" />

                <div className="p-6 flex flex-col flex-1 space-y-4">
                  {/* badges row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full px-3 py-1">
                      {course.provider}
                    </span>
                    {course.govtFunded && (
                      <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full px-3 py-1 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Govt Funded
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold leading-snug group-hover:text-purple-300 transition-colors">
                    {course.name}
                  </h3>

                  {/* meta */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                    <span className={`flex items-center gap-1 ${DIFFICULTY_COLOR[course.difficulty]}`}>
                      <BarChart3 className="w-3.5 h-3.5" /> {course.difficulty}
                    </span>
                  </div>

                  {/* price */}
                  <div className="mt-auto pt-4">
                    {course.price === 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4" /> FREE
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-white/60">
                        <BadgeIndianRupee className="w-4 h-4" />
                        <span className="font-bold text-white">₹{course.price}</span>
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-sm font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 cursor-pointer"
                  >
                    Enroll Now <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════ LEARNING ROADMAP TIMELINE ═══════════ */}
        <section className="space-y-10">
          <motion.div className="text-center space-y-2" {...stagger(0)}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Your Learning <span className="text-purple-400">Roadmap</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-sm">
              A step-by-step journey from where you are to where you want to be.
            </p>
          </motion.div>

          <div className="relative max-w-2xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-pink-500/40 to-transparent" />

            <div className="space-y-10">
              {roadmap.map((step, i) => (
                <motion.div
                  key={step.title}
                  {...stagger(i)}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* node */}
                  <div
                    className="absolute left-3 sm:left-5 top-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 ring-4 ring-[#0f0a1a]"
                  >
                    {i + 1}
                  </div>

                  <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-5 sm:p-6 hover:border-purple-500/30 transition-all duration-300">
                    <h3 className="font-display text-lg font-bold text-purple-300">{step.title}</h3>
                    <p className="mt-1 text-sm text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ STATS ═══════════ */}
        <motion.section
          className="rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 sm:p-12"
          {...stagger(0)}
        >
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users, value: "10,000+", label: "Women Upskilled" },
              { icon: TrendingUp, value: "85%", label: "Placement Rate" },
              { icon: BookOpen, value: "200+", label: "Free Courses" },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...stagger(i)} className="space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 mx-auto">
                  <stat.icon className="w-7 h-7 text-purple-300" />
                </div>
                <p className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════ CTA ═══════════ */}
        <motion.section className="text-center space-y-6" {...stagger(0)}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Ready to Start Your <span className="text-pink-400">Journey</span>?
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm">
            Join thousands of women who transformed their careers through ForHer's skill pathways.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <Award className="w-5 h-5" /> Get Started Free
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 font-semibold transition-all duration-300"
            >
              Browse All Courses
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
