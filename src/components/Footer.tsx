import React from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, ShieldCheck, Twitter, Linkedin, Instagram, Github, 
  Heart, Mail, MapPin, ExternalLink
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                ForHer
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              An AI-powered economic equity platform dedicated to empowering women founders, 
              professionals, and entrepreneurs with bias-free workplaces, financial freedom, 
              and career growth tools.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
                { icon: Github, label: "GitHub" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.label}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-violet-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110"
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Core Modules</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/workequity" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  WorkEquity Analyzer
                </Link>
              </li>
              <li>
                <Link to="/herfinance" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  HerFinance AI Guide
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  Equity Funding Portal
                </Link>
              </li>
              <li>
                <Link to="/herventure" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  HerVenture Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Growth & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Growth & Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/mentorship" className="hover:text-violet-400 transition-colors">
                  Mentorship Hub
                </Link>
              </li>
              <li>
                <Link to="/salary-insights" className="hover:text-violet-400 transition-colors">
                  Salary Insights
                </Link>
              </li>
              <li>
                <Link to="/skill-pathway" className="hover:text-violet-400 transition-colors">
                  Skill Pathway
                </Link>
              </li>
              <li>
                <Link to="/legal-rights" className="hover:text-violet-400 transition-colors">
                  Legal Rights
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Privacy */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Integrations</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Gemini AI API</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>End-to-End Encryption</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Udyam Verification</span>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-xs leading-relaxed text-slate-500">
                All data is processed securely. No private information is stored permanently.
              </p>
            </div>
          </div>

        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50 rounded-2xl p-6 mb-8 border border-violet-800/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-white text-lg">Stay Updated</h3>
              <p className="text-sm text-violet-200">Get the latest on women's empowerment schemes, career tips, and platform updates.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-l-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button className="px-5 py-2.5 rounded-r-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} ForHer Suite. Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for empowering women.
          </p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
