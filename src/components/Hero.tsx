import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  FileSearch, MessageCircle, TrendingUp, ShieldCheck, Users, 
  Sparkles, ChevronRight, Gem, HandCoins, Rocket, Scale, 
  GraduationCap, ArrowRight, Play, Star, Zap
} from "lucide-react";

export default function Hero() {
  const stats = [
    { value: "$1.2M+", label: "Capital Match Assisted", icon: HandCoins, color: "text-emerald-600", bg: "bg-emerald-50" },
    { value: "95/100", label: "Avg Inclusion Score", icon: ShieldCheck, color: "text-violet-600", bg: "bg-violet-50" },
    { value: "5,000+", label: "Women Entrepreneurs Guided", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { value: "12,400+", label: "Inclusive Job Audits", icon: FileSearch, color: "text-pink-600", bg: "bg-pink-50" },
  ];

  const features = [
    {
      path: "/workequity",
      title: "WorkEquity Bias Analyzer",
      description: "Instantly detect gendered language, ageist buzzwords, and non-inclusive phrasing. Receive optimized, inclusive rewrites to attract diverse world-class talent.",
      icon: FileSearch,
      accent: "from-violet-500 to-indigo-600",
      pill: "AI-Powered",
      actionText: "Analyze Job Descriptions",
    },
    {
      path: "/herfinance",
      title: "HerFinance AI Guide",
      description: "Chat with HerAssistant, our empathetic financial guide. Unlock answers regarding Mudra schemes, Stree Shakti grants, Udyam MSME, and tax advantages.",
      icon: MessageCircle,
      accent: "from-pink-500 to-rose-600",
      pill: "24/7 Companion",
      actionText: "Chat with HerAssistant",
    },
    {
      path: "/dashboard",
      title: "Equity Funding Portal",
      description: "Organize your business profile to verify eligibility for micro-grants, government loans, and corporate sponsorships. Track ongoing applications live.",
      icon: TrendingUp,
      accent: "from-emerald-500 to-teal-600",
      pill: "Live Tracker",
      actionText: "Check Eligibility",
    },
  ];

  const newFeatures = [
    {
      path: "/mentorship",
      title: "Mentorship Hub",
      description: "Connect with 500+ industry-leading women mentors for 1-on-1 guidance.",
      icon: Users,
      color: "text-fuchsia-600",
      bg: "bg-fuchsia-50",
    },
    {
      path: "/salary-insights",
      title: "Salary Insights",
      description: "Close the pay gap with transparent salary data and AI negotiation coaching.",
      icon: TrendingUp,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      path: "/herventure",
      title: "HerVenture",
      description: "Generate professional business plans and pitch decks with AI assistance.",
      icon: Rocket,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      path: "/legal-rights",
      title: "Legal Rights",
      description: "Know your workplace rights — maternity benefits, POSH, equal pay laws.",
      icon: Scale,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      path: "/skill-pathway",
      title: "Skill Pathway",
      description: "Personalized upskilling roadmaps with free government-funded courses.",
      icon: GraduationCap,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  const stories = [
    {
      name: "Priyal Sen",
      role: "Founder of CraftSpire Boutique",
      quote: "Using ForHer, I configured my retail shop profile and received instant Mudra loan guidance. Within weeks, I had a collateral-free loan approved!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      tag: "Micro-Loan Match",
      rating: 5,
    },
    {
      name: "Anjali Mehta",
      role: "VP of People at DeltaTech",
      quote: "The WorkEquity Analyzer transformed our hiring loop. By screening job descriptions for coded language, our qualified female applicant pool spiked by 42%.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
      tag: "Inclusion Audit",
      rating: 5,
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Choose Your Tool",
      description: "Select from WorkEquity, HerFinance, Mentorship, or any of our 8 powerful modules.",
      icon: Sparkles,
    },
    {
      step: "02",
      title: "AI Analyzes & Guides",
      description: "Our Gemini-powered AI processes your input and provides actionable insights in seconds.",
      icon: Zap,
    },
    {
      step: "03",
      title: "Take Action & Grow",
      description: "Apply for schemes, fix biased job posts, connect with mentors, and accelerate your career.",
      icon: ArrowRight,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden pt-16 pb-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-pink-50/30 -z-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-200/30 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold tracking-wide uppercase border border-violet-100 mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Empowering Economic Equity</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Empowering Women{" "}
                <br />
                <span className="gradient-text">
                  Through Fair Careers &
                </span>
                <br />
                <span className="gradient-text-pink">
                  Financial Freedom
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                AI-powered tools to detect bias in job postings, simplify government loan schemes, 
                and give women entrepreneurs the mentorship, salary data, and skills to thrive.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/workequity"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/herfinance"
                  className="px-7 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-violet-300 text-slate-700 hover:text-violet-700 font-semibold hover:bg-violet-50/30 transition-all duration-300 text-center shadow-sm"
                >
                  Explore Features
                </Link>
              </div>
            </motion.div>

            {/* Right - Hero Image & Interactive Card */}
            <motion.div
              className="mt-12 lg:mt-0 lg:col-span-6 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Hero illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-3xl blur-2xl" />
                <img 
                  src="/assets/hero_illustration.jpg" 
                  alt="Empowered woman using AI technology" 
                  className="relative rounded-3xl shadow-2xl shadow-violet-200/50 w-full object-cover max-h-[420px]"
                />
                
                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <Gem className="w-3.5 h-3.5" />
                  <span>AI-Powered Suite</span>
                </motion.div>

                {/* Floating stat card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Fairness Score</p>
                      <p className="text-lg font-bold text-emerald-600 font-display">95/100</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Impact Stats ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="glass rounded-2xl p-5 flex items-center space-x-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h4>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── How It Works ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">How It Works</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mt-4 mb-4">
            Three Simple Steps to Empowerment
          </h2>
          <p className="text-base text-slate-600">
            From analysis to action — ForHer simplifies the entire journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-violet-200 via-indigo-200 to-purple-200" />
          
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white mb-6 shadow-lg shadow-violet-200 relative z-10">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 text-xs font-bold text-violet-500 font-mono">{step.step}</span>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── Core Features Grid ─── */}
      <div className="bg-white border-y border-violet-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Designed to Bridge the Economic Gender Gap
            </h2>
            <p className="text-base text-slate-600">
              ForHer integrates cutting-edge bias scanners with funding dashboards and AI coaching, tailored to your workplace and financing goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={feat.path}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feat.accent} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
                        {feat.pill}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>
                  <Link
                    to={feat.path}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-violet-50 text-slate-700 hover:text-violet-700 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-violet-100"
                  >
                    <span>{feat.actionText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── New Features Showcase ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">New in ForHer</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mt-4 mb-4">
            Beyond Jobs & Loans — A Complete Ecosystem
          </h2>
          <p className="text-base text-slate-600">
            Discover mentorship, salary insights, business planning, legal rights, and personalized skill development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {newFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  to={feat.path}
                  className="block p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-lg hover:border-violet-200 transition-all duration-300 group h-full"
                >
                  <div className={`${feat.bg} ${feat.color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 mb-1.5">{feat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.description}</p>
                  <div className="mt-3 text-xs font-semibold text-violet-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── Success Stories ─── */}
      <div className="bg-white border-t border-b border-violet-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">Success Stories</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mt-4 mb-4">
                Inspiring Women <br />Scaling Businesses
              </h2>
              <p className="text-base text-slate-600 mb-6 leading-relaxed">
                By providing immediate access to bias-free compliance frameworks and simplified capital matches, ForHer lowers the overhead for women-led startups.
              </p>
              <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                <p className="text-xs font-semibold text-violet-800">Did you know?</p>
                <p className="text-xs text-slate-600 mt-1">
                  Women-led small businesses have a repayment success rate exceeding 98% on government micro-finance programs.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stories.map((story, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                        {story.tag}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: story.rating }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm italic text-slate-600 leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-100">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-violet-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{story.name}</h4>
                      <p className="text-xs text-slate-500">{story.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FAQ Section ─── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "Is ForHer free to use?",
              a: "Yes! ForHer is completely free for individual women entrepreneurs and professionals. We believe in democratizing access to fair careers and financial empowerment tools."
            },
            {
              q: "How does the bias analyzer work?",
              a: "Our AI, powered by Google's Gemini, scans your job descriptions for gendered language, ageist terms, and non-inclusive phrasing. It then provides a fairness score and suggests inclusive rewrites."
            },
            {
              q: "Which government schemes does HerFinance cover?",
              a: "We cover 50+ schemes including PMMY Mudra Loans, Stree Shakti Package, Mahila Udyam Nidhi, Stand-Up India, and many state-specific programs. Our AI stays updated with the latest eligibility criteria."
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. All financial evaluations and documents are processed through secure encrypted channels. We do not store any private data permanently on our servers."
            },
          ].map((faq, i) => (
            <motion.details
              key={i}
              className="group bg-white border border-slate-100 rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <summary className="font-display font-bold text-slate-900 text-sm list-none flex justify-between items-center">
                <span>{faq.q}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </div>

      {/* ─── CTA Banner ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-gradient-to-r from-violet-700 via-indigo-800 to-purple-800 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl animated-gradient">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h3 className="font-display text-3xl font-bold sm:text-4xl mb-4">
              Ready to Accelerate Your Journey?
            </h3>
            <p className="text-violet-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Leverage AI to optimize recruitment, verify funding eligibility, connect with mentors, and build your empire.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/herfinance"
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold rounded-xl shadow-lg transition-all duration-300"
              >
                Consult AI Advisor
              </Link>
              <Link
                to="/dashboard"
                className="px-7 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl border border-violet-400/50 transition-all duration-300"
              >
                Access Portal Hub
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
