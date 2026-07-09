import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Landmark, UserCheck, FileCheck2, Compass, 
  CheckCircle, Clock, Info, Check, PieChart as PieIcon, Sparkles
} from "lucide-react";
import { FinancialProfile, LoanScheme } from "../types";

export default function EquityDashboard() {
  const [profile, setProfile] = useState<FinancialProfile>(() => {
    const saved = localStorage.getItem("forher_financial_profile");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      businessName: "CraftSpire Boutique",
      industry: "Handicrafts & Textiles",
      businessType: "Proprietorship",
      monthlyRevenue: "₹2,50,000",
      fundingNeeded: "₹5,00,000",
      isRegisteredMSME: true,
    };
  });

  const updateProfileField = (key: keyof FinancialProfile, value: any) => {
    const updated = { ...profile, [key]: value };
    setProfile(updated);
    localStorage.setItem("forher_financial_profile", JSON.stringify(updated));
  };

  const schemes: LoanScheme[] = [
    {
      id: "stree-shakti",
      name: "Stree Shakti Package",
      sponsor: "State Bank of India (SBI)",
      maxAmount: "₹5,00,000",
      interestRate: "0.5% Concession (approx 8.1%)",
      repaymentPeriod: "Up to 36 months",
      eligibility: "Women-owned retail, manufacturing, or service sectors with >51% equity share.",
      keyBenefits: [
        "No collateral required for loans up to ₹5,00,000",
        "Waived processing fees for eligible applicants",
        "Low interest concession rate structure"
      ]
    },
    {
      id: "mudra-kishor",
      name: "PMMY Mudra Loan (Kishor)",
      sponsor: "Government of India / National Banks",
      maxAmount: "₹10,00,000",
      interestRate: "8.45% - 11.20% p.a.",
      repaymentPeriod: "Up to 60 months",
      eligibility: "Establishments in food, retail, tailoring, or craftsmanship. No collateral required.",
      keyBenefits: [
        "Zero security or collateral deposits",
        "Offers Mudra Card for seamless working capital",
        "Skill training under Pradhan Mantri Kaushal Yojana"
      ]
    },
    {
      id: "mahila-udyam",
      name: "Mahila Udyam Nidhi Scheme",
      sponsor: "SIDBI",
      maxAmount: "₹10,00,000",
      interestRate: "9.25% (Floating)",
      repaymentPeriod: "Up to 10 years",
      eligibility: "New women-led micro and small scale industries. Assists in upgrading machinery.",
      keyBenefits: [
        "Extraordinary long repayment tenure (120 months)",
        "Moratorium window up to 24 months to help initial scaling",
        "Can be combined with local state industrial grants"
      ]
    },
    {
      id: "standup-india",
      name: "Stand-Up India Scheme",
      sponsor: "National Scheduled Banks",
      maxAmount: "₹1,00,00,000",
      interestRate: "Lowest bank rate (7.4% - 8.9%)",
      repaymentPeriod: "Up to 7 years",
      eligibility: "Greenfield enterprises. At least one woman borrower per bank branch.",
      keyBenefits: [
        "Covers up to 75% of total project costs",
        "Includes comprehensive mentoring support via SIDBI",
        "Exemplary repayment structural limits"
      ]
    }
  ];

  const [appStatuses, setAppStatuses] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("forher_app_statuses");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      "stree-shakti": "Under Review",
      "mudra-kishor": "Preparing Documents",
      "mahila-udyam": "Not Started",
      "standup-india": "Not Started"
    };
  });

  const updateAppStatus = (schemeId: string, status: string) => {
    const updated = { ...appStatuses, [schemeId]: status };
    setAppStatuses(updated);
    localStorage.setItem("forher_app_statuses", JSON.stringify(updated));
  };

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>("stree-shakti");
  const selectedScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];

  const [documents, setDocuments] = useState<Record<string, boolean>>({
    "Aadhaar Identity Proof": true,
    "PAN Card for Owner": true,
    "MSME Udyam Certificate": true,
    "6-Month Bank Statements": false,
    "Business Site Lease Deed": false,
    "Project Revenue Estimate": false,
  });

  const toggleDoc = (doc: string) => {
    setDocuments(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  const calculateMatchScore = (scheme: LoanScheme) => {
    let score = 75;
    if (profile.isRegisteredMSME) score += 15;
    if (scheme.id === "stree-shakti" && profile.industry === "Handicrafts & Textiles") score += 5;
    if (scheme.id === "mudra-kishor" && (profile.industry === "Handicrafts & Textiles" || profile.industry === "Food & Retail")) score += 8;
    if (scheme.id === "mahila-udyam" && profile.isRegisteredMSME) score += 4;
    return Math.min(score, 100);
  };

  const getBudgetAllocation = () => {
    switch (profile.industry) {
      case "Handicrafts & Textiles":
        return [
          { name: "Raw Materials", value: 35, color: "#9333ea" },
          { name: "Working Capital", value: 25, color: "#4f46e5" },
          { name: "Machinery & Loom", value: 25, color: "#06b6d4" },
          { name: "Marketing", value: 15, color: "#ec4899" }
        ];
      case "IT & Consulting":
        return [
          { name: "Infrastructure", value: 40, color: "#9333ea" },
          { name: "Human Capital", value: 30, color: "#4f46e5" },
          { name: "Marketing", value: 15, color: "#06b6d4" },
          { name: "Operations", value: 15, color: "#ec4899" }
        ];
      case "Food & Retail":
        return [
          { name: "Store Inventory", value: 45, color: "#9333ea" },
          { name: "Rent/POS", value: 20, color: "#4f46e5" },
          { name: "Marketing", value: 15, color: "#06b6d4" },
          { name: "Payroll", value: 20, color: "#ec4899" }
        ];
      default:
        return [
          { name: "Capital Overhead", value: 40, color: "#9333ea" },
          { name: "Working Capital", value: 30, color: "#4f46e5" },
          { name: "Setup", value: 20, color: "#06b6d4" },
          { name: "Marketing", value: 10, color: "#ec4899" }
        ];
    }
  };

  const budgetAllocation = getBudgetAllocation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl text-white shadow-lg shadow-emerald-200">
            <Landmark className="w-6 h-6" />
          </div>
          <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">Equity Funding Portal</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
          Customize your micro-enterprise profile to match specialized women-centric capital schemes, check dynamic compliance ratios, and track active loan applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            className="glass rounded-2xl p-6 shadow-lg border-white/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
              <UserCheck className="w-4.5 h-4.5 text-emerald-500" />
              <span>Business Profile Settings</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Business Name</label>
                <input 
                  type="text" 
                  value={profile.businessName}
                  onChange={(e) => updateProfileField("businessName", e.target.value)}
                  className="w-full text-sm p-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-semibold shadow-inner"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Industry Sector</label>
                <select 
                  value={profile.industry}
                  onChange={(e) => updateProfileField("industry", e.target.value)}
                  className="w-full text-sm p-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-semibold cursor-pointer shadow-inner"
                >
                  <option>Handicrafts & Textiles</option>
                  <option>IT & Consulting</option>
                  <option>Food & Retail</option>
                  <option>Healthcare & Biotech</option>
                  <option>Agriculture & Dairy</option>
                  <option>Education & Arts</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Monthly Rev</label>
                  <select 
                    value={profile.monthlyRevenue}
                    onChange={(e) => updateProfileField("monthlyRevenue", e.target.value)}
                    className="w-full text-sm p-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-semibold cursor-pointer shadow-inner"
                  >
                    <option>₹50,000</option>
                    <option>₹2,50,000</option>
                    <option>₹5,00,000</option>
                    <option>₹10,00,000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Capital Goal</label>
                  <select 
                    value={profile.fundingNeeded}
                    onChange={(e) => updateProfileField("fundingNeeded", e.target.value)}
                    className="w-full text-sm p-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-semibold cursor-pointer shadow-inner"
                  >
                    <option>₹2,00,000</option>
                    <option>₹5,00,000</option>
                    <option>₹10,00,000</option>
                    <option>₹25,00,000</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => updateProfileField("isRegisteredMSME", !profile.isRegisteredMSME)}
                  className={`flex items-center justify-between w-full p-3.5 border rounded-xl text-left cursor-pointer transition-all ${
                    profile.isRegisteredMSME 
                      ? "bg-emerald-50/80 border-emerald-200 shadow-sm" 
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div>
                    <p className={`text-sm font-bold ${profile.isRegisteredMSME ? "text-emerald-800" : "text-slate-700"}`}>Udyam MSME Registered</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Provides concession advantages</p>
                  </div>
                  <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${profile.isRegisteredMSME ? "bg-emerald-500" : "bg-slate-300"}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform duration-300 ${profile.isRegisteredMSME ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass rounded-2xl p-6 shadow-lg border-white/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
              <PieIcon className="w-4.5 h-4.5 text-teal-500" />
              <span>Recommended Capital Distribution</span>
            </h3>
            
            <div className="flex items-center justify-center py-4">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  {(() => {
                    let accumulatedPercent = 0;
                    return budgetAllocation.map((item, index) => {
                      const radius = 40;
                      const strokeWidth = 12;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = `${-accumulatedPercent * circumference}`;
                      accumulatedPercent += item.value / 100;
                      
                      return (
                        <motion.circle
                          key={index}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth={strokeWidth}
                          initial={{ strokeDasharray: `0 ${circumference}` }}
                          animate={{ strokeDasharray }}
                          style={{ strokeDashoffset }}
                          transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                          className="origin-center hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-slate-800 text-center leading-tight">
                    {(profile.industry || "Business").split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {budgetAllocation.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-1.5 rounded hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-semibold">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top Row: Eligibility Matches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((scheme, idx) => {
              const isSelected = scheme.id === selectedSchemeId;
              const status = appStatuses[scheme.id];
              const matchScore = calculateMatchScore(scheme);

              return (
                <motion.button
                  key={scheme.id}
                  onClick={() => setSelectedSchemeId(scheme.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`p-5 glass border rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group ${
                    isSelected ? "ring-2 ring-emerald-500 border-transparent shadow-lg bg-white/90" : "border-white/40 shadow-sm hover:shadow-md hover:bg-white/60"
                  }`}
                >
                  {isSelected && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl -z-10" />}

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest block mb-1">{scheme.sponsor.toUpperCase()}</span>
                      <h4 className={`font-display font-bold text-base transition-colors line-clamp-1 ${isSelected ? "text-emerald-700" : "text-slate-800"}`}>
                        {scheme.name}
                      </h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border ${
                      matchScore >= 90 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {matchScore}% Match
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-3 border-t border-slate-200/50">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 mb-0.5">Max Cover</p>
                      <p className="font-bold text-slate-700 font-mono text-sm">{scheme.maxAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-slate-400 mb-0.5">Status</p>
                      <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] border ${
                        status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        status === "Under Review" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                        status === "Preparing Documents" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-50 text-slate-500 border-slate-200"
                      }`}>
                        {status}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Scheme Detail & Tracker */}
          <motion.div 
            className="glass rounded-2xl p-6 md:p-8 shadow-xl border-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200/60 pb-5 gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 font-mono tracking-widest block bg-emerald-50 w-fit px-2 py-0.5 rounded border border-emerald-100 mb-2">ACTIVE SCHEME STUDY</span>
                <h3 className="font-display text-2xl font-bold text-slate-900">{selectedScheme.name}</h3>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                  <span className="font-medium text-slate-600">{selectedScheme.sponsor}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded">{selectedScheme.repaymentPeriod}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">{selectedScheme.interestRate}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-2">Status:</label>
                <select
                  value={appStatuses[selectedScheme.id]}
                  onChange={(e) => updateAppStatus(selectedScheme.id, e.target.value)}
                  className="text-xs font-bold p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 cursor-pointer shadow-sm"
                >
                  <option>Not Started</option>
                  <option>Preparing Documents</option>
                  <option>Under Review</option>
                  <option>Approved</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Key Package Benefits
                  </h4>
                  <ul className="space-y-3">
                    {selectedScheme.keyBenefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium bg-white/50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm space-y-2 text-sm">
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Compass className="w-4.5 h-4.5 text-teal-500" />
                    <span>Eligibility Summary</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed font-medium">{selectedScheme.eligibility}</p>
                </div>
              </div>

              <div className="bg-white/60 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <FileCheck2 className="w-4.5 h-4.5 text-emerald-600" />
                      <span>Document Checklist</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">Cross-verify before submitting</p>
                  </div>
                  <span className="text-xs font-bold font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                    {Object.values(documents).filter(Boolean).length}/{Object.keys(documents).length} Sync'd
                  </span>
                </div>

                <div className="space-y-2">
                  {Object.entries(documents).map(([docName, isChecked]) => (
                    <button
                      key={docName}
                      onClick={() => toggleDoc(docName)}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer hover:bg-emerald-50/50 bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-sm group"
                    >
                      <span className={`text-xs font-semibold transition-colors ${isChecked ? "text-slate-400 line-through" : "text-slate-700 group-hover:text-emerald-700"}`}>
                        {docName}
                      </span>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        isChecked ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" : "border-slate-300 bg-slate-50 group-hover:border-emerald-400"
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex justify-center">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Verification takes 5-7 days</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
