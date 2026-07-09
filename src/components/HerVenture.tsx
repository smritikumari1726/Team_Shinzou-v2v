import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Lightbulb,
  FileText,
  Presentation,
  ChevronRight,
  Check,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Download,
  Star,
  Building2,
  GraduationCap,
  Palette,
  Laptop,
  UtensilsCrossed,
  BadgeIndianRupee,
  BriefcaseBusiness,
  BarChart3,
  Layers,
  Copy,
  ExternalLink,
} from "lucide-react";

/* ──────────────────────── Constants ──────────────────────── */

const CATEGORIES = [
  { label: "Food & Catering", icon: UtensilsCrossed },
  { label: "Fashion & Textiles", icon: Palette },
  { label: "Beauty & Wellness", icon: Sparkles },
  { label: "Education & Tutoring", icon: GraduationCap },
  { label: "Tech & Digital", icon: Laptop },
] as const;

const STEPS = [
  { id: 1, label: "Idea Input", icon: Lightbulb },
  { id: 2, label: "Business Plan", icon: FileText },
  { id: 3, label: "Pitch Deck", icon: Presentation },
] as const;

const MOCK_PLAN = {
  businessName: "SpiceCraft Catering Co.",
  tagline: "Artisanal Indian cuisine delivered with love",
  sections: [
    {
      title: "Executive Summary",
      icon: FileText,
      content:
        "SpiceCraft Catering Co. is a premium home-style Indian catering service targeting corporate events, weddings, and daily tiffin subscriptions across Tier-1 cities. Founded by a woman entrepreneur with 8+ years of culinary expertise, we combine authentic regional recipes with modern presentation and sustainable packaging. Our first-year target is ₹18L revenue with a 22% net margin.",
    },
    {
      title: "Market Opportunity",
      icon: Target,
      content:
        "The Indian catering market is valued at ₹4,200 Cr and growing at 14% CAGR. The corporate catering segment alone is expanding 18% YoY as companies shift to curated meal experiences. Our niche — premium, health-conscious, women-led artisanal catering — is significantly underserved with less than 3% market penetration in metros.",
    },
    {
      title: "Revenue Model",
      icon: TrendingUp,
      content:
        "Three revenue streams: (1) Corporate event catering — avg. ticket ₹45,000, projected 8 events/month; (2) Daily tiffin subscription — ₹3,500/month per subscriber, target 120 subscribers by Month 6; (3) Weekend specialty menus & festival packages — seasonal revenue spike of 40%. Blended gross margin: 58%.",
    },
    {
      title: "Funding Required",
      icon: BadgeIndianRupee,
      content:
        "Seeking ₹5,00,000 in seed funding. Allocation: commercial-grade kitchen equipment (₹2,00,000), initial inventory & packaging (₹80,000), branding & digital marketing (₹70,000), delivery fleet deposit (₹1,00,000), and working capital reserve (₹50,000). Projected breakeven: Month 5.",
    },
  ],
};

const PITCH_SLIDES = [
  { title: "Cover Slide", desc: "SpiceCraft — Artisanal Indian Cuisine, Redefined" },
  { title: "Problem Statement", desc: "Lack of premium, health-conscious catering for modern professionals" },
  { title: "Our Solution", desc: "Chef-curated menus with sustainable, doorstep delivery" },
  { title: "Market Size & TAM", desc: "₹4,200 Cr market growing at 14% CAGR" },
  { title: "Business Model", desc: "Events + Subscriptions + Festival Specials" },
  { title: "Traction & Milestones", desc: "Pre-launch waitlist of 200+ subscribers" },
  { title: "Team", desc: "8+ years culinary expertise, MBA operations lead" },
  { title: "Financial Projections", desc: "₹18L Year-1 revenue, breakeven in 5 months" },
  { title: "The Ask", desc: "₹5,00,000 seed round for kitchen + launch" },
  { title: "Thank You", desc: "Contact & next steps" },
];

const TEMPLATES = [
  {
    title: "Street Food Empire",
    category: "Food & Catering",
    desc: "Launch a scalable street food franchise with regional specialties and a cloud kitchen model.",
    color: "from-amber-500 to-orange-600",
    icon: UtensilsCrossed,
  },
  {
    title: "EduSpark Academy",
    category: "Education & Tutoring",
    desc: "Online tutoring platform connecting rural students with metro educators via live classes.",
    color: "from-emerald-500 to-teal-600",
    icon: GraduationCap,
  },
  {
    title: "GlowUp Studio",
    category: "Beauty & Wellness",
    desc: "Mobile beauty salon service with organic product lines and subscription wellness packages.",
    color: "from-pink-500 to-rose-600",
    icon: Sparkles,
  },
  {
    title: "ThreadCraft Boutique",
    category: "Fashion & Textiles",
    desc: "Handloom fashion brand empowering rural weavers with D2C e-commerce and exhibition pop-ups.",
    color: "from-violet-500 to-purple-600",
    icon: Palette,
  },
];

const STATS = [
  { value: "500+", label: "Plans Generated", icon: FileText },
  { value: "₹2Cr+", label: "Funding Secured", icon: BadgeIndianRupee },
  { value: "200+", label: "Businesses Launched", icon: Building2 },
];

/* ──────────────────────── Component ──────────────────────── */

export default function HerVenture() {
  const [activeStep, setActiveStep] = useState(1);
  const [businessIdea, setBusinessIdea] = useState("");
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const canProceedStep1 = businessIdea.trim().length > 20 && category !== "";

  const handleGeneratePlan = () => {
    if (canProceedStep1) setActiveStep(2);
  };

  const handleGeneratePitch = () => setActiveStep(3);

  const goToStep = (step: number) => {
    if (step === 1) setActiveStep(1);
    if (step === 2 && canProceedStep1) setActiveStep(2);
    if (step === 3 && canProceedStep1) setActiveStep(3);
  };

  /* ── Shared animation variants ── */
  const fadeSlide = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/60 via-white to-pink-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* ═══════════════════ HEADER ═══════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-purple-200/60 mb-5">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3">
            Turn Your Ideas into{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Funded Businesses
            </span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            HerVenture generates investor-ready business plans and pitch decks in minutes — powered by AI, tailored for women entrepreneurs.
          </p>
        </motion.div>

        {/* ═══════════════════ STEPPER ═══════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center justify-center gap-0 mb-12 sm:mb-14"
        >
          {STEPS.map((step, idx) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            const StepIcon = step.icon;

            return (
              <React.Fragment key={step.id}>
                {/* Connector line */}
                {idx > 0 && (
                  <div className="relative w-16 sm:w-24 lg:w-32 h-0.5 mx-1">
                    <div className="absolute inset-0 bg-purple-100 rounded-full" />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: isCompleted || isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                {/* Step node */}
                <button
                  onClick={() => goToStep(step.id)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-purple-300/50 ring-4 ring-purple-100"
                        : isCompleted
                        ? "bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-purple-200/40"
                        : "bg-white border-2 border-purple-100 shadow-sm"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <StepIcon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          isActive ? "text-white" : "text-purple-300"
                        }`}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-purple-400/50"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold transition-colors ${
                      isActive
                        ? "text-violet-700"
                        : isCompleted
                        ? "text-violet-500"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </motion.div>

        {/* ═══════════════════ STEP CONTENT ═══════════════════ */}
        <div className="min-h-[520px]">
          <AnimatePresence mode="wait">
            {/* ──── STEP 1: Idea Input ──── */}
            {activeStep === 1 && (
              <motion.div key="step1" {...fadeSlide}>
                <div className="max-w-3xl mx-auto">
                  <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl shadow-purple-100/30 p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-200/50">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                          Describe Your Business Idea
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Be as detailed as possible — our AI thrives on context
                        </p>
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="mb-6">
                      <textarea
                        value={businessIdea}
                        onChange={(e) => setBusinessIdea(e.target.value)}
                        placeholder="E.g., I want to start a home-based catering service specializing in authentic Rajasthani thalis for corporate offices in Jaipur. I have 5 years of cooking experience and plan to start with a team of 3..."
                        rows={5}
                        className="w-full rounded-xl border border-purple-100 bg-white/80 px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 leading-relaxed outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all resize-none"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[11px] text-slate-400">
                          Minimum 20 characters
                        </span>
                        <span
                          className={`text-[11px] font-mono font-semibold ${
                            businessIdea.length >= 20
                              ? "text-emerald-500"
                              : "text-slate-400"
                          }`}
                        >
                          {businessIdea.length} chars
                        </span>
                      </div>
                    </div>

                    {/* Category dropdown */}
                    <div className="mb-8">
                      <label className="text-xs font-semibold text-slate-600 mb-2 block">
                        Business Category
                      </label>
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full flex items-center justify-between rounded-xl border border-purple-100 bg-white/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400 transition-all cursor-pointer"
                        >
                          <span
                            className={
                              category ? "text-slate-800 font-medium" : "text-slate-400"
                            }
                          >
                            {category || "Select a category..."}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isDropdownOpen ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-20 mt-1.5 w-full backdrop-blur-xl bg-white/95 border border-purple-100 rounded-xl shadow-xl shadow-purple-100/30 overflow-hidden"
                            >
                              {CATEGORIES.map((cat) => {
                                const CatIcon = cat.icon;
                                return (
                                  <button
                                    key={cat.label}
                                    onClick={() => {
                                      setCategory(cat.label);
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer ${
                                      category === cat.label
                                        ? "bg-violet-50 text-violet-700 font-semibold"
                                        : "text-slate-700 hover:bg-purple-50/50"
                                    }`}
                                  >
                                    <CatIcon className="w-4 h-4 text-violet-500" />
                                    {cat.label}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Generate button */}
                    <motion.button
                      whileHover={{ scale: canProceedStep1 ? 1.02 : 1 }}
                      whileTap={{ scale: canProceedStep1 ? 0.98 : 1 }}
                      onClick={handleGeneratePlan}
                      disabled={!canProceedStep1}
                      className={`w-full py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        canProceedStep1
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-300/40 hover:shadow-purple-400/50"
                          : "bg-purple-100 text-purple-300 cursor-not-allowed"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Business Plan
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ──── STEP 2: Business Plan ──── */}
            {activeStep === 2 && (
              <motion.div key="step2" {...fadeSlide}>
                <div className="max-w-4xl mx-auto">
                  {/* Plan header */}
                  <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl shadow-purple-100/30 p-6 sm:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                            <BriefcaseBusiness className="w-4 h-4 text-white" />
                          </div>
                          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                            {MOCK_PLAN.businessName}
                          </h2>
                        </div>
                        <p className="text-xs text-slate-400 italic ml-10">
                          {MOCK_PLAN.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-purple-100 text-xs font-semibold text-violet-600 hover:bg-violet-50 transition-colors flex items-center gap-1.5 cursor-pointer">
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </button>
                        <button className="px-3 py-1.5 rounded-lg border border-purple-100 text-xs font-semibold text-violet-600 hover:bg-violet-50 transition-colors flex items-center gap-1.5 cursor-pointer">
                          <Download className="w-3.5 h-3.5" />
                          Export PDF
                        </button>
                      </div>
                    </div>

                    {/* Plan sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_PLAN.sections.map((section, idx) => {
                        const SectionIcon = section.icon;
                        return (
                          <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx, duration: 0.4 }}
                            className={`rounded-xl border p-5 transition-all hover:shadow-md group ${
                              section.title === "Funding Required"
                                ? "border-violet-200 bg-gradient-to-br from-violet-50/80 to-purple-50/60 md:col-span-2"
                                : "border-purple-50 bg-white/60 hover:border-purple-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  section.title === "Funding Required"
                                    ? "bg-gradient-to-br from-violet-600 to-purple-700"
                                    : "bg-purple-100"
                                }`}
                              >
                                <SectionIcon
                                  className={`w-4 h-4 ${
                                    section.title === "Funding Required"
                                      ? "text-white"
                                      : "text-violet-600"
                                  }`}
                                />
                              </div>
                              <h3 className="font-display font-bold text-sm text-slate-800">
                                {section.title}
                              </h3>
                              {section.title === "Funding Required" && (
                                <span className="ml-auto text-lg font-display font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                  ₹5,00,000
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {section.content}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGeneratePitch}
                      className="flex-1 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-300/40 flex items-center justify-center gap-2 cursor-pointer hover:shadow-purple-400/50 transition-shadow"
                    >
                      <Presentation className="w-4 h-4" />
                      Generate Pitch Deck
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <button
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3.5 rounded-xl font-display font-bold text-sm border border-purple-200 text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
                    >
                      Edit Idea
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ──── STEP 3: Pitch Deck ──── */}
            {activeStep === 3 && (
              <motion.div key="step3" {...fadeSlide}>
                <div className="max-w-4xl mx-auto">
                  <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl shadow-purple-100/30 p-6 sm:p-8 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md shadow-pink-200/50">
                        <Presentation className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                          Your Pitch Deck
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          10 investor-ready slides for{" "}
                          <span className="font-semibold text-violet-500">
                            {MOCK_PLAN.businessName}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Slide list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PITCH_SLIDES.map((slide, idx) => (
                        <motion.div
                          key={slide.title}
                          initial={{ opacity: 0, x: idx % 2 === 0 ? -12 : 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.35 }}
                          className="flex items-start gap-3 p-4 rounded-xl border border-purple-50 bg-white/60 hover:border-purple-200 hover:shadow-sm transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-xs font-display font-bold text-violet-600">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-800 group-hover:text-violet-700 transition-colors">
                              {slide.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                              {slide.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Download / actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button className="flex-1 py-3 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-200/40 flex items-center justify-center gap-2 cursor-pointer hover:shadow-pink-300/50 transition-shadow">
                        <Download className="w-4 h-4" />
                        Download Pitch Deck
                      </button>
                      <button className="flex-1 py-3 rounded-xl font-display font-bold text-sm border border-purple-200 text-violet-600 hover:bg-violet-50 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <Copy className="w-4 h-4" />
                        Copy All Slides
                      </button>
                    </div>
                  </div>

                  {/* Match with Government Schemes */}
                  <Link
                    to="/herfinance"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-6 sm:p-8 shadow-xl shadow-purple-300/30 cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <BadgeIndianRupee className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                              Match with Government Schemes
                            </h3>
                            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                              Discover Mudra, Stree Shakti & more schemes for your plan
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <span className="text-sm font-semibold text-white">
                            Explore
                          </span>
                          <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                  {/* Back buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-purple-100 text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
                    >
                      ← Back to Plan
                    </button>
                    <button
                      onClick={() => setActiveStep(1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-purple-100 text-slate-500 hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════════════════ TEMPLATES GALLERY ═══════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Business Plan{" "}
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                Templates
              </span>
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Jumpstart your journey with our curated, investor-approved plan
              blueprints
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TEMPLATES.map((template, idx) => {
              const TplIcon = template.icon;
              return (
                <motion.div
                  key={template.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx, duration: 0.4 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg shadow-purple-100/20 p-5 sm:p-6 cursor-pointer hover:shadow-xl hover:shadow-purple-200/30 transition-shadow"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center shadow-md mb-4`}
                  >
                    <TplIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-500 mb-1 block">
                    {template.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {template.desc}
                  </p>
                  <div className="flex items-center gap-1 text-violet-600 text-xs font-semibold group-hover:gap-2 transition-all">
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════════════ STATS BAR ═══════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 mb-6"
        >
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-xl shadow-purple-100/20 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {STATS.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-3">
                      <StatIcon className="w-5 h-5 text-violet-600" />
                    </div>
                    <span className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
