import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale,
  ShieldCheck,
  ChevronDown,
  Phone,
  Calculator,
  HelpCircle,
  Baby,
  AlertTriangle,
  BadgeDollarSign,
  HardHat,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Info,
  Clock,
  Briefcase,
  Heart,
} from "lucide-react";

/* ──────────────────────── Types ──────────────────────── */

type CategoryId =
  | "maternity"
  | "posh"
  | "equal-pay"
  | "safety";

interface Provision {
  title: string;
  detail: string;
}

interface LawData {
  name: string;
  year: string;
  summary: string;
  provisions: Provision[];
  eligibility: string;
  howToClaim: string;
}

interface FAQItem {
  q: string;
  a: string;
}

/* ──────────────────────── Static Data ──────────────────────── */

const CATEGORIES: { id: CategoryId; label: string; icon: React.ElementType }[] = [
  { id: "maternity", label: "Maternity Benefits", icon: Baby },
  { id: "posh", label: "Sexual Harassment (POSH)", icon: AlertTriangle },
  { id: "equal-pay", label: "Equal Pay", icon: BadgeDollarSign },
  { id: "safety", label: "Workplace Safety", icon: HardHat },
];

const LAWS: Record<CategoryId, LawData> = {
  maternity: {
    name: "The Maternity Benefit Act, 1961",
    year: "Amended 2017",
    summary:
      "Protects the employment of women during maternity and entitles them to full paid absence from work, ensuring the health and safety of both mother and child.",
    provisions: [
      {
        title: "26 Weeks Paid Leave",
        detail:
          "Women are entitled to 26 weeks of paid maternity leave for the first two children. For the third child onwards, the entitlement is 12 weeks.",
      },
      {
        title: "Work-From-Home Option",
        detail:
          "Post the 26-week period, the employer may allow work-from-home arrangements depending on the nature of work — a provision introduced in the 2017 amendment.",
      },
      {
        title: "Crèche Facility",
        detail:
          "Establishments with 50+ employees must provide a crèche. Mothers are allowed 4 visits daily to the crèche, including intervals for rest.",
      },
      {
        title: "No Discharge During Leave",
        detail:
          "It is illegal for an employer to terminate, dismiss, or discharge a woman during maternity leave. Any such action is punishable.",
      },
      {
        title: "Medical Bonus",
        detail:
          "If no pre-natal or post-natal care is provided by the employer, a medical bonus of ₹3,500 (or as prescribed) shall be paid.",
      },
    ],
    eligibility:
      "Any woman who has worked for at least 80 days in the 12 months preceding the expected date of delivery is eligible for maternity benefits.",
    howToClaim:
      "Submit a written notice to your employer along with proof of pregnancy (medical certificate). The employer must pay maternity benefit within 48 hours of receiving the proof. In case of denial, file a complaint with the Inspector appointed under the Act.",
  },
  posh: {
    name: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
    year: "2013",
    summary:
      "Provides protection against sexual harassment of women at the workplace, mandates the constitution of an Internal Complaints Committee (ICC), and lays down procedures for inquiry and redressal.",
    provisions: [
      {
        title: "Internal Complaints Committee (ICC)",
        detail:
          "Every workplace with 10+ employees must constitute an ICC. It must be headed by a senior woman and include an external member from an NGO/legal background.",
      },
      {
        title: "Broad Definition of Workplace",
        detail:
          "The Act covers all types of workplaces — government, private sector, NGOs, hospitals, educational institutions, sports institutions, and even dwelling places (for domestic workers).",
      },
      {
        title: "Confidential Inquiry Process",
        detail:
          "All complaints must be handled confidentially. The ICC must complete its inquiry within 90 days and submit a report within 10 days thereafter.",
      },
      {
        title: "Interim Relief",
        detail:
          "During the pendency of an inquiry, the ICC may recommend transfer of the aggrieved woman or the respondent, grant leave, or restrain the respondent from reporting on work performance.",
      },
      {
        title: "Employer Obligations",
        detail:
          "Employers must conduct regular awareness programs, display the penal consequences of sexual harassment, and include the policy in their service rules.",
      },
    ],
    eligibility:
      "Any woman, regardless of her age or employment status, who alleges sexual harassment at the workplace — including regular, temporary, ad-hoc, daily-wage, or contractual employees.",
    howToClaim:
      "File a written complaint with the Internal Complaints Committee within 3 months of the incident (extendable by 3 months). If there is no ICC, approach the Local Complaints Committee (LCC) in your district.",
  },
  "equal-pay": {
    name: "The Equal Remuneration Act, 1976",
    year: "1976 (Subsumed into Code on Wages, 2019)",
    summary:
      "Mandates equal pay for equal work for both men and women. Prohibits discrimination in recruitment and conditions of service on the basis of gender.",
    provisions: [
      {
        title: "Equal Pay for Equal Work",
        detail:
          "No employer shall pay any worker at rates less favorable than those paid to workers of the opposite sex for performing the same or similar work.",
      },
      {
        title: "No Discrimination in Recruitment",
        detail:
          "Employers cannot discriminate against women while recruiting for the same or similar nature of work, except where employment of women is restricted by law.",
      },
      {
        title: "Advisory Committee",
        detail:
          "The Government shall constitute advisory committees to provide recommendations on increasing employment opportunities for women.",
      },
      {
        title: "Penalties for Violation",
        detail:
          "Any employer found in violation faces a fine up to ₹10,000, imprisonment up to one month, or both. Repeated offenses attract higher penalties.",
      },
      {
        title: "Maintenance of Registers",
        detail:
          "Every employer must maintain registers and documents prescribed under the Act, open for inspection by the Inspector at all times.",
      },
    ],
    eligibility:
      "All women employees — in factories, establishments, and other organizations covered under the Act. Applies to both organized and unorganized sectors.",
    howToClaim:
      "File a complaint with the Labour Commissioner or the appropriate authority in your state. You can also approach the labour court for adjudication if conciliation fails.",
  },
  safety: {
    name: "The Factories Act, 1948 & Occupational Safety, Health and Working Conditions Code, 2020",
    year: "1948 / 2020",
    summary:
      "Ensures the health, safety, and welfare of workers in factories and other establishments. Special provisions protect women workers from hazardous work and regulate working hours.",
    provisions: [
      {
        title: "Safe Working Conditions",
        detail:
          "Every employer must ensure a clean, well-ventilated, and adequately lit workplace. Floors, passages, and staircases must be maintained for safety.",
      },
      {
        title: "Restriction on Night Work",
        detail:
          "Women shall not be required or allowed to work in a factory except between 6 AM and 7 PM, unless state government exemptions are provided with safety measures.",
      },
      {
        title: "Separate Amenities",
        detail:
          "Adequate and separate washroom facilities, rest rooms, and changing rooms must be provided for women workers.",
      },
      {
        title: "Prohibition of Hazardous Work",
        detail:
          "Women are prohibited from working near cotton openers, dangerous machines, or in processes involving harmful substances, unless proper safeguards are in place.",
      },
      {
        title: "First Aid & Health Checks",
        detail:
          "Factories must maintain first-aid boxes, appoint a safety officer (for 1000+ workers), and ensure periodic health check-ups for workers.",
      },
    ],
    eligibility:
      "All women workers employed in factories, mines, plantations, and establishments covered under the Code on Occupational Safety.",
    howToClaim:
      "Report unsafe conditions to the Factory Inspector or Occupational Safety Officer. You can also file complaints with the District Magistrate or the Chief Inspector of Factories.",
  },
};

const HELPLINES = [
  { label: "Women Helpline", number: "181", color: "from-pink-500 to-rose-500" },
  { label: "NCW Helpline", number: "7827170170", color: "from-violet-500 to-purple-600" },
  { label: "Police", number: "100", color: "from-blue-500 to-indigo-600" },
];

const FAQ_DATA: FAQItem[] = [
  {
    q: "Can my employer terminate me during maternity leave?",
    a: "No. Under the Maternity Benefit Act, it is illegal for an employer to discharge or dismiss a woman during maternity leave. Any such termination is void and the employer can be penalized with imprisonment and/or fine.",
  },
  {
    q: "What if my workplace doesn't have an Internal Complaints Committee (ICC)?",
    a: "If your workplace has fewer than 10 employees or has not constituted an ICC, you can approach the Local Complaints Committee (LCC) established by the District Officer. Every district in India is mandated to have an LCC.",
  },
  {
    q: "Does equal pay apply to the private sector?",
    a: "Yes. The Equal Remuneration Act (now subsumed under the Code on Wages, 2019) applies to all establishments — government, private, and unorganized sectors. Any employer paying different wages to men and women for equal work is in violation.",
  },
  {
    q: "Can I file an anonymous complaint for workplace harassment?",
    a: "While the POSH Act requires a written complaint, it mandates complete confidentiality. The identity of the complainant, respondent, and witnesses cannot be disclosed. Some organizations also offer anonymous reporting channels.",
  },
  {
    q: "Are contractual and freelance workers covered by these laws?",
    a: "The POSH Act covers all women regardless of employment type — regular, temporary, contractual, or ad-hoc. Maternity benefits for contractual workers depend on the specific contract and the establishment. The 2020 Code on OSH extends safety provisions to gig and platform workers.",
  },
];

/* ──────────────────────── Calculator Data ──────────────────────── */

interface CalcResult {
  weeks: number;
  payPercent: number;
  benefits: string[];
}

const CALC_RESULTS: Record<string, CalcResult[]> = {
  Government: [
    { weeks: 26, payPercent: 100, benefits: ["Full salary during leave", "Crèche facility", "Work-from-home option post leave", "Child Care Leave up to 2 years"] },
    { weeks: 26, payPercent: 100, benefits: ["Full salary during leave", "Crèche facility", "Work-from-home option post leave", "Child Care Leave up to 2 years"] },
  ],
  Private: [
    { weeks: 12, payPercent: 100, benefits: ["Pro-rated leave for <80 days service", "Medical bonus if applicable"] },
    { weeks: 26, payPercent: 100, benefits: ["Full salary during leave", "Crèche (50+ employees)", "Work-from-home option", "Medical bonus ₹3,500"] },
  ],
  Contractual: [
    { weeks: 0, payPercent: 0, benefits: ["Benefits depend on contract terms", "May not be covered if <80 days served"] },
    { weeks: 12, payPercent: 100, benefits: ["Leave as per contract", "Medical bonus if applicable", "ESIC benefits if registered"] },
  ],
};

function getCalcResult(type: string, years: number): CalcResult {
  const results = CALC_RESULTS[type] || CALC_RESULTS["Private"];
  return years >= 1 ? results[1] : results[0];
}

/* ──────────────────────── Reusable Sub-Components ──────────────────────── */

function AccordionItem({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-violet-100/60 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm hover:border-violet-200/80 transition-colors duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-violet-500">{icon}</span>}
          <span className="font-medium text-slate-800 group-hover:text-violet-700 transition-colors">{title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-violet-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-violet-50">
              <div className="pt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-xl border border-violet-100/50 rounded-2xl shadow-lg shadow-violet-100/20 ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────── Main Component ──────────────────────── */

export default function LegalRights() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("maternity");
  const [empType, setEmpType] = useState("Private");
  const [yearsOfService, setYearsOfService] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const law = LAWS[activeCategory];
  const calcResult = useMemo(() => getCalcResult(empType, yearsOfService), [empType, yearsOfService]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-pink-50/20 font-sans">
      {/* ─── Decorative Blobs ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-200/30 to-pink-200/20 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-200/20 to-lavender-200/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-pink-100/30 to-violet-100/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* ━━━━━━ HERO HEADER ━━━━━━ */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100/60 border border-violet-200/50 text-violet-700 text-xs font-medium mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Knowledge is Power
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 blur-2xl opacity-30 scale-150" />
              <div className="relative p-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-200/50">
                <Scale className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Know Your{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Workplace Rights
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Every woman deserves to feel safe, valued, and empowered at work. Understand the laws that protect you — 
            because knowing your rights is the first step to claiming them.
          </p>
        </motion.header>

        {/* ━━━━━━ CATEGORY FILTER PILLS ━━━━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-500 shadow-lg shadow-violet-200/50"
                    : "bg-white/70 backdrop-blur-sm text-slate-600 border-violet-100/60 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-violet-100" : "text-violet-400"}`} />
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ━━━━━━ LAW DETAILS SECTION ━━━━━━ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <GlassCard className="p-6 sm:p-8 mb-10">
              {/* Law Title */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-3 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200/40">
                  <BookOpen className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{law.name}</h2>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-violet-100/70 text-violet-700 text-xs font-medium border border-violet-200/40">
                    {law.year}
                  </span>
                  <p className="mt-3 text-slate-600 leading-relaxed">{law.summary}</p>
                </div>
              </div>

              {/* Key Provisions */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-slate-800 mb-4">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  Key Provisions
                </h3>
                <div className="space-y-3">
                  {law.provisions.map((p, i) => (
                    <AccordionItem key={i} title={p.title} icon={<CheckCircle2 className="w-4 h-4" />}>
                      {p.detail}
                    </AccordionItem>
                  ))}
                </div>
              </div>

              {/* Eligibility & How to Claim */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50/80 to-purple-50/50 border border-violet-100/50">
                  <h4 className="flex items-center gap-2 font-display font-semibold text-slate-800 mb-2">
                    <Info className="w-4 h-4 text-violet-500" />
                    Eligibility
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{law.eligibility}</p>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50/60 to-rose-50/40 border border-pink-100/50">
                  <h4 className="flex items-center gap-2 font-display font-semibold text-slate-800 mb-2">
                    <ArrowRight className="w-4 h-4 text-pink-500" />
                    How to Claim
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{law.howToClaim}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* ━━━━━━ CALCULATOR & HELPLINES ROW ━━━━━━ */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* ── Maternity Leave Calculator ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <GlassCard className="p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-md shadow-pink-200/40">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Maternity Leave Calculator</h3>
                  <p className="text-xs text-slate-500">Estimate your entitlements based on employment type</p>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 inline mr-1 text-violet-400" />
                    Employment Type
                  </label>
                  <select
                    value={empType}
                    onChange={(e) => setEmpType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-violet-200/60 bg-white/80 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option>Government</option>
                    <option>Private</option>
                    <option>Contractual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-violet-400" />
                    Years of Service
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={yearsOfService}
                    onChange={(e) => setYearsOfService(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl border border-violet-200/60 bg-white/80 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Result */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${empType}-${yearsOfService}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50/60 border border-violet-100/50 mb-6"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-3xl font-display font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        {calcResult.weeks}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Weeks of Leave</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-display font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                        {calcResult.payPercent}%
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Pay During Leave</p>
                    </div>
                    <div className="text-center col-span-2 sm:col-span-1">
                      <p className="text-3xl font-display font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                        {calcResult.benefits.length}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Additional Benefits</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {calcResult.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Comparison Table */}
              <div>
                <h4 className="font-display text-sm font-semibold text-slate-700 mb-3">Comparison Across Employment Types</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-violet-100">
                        <th className="text-left py-2.5 px-3 text-slate-500 font-medium">Type</th>
                        <th className="text-center py-2.5 px-3 text-slate-500 font-medium">Leave (wks)</th>
                        <th className="text-center py-2.5 px-3 text-slate-500 font-medium">Pay %</th>
                        <th className="text-left py-2.5 px-3 text-slate-500 font-medium">Key Benefit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["Government", "Private", "Contractual"].map((type) => {
                        const r = getCalcResult(type, yearsOfService);
                        const isSelected = type === empType;
                        return (
                          <tr
                            key={type}
                            className={`border-b border-violet-50 transition-colors ${
                              isSelected ? "bg-violet-50/60" : "hover:bg-violet-50/30"
                            }`}
                          >
                            <td className="py-2.5 px-3 font-medium text-slate-700">
                              {isSelected && <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 mr-2" />}
                              {type}
                            </td>
                            <td className="text-center py-2.5 px-3 text-slate-600">{r.weeks}</td>
                            <td className="text-center py-2.5 px-3 text-slate-600">{r.payPercent}%</td>
                            <td className="py-2.5 px-3 text-slate-600 text-xs">{r.benefits[0]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Emergency Helplines ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 shadow-md shadow-rose-200/40">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Emergency Helplines</h3>
                  <p className="text-xs text-slate-500">Immediate assistance when you need it</p>
                </div>
              </div>

              <div className="space-y-4">
                {HELPLINES.map((h, i) => (
                  <motion.a
                    key={i}
                    href={`tel:${h.number}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r border border-white/20 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${h.color} shadow-lg`}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 group-hover:text-violet-700 transition-colors">{h.label}</p>
                      <p className="text-2xl font-display font-bold text-slate-900">{h.number}</p>
                    </div>
                    <div className="flex-shrink-0 p-2 rounded-full bg-white/80 border border-violet-100/50 group-hover:bg-violet-50 transition-colors">
                      <Phone className="w-4 h-4 text-violet-500" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Reassurance Note */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-pink-50/80 to-violet-50/50 border border-pink-100/40">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-1">You are not alone</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      These helplines are free, confidential, and available 24/7. Don't hesitate to reach out — 
                      help is always just a call away.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ━━━━━━ FAQ SECTION ━━━━━━ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-200/40">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
                <p className="text-xs text-slate-500">Quick answers to common concerns</p>
              </div>
            </div>

            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => (
                <div
                  key={i}
                  className="border border-violet-100/60 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm hover:border-violet-200/80 transition-colors duration-300"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer group"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-violet-700 transition-colors pr-4">
                      {faq.q}
                    </span>
                    <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <ChevronDown className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-violet-50">
                          <div className="pt-4">{faq.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>

        {/* ━━━━━━ BOTTOM CTA ━━━━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 text-white shadow-2xl shadow-violet-300/30">
            <ShieldCheck className="w-8 h-8 mb-3 text-violet-100" />
            <h3 className="font-display text-xl font-bold mb-2">Your Rights Matter</h3>
            <p className="text-violet-100 text-sm max-w-md mb-4">
              Knowledge transforms into power when you act on it. Stay informed, stay empowered, and never settle for less than you deserve.
            </p>
            <div className="flex items-center gap-2 text-xs text-violet-200">
              <Sparkles className="w-4 h-4" />
              ForHer · Equity Suite
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
