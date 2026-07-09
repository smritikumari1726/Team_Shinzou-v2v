import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Sparkles, Check, Copy, ShieldAlert, 
  RotateCcw, FileCheck 
} from "lucide-react";
import { AnalysisResult } from "../types";

export default function WorkEquity() {
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Preset templates
  const templates = [
    {
      title: "Tech Rockstar (High Bias)",
      text: "We are seeking a rockstar Software Engineer to dominate our market share. You will join an aggressive team of digital natives working in a high-octane environment. If you are a young, hungry hacker who can execute independently under high pressure and pull all-nighters to ship critical code, apply now! Must be willing to work hard and dominate the competition.",
      label: "Highly Biased",
      color: "text-rose-700 bg-rose-50 border-rose-200"
    },
    {
      title: "Operations Lead (Moderate Bias)",
      text: "Our department requires a strong, young Operations Manager who can handle manpower schedules. The ideal candidate is a digital native with an authoritative presence to steer the workforce. He must be willing to manage active warehouse environments and exert high physical effort where required.",
      label: "Moderately Biased",
      color: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
      title: "Marketing Lead (Highly Inclusive)",
      text: "We are looking for a collaborative Marketing Lead to guide our growth-oriented campaigns. You will work with a diverse cross-functional group to design inclusive outreach strategies. The ideal candidate values mentorship, values empathetic feedback, and has a proven track record of managing dynamic, cooperative project lifecycles.",
      label: "Fully Inclusive",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    }
  ];

  const applyTemplate = (text: string) => {
    setJobText(text);
    setResult(null);
    setError(null);
  };

  const runAnalysis = async () => {
    if (!jobText.trim()) {
      setError("Please paste or type a job description to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    const steps = [
      "Parsing vocabulary structure...",
      "Identifying gender-coded phrases...",
      "Analyzing ageism & demographic indicators...",
      "Drafting inclusive alternative rewrites...",
      "Calculating inclusive equity score..."
    ];

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800);

    try {
      const response = await fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: jobText })
      });

      if (!response.ok) throw new Error("Analysis failed. Please verify your connection.");

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return { text: "text-emerald-600", stroke: "#10b981", bg: "bg-emerald-50" };
    if (score >= 70) return { text: "text-amber-500", stroke: "#f59e0b", bg: "bg-amber-50" };
    return { text: "text-rose-500", stroke: "#f43f5e", bg: "bg-rose-50" };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-violet-200">
            <FileText className="w-6 h-6" />
          </div>
          <span className="gradient-text">WorkEquity Bias Analyzer</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
          Scan your job advertisements and internal hiring documentation for hidden barriers. Prevent qualified candidates from self-selecting out of your pipeline due to gendered or exclusive terminology.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div 
            className="glass rounded-2xl p-5 shadow-lg border-white/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-3.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>Try with a Template</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              {templates.map((temp, idx) => (
                <button
                  key={idx}
                  onClick={() => applyTemplate(temp.text)}
                  className="flex-1 text-left px-3.5 py-3 rounded-xl bg-white/50 border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 hover:shadow-md transition-all text-xs cursor-pointer group"
                >
                  <p className="font-bold text-slate-700 group-hover:text-violet-700 mb-2 leading-tight">{temp.title}</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${temp.color}`}>
                    {temp.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="glass rounded-2xl p-6 shadow-lg border-white/40 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800">Paste Job Description</label>
              <button 
                onClick={() => { setJobText(""); setResult(null); setError(null); }}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100 hover:border-rose-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job title, descriptions, or requirements here..."
              className="w-full h-72 p-4 text-sm bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 resize-none shadow-inner"
            />

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 bg-rose-50 p-3 rounded-lg border border-rose-100"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={runAnalysis}
              disabled={loading || !jobText.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer shadow-md shadow-violet-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              {loading && <div className="absolute inset-0 bg-white/20 skeleton" />}
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '3s' }} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Analyze Compliance & Bias</span>
                  </>
                )}
              </span>
            </button>

            <AnimatePresence>
              {loading && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-xs font-mono font-medium text-violet-700 animate-pulse mt-3 bg-violet-50/80 py-2 rounded-lg border border-violet-100"
                >
                  ⚙️ {loadingStep === 0 && "Parsing vocabulary structure..."}
                  {loadingStep === 1 && "Identifying gender-coded phrases..."}
                  {loadingStep === 2 && "Analyzing ageism & demographic indicators..."}
                  {loadingStep === 3 && "Drafting inclusive alternative rewrites..."}
                  {loadingStep === 4 && "Calculating inclusive equity score..."}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-6 h-full">
          {!result && !loading && (
            <motion.div 
              className="glass border-2 border-dashed border-violet-200/50 rounded-2xl p-12 text-center h-[540px] flex flex-col justify-center items-center shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="w-10 h-10 text-violet-300" />
              </div>
              <h4 className="font-display font-bold text-slate-700 text-lg">No Active Scan</h4>
              <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
                Select one of the quick templates on the left or paste your custom text, then click "Analyze" to see detailed inclusion reports.
              </p>
            </motion.div>
          )}

          {loading && (
            <div className="glass rounded-2xl p-6 shadow-lg h-[540px] flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 skeleton" />
                <div className="space-y-3 flex-1">
                  <div className="h-4 bg-slate-200 skeleton rounded w-1/3" />
                  <div className="h-3 bg-slate-200 skeleton rounded w-1/4" />
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="h-4 bg-slate-200 skeleton rounded w-full" />
                <div className="h-4 bg-slate-200 skeleton rounded w-5/6" />
                <div className="h-4 bg-slate-200 skeleton rounded w-4/5" />
              </div>
              <div className="border-t border-slate-100/50 pt-6 space-y-4 mt-auto">
                <div className="h-24 bg-slate-100 skeleton rounded-xl" />
              </div>
            </div>
          )}

          <AnimatePresence>
            {result && !loading && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                
                {/* Score Card */}
                <div className="glass rounded-2xl p-6 shadow-lg border-white/40 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-bl-[100px] -z-10" />
                  
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle cx="56" cy="56" r="46" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                      <motion.circle 
                        cx="56" 
                        cy="56" 
                        r="46" 
                        stroke={getScoreColor(result.score).stroke}
                        strokeWidth="10" 
                        fill="transparent" 
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "289", strokeDashoffset: "289" }}
                        animate={{ strokeDashoffset: 289 - (289 * result.score) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute text-3xl font-black font-display text-slate-800">
                      {result.score}
                    </span>
                  </div>

                  <div className="text-center sm:text-left space-y-2">
                    <p className="text-[10px] font-mono font-bold text-violet-500 uppercase tracking-widest bg-violet-50 inline-block px-2 py-0.5 rounded border border-violet-100">Inclusion Index</p>
                    <h3 className={`font-display text-2xl font-black uppercase ${getScoreColor(result.score).text}`}>
                      {result.biasLevel}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {result.score >= 90 ? "Excellent. The document utilizes highly inclusive, supportive language suitable for attracting diverse professionals." : 
                       result.score >= 70 ? "Some gender-coded or minor exclusive indicators found. Consider adjusting highlighted words." : 
                       "Warning: Substantial coded bias or aggressive terms detected. Highly recommended to use the generated rewrite below."}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="glass rounded-2xl p-6 shadow-lg border-white/40 space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-violet-500" />
                    <span>Identified Exclusionary Terminology</span>
                  </h4>

                  <div className="space-y-3 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                    {result.highlights.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-3.5 bg-white border border-slate-100 rounded-xl space-y-1.5 shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-rose-600 uppercase tracking-wide bg-rose-50 px-2 py-0.5 rounded text-[10px] border border-rose-100">
                            {item.category}
                          </span>
                          <span className="font-mono text-slate-400 text-[10px]">Issue #{idx+1}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800">
                          Flagged word: <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 font-mono text-xs">{item.text}</span>
                        </p>
                        <p className="text-xs text-slate-500 italic leading-relaxed">{item.explanation}</p>
                      </motion.div>
                    ))}

                    {result.highlights.length === 0 && (
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                        <Check className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                        <p className="text-sm text-emerald-700 font-medium">No exclusive phrases or bias detected in this scan. Exceptional drafting!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rewrite */}
                <motion.div 
                  className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <h4 className="text-sm font-bold flex items-center gap-2 text-violet-200">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>AI Inclusive Rewrite</span>
                    </h4>
                    <button
                      onClick={() => copyToClipboard(result.rewrite)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm border border-white/10"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-h-[160px] overflow-y-auto text-sm leading-relaxed text-slate-200 font-sans whitespace-pre-line custom-scrollbar relative z-10 shadow-inner">
                    {result.rewrite}
                  </div>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
