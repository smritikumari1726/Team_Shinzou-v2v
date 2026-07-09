import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  BarChart3,
  MessageSquare,
  Sparkles,
  Send,
  Lightbulb,
  Target,
  ArrowRight,
  BriefcaseBusiness,
  Users,
  BadgePercent,
  IndianRupee,
  CheckCircle2,
  Bot,
  ChevronRight,
  Zap,
  Award,
  ShieldCheck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface RoleData {
  role: string;
  menSalary: number;
  womenSalary: number;
  gap: number;
  industry: string;
}

const salaryData: RoleData[] = [
  { role: 'Software Engineer', menSalary: 18, womenSalary: 14, gap: 22, industry: 'Tech' },
  { role: 'Marketing Manager', menSalary: 15, womenSalary: 12, gap: 20, industry: 'Marketing' },
  { role: 'Data Analyst', menSalary: 12, womenSalary: 9.5, gap: 21, industry: 'Tech' },
  { role: 'Product Manager', menSalary: 22, womenSalary: 17, gap: 23, industry: 'Tech' },
];

const industries = ['All', 'Tech', 'Marketing', 'Finance', 'Healthcare'];

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  opening: string;
}

const scenarios: Scenario[] = [
  {
    id: 'first-job',
    title: 'First Job Offer',
    icon: <BriefcaseBusiness className="w-5 h-5" />,
    description: 'Learn to negotiate your very first salary offer with confidence.',
    opening:
      "Congratulations on your offer! The company has offered ₹8 LPA for the Junior Developer role. How would you like to respond?",
  },
  {
    id: 'annual-raise',
    title: 'Annual Raise',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Practice asking for a well-deserved raise during your appraisal.',
    opening:
      "It's appraisal season. You've exceeded targets by 30% this year. Your manager asks: \"What are your expectations?\" How do you respond?",
  },
  {
    id: 'counter-offer',
    title: 'Counter Offer',
    icon: <Target className="w-5 h-5" />,
    description: 'Master the art of countering a low-ball offer professionally.',
    opening:
      "You've received an offer of ₹14 LPA, but your market research shows the role pays ₹17-20 LPA. The recruiter asks: \"Is this acceptable?\" What do you say?",
  },
];

const negotiationTips = [
  { tip: 'Always research market rates before negotiating.', icon: <BarChart3 className="w-4 h-4" /> },
  { tip: 'Quantify your achievements — use numbers and metrics.', icon: <Target className="w-4 h-4" /> },
  { tip: 'Practice the "silence technique" — pause after stating your number.', icon: <Sparkles className="w-4 h-4" /> },
  { tip: 'Never reveal your current salary first — ask for their range.', icon: <ShieldCheck className="w-4 h-4" /> },
  { tip: 'Negotiate total compensation, not just base salary.', icon: <Award className="w-4 h-4" /> },
];

const impactStats = [
  { label: 'Avg Pay Gap', value: '23%', icon: <BadgePercent className="w-6 h-6" />, color: 'from-rose-400 to-pink-500' },
  {
    label: 'Avg Salary Increase After Negotiation',
    value: '₹3.2L',
    icon: <IndianRupee className="w-6 h-6" />,
    color: 'from-violet-400 to-purple-500',
  },
  { label: 'Success Rate', value: '85%', icon: <CheckCircle2 className="w-6 h-6" />, color: 'from-fuchsia-400 to-pink-500' },
];

/* ------------------------------------------------------------------ */
/*  Chat message type                                                  */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SalaryInsights() {
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');

  /* ---------- Salary filter ---------- */
  const filteredRoles =
    activeIndustry === 'All' ? salaryData : salaryData.filter((r) => r.industry === activeIndustry);

  /* ---------- Max salary for bar scale ---------- */
  const maxSalary = Math.max(...salaryData.map((r) => r.menSalary));

  /* ---------- Scenario helpers ---------- */
  const startScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setChatMessages([{ sender: 'bot', text: scenario.opening }]);
    setUserInput('');
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;
    const newMessages: ChatMessage[] = [
      ...chatMessages,
      { sender: 'user', text: userInput.trim() },
    ];

    // Simple AI-coach mock responses
    const responses = [
      "Great approach! Remember to stay confident and back your ask with data. What specific achievements can you highlight?",
      "That's a strong point. Consider also mentioning your unique skills that are hard to replace. What else sets you apart?",
      "Excellent negotiation move! Now try asking about benefits, equity, or flexible working as part of total compensation.",
      "Well done! You're showing real negotiation strength. Remember — the first person to name a number often loses leverage.",
      "Perfect — always keep the conversation collaborative, not adversarial. You're doing wonderfully!",
    ];

    const botReply = responses[Math.min(newMessages.filter((m) => m.sender === 'user').length - 1, responses.length - 1)];
    newMessages.push({ sender: 'bot', text: botReply });

    setChatMessages(newMessages);
    setUserInput('');
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-950 text-white overflow-x-hidden">
      {/* ---------- Ambient blobs ---------- */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-fuchsia-600/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* ============================================================ */}
        {/* HERO HEADER                                                   */}
        {/* ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 pt-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
          >
            <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-300 bg-clip-text text-transparent leading-tight">
            Salary Insights &amp; Negotiation
          </h1>
          <p className="font-sans text-lg sm:text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
            Closing the gender pay gap starts with knowledge. Explore real salary data, practice
            negotiation with our AI coach, and take control of your earning potential.
          </p>

          <Link
            to="#comparison"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium hover:bg-white/20 transition-all"
          >
            Explore Data <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>

        {/* ============================================================ */}
        {/* IMPACT STATS                                                  */}
        {/* ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center overflow-hidden hover:border-purple-400/40 transition-all duration-300"
            >
              {/* glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.color} blur-3xl -z-10`}
                style={{ transform: 'scale(0.6)' }}
              />
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>{stat.icon}</div>
              </div>
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
              <p className="font-sans text-sm text-purple-200/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* ============================================================ */}
        {/* SALARY COMPARISON                                             */}
        {/* ============================================================ */}
        <motion.section
          id="comparison"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Salary Comparison
              </h2>
              <p className="font-sans text-purple-200/70 mt-1">
                Side-by-side gender pay data across popular roles.
              </p>
            </div>
            {/* Industry filter pills */}
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    activeIndustry === ind
                      ? 'bg-purple-500/90 border-purple-400 text-white shadow-md shadow-purple-500/30'
                      : 'bg-white/5 border-white/15 text-purple-200 hover:bg-white/10'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Bar charts */}
          <div className="grid gap-5">
            {filteredRoles.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center text-purple-300/70 font-sans">
                No roles found for <span className="font-semibold text-purple-300">{activeIndustry}</span>. More data coming soon!
              </div>
            )}

            {filteredRoles.map((role, i) => (
              <motion.div
                key={role.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-purple-400/30 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="font-display text-lg font-semibold text-white">{role.role}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                    <BadgePercent className="w-3 h-3" /> {role.gap}% gap
                  </span>
                </div>

                {/* Men bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Men
                    </span>
                    <span className="font-sans text-xs text-slate-300 font-medium">₹{role.menSalary} LPA</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(role.menSalary / maxSalary) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                    />
                  </div>
                </div>

                {/* Women bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Women
                    </span>
                    <span className="font-sans text-xs text-slate-300 font-medium">₹{role.womenSalary} LPA</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(role.womenSalary / maxSalary) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.35 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* AI NEGOTIATION COACH                                          */}
        {/* ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-sm text-purple-300 font-medium mb-2">
              <Sparkles className="w-4 h-4" /> AI-Powered
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Negotiation Coach
            </h2>
            <p className="font-sans text-purple-200/70 max-w-xl mx-auto">
              Practice real-world salary negotiations in a safe environment. Choose a scenario and
              start practising.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* ------ Scenario Cards ------ */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> Scenarios
              </h3>
              {scenarios.map((sc, i) => (
                <motion.button
                  key={sc.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => startScenario(sc)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 group/card ${
                    activeScenario?.id === sc.id
                      ? 'border-purple-400/60 bg-purple-500/15 shadow-lg shadow-purple-500/10'
                      : 'border-white/10 bg-white/5 hover:border-purple-400/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-xl ${
                        activeScenario?.id === sc.id
                          ? 'bg-purple-500/30 text-purple-200'
                          : 'bg-white/10 text-purple-300 group-hover/card:bg-purple-500/20'
                      } transition-colors`}
                    >
                      {sc.icon}
                    </div>
                    <span className="font-display font-semibold text-white text-sm">{sc.title}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-purple-400 opacity-50 group-hover/card:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-sans text-xs text-purple-200/60 leading-relaxed pl-11">
                    {sc.description}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* ------ Chat Interface ------ */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden min-h-[420px]">
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-sm">ForHer Coach</p>
                  <p className="font-sans text-[11px] text-emerald-400">● Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20">
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-purple-300/60">
                    <MessageSquare className="w-10 h-10" />
                    <p className="font-sans text-sm max-w-xs">
                      Select a scenario from the left to start practising your negotiation skills.
                    </p>
                  </div>
                )}

                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-sans leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-br-md'
                          : 'bg-white/10 text-purple-100 border border-white/10 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={activeScenario ? 'Type your response…' : 'Select a scenario first'}
                    disabled={!activeScenario}
                    className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-40 font-sans transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!activeScenario || !userInput.trim()}
                    className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ------ Negotiation Tips ------ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          >
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-5">
              <Lightbulb className="w-5 h-5 text-yellow-400" /> Negotiation Power Tips
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {negotiationTips.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-200"
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
                    {t.icon}
                  </div>
                  <p className="font-sans text-sm text-purple-100/80 leading-relaxed">{t.tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ============================================================ */}
        {/* CTA FOOTER                                                    */}
        {/* ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/20 to-pink-500/30 blur-sm" />
          <div className="relative backdrop-blur-xl px-8 py-12 text-center space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Ready to Own Your Worth?
            </h2>
            <p className="font-sans text-purple-200/80 max-w-lg mx-auto">
              Join thousands of women who have successfully negotiated better salaries using ForHer's
              tools and community support.
            </p>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Join the Community <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
