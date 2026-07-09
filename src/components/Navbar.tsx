import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sparkles, Heart, FileText, Landmark, MessageSquareCode, Menu, X, 
  Moon, Sun, Users, TrendingUp, Rocket, Scale, GraduationCap, ChevronDown
} from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  const mainNav = [
    { path: "/", label: "Home", icon: Heart },
    { path: "/workequity", label: "WorkEquity", icon: FileText },
    { path: "/herfinance", label: "HerFinance", icon: MessageSquareCode },
    { path: "/dashboard", label: "Dashboard", icon: Landmark },
  ];

  const moreNav = [
    { path: "/mentorship", label: "Mentorship Hub", icon: Users },
    { path: "/salary-insights", label: "Salary Insights", icon: TrendingUp },
    { path: "/herventure", label: "HerVenture", icon: Rocket },
    { path: "/legal-rights", label: "Legal Rights", icon: Scale },
    { path: "/skill-pathway", label: "Skill Pathway", icon: GraduationCap },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      darkMode 
        ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-800" 
        : "bg-white/80 backdrop-blur-xl border-b border-violet-100/50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group transition-all">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl text-white shadow-sm shadow-violet-200 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-violet-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight gradient-text">
                ForHer
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full border font-medium hidden sm:inline-block ${
                darkMode 
                  ? "bg-violet-900/50 text-violet-300 border-violet-700" 
                  : "bg-violet-50 text-violet-700 border-violet-100"
              }`}>
                Equity Suite
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? darkMode 
                        ? "bg-violet-500/20 text-violet-300 font-semibold shadow-sm border border-violet-500/30" 
                        : "bg-violet-50 text-violet-700 font-semibold shadow-sm border border-violet-100/50"
                      : darkMode 
                        ? "text-slate-400 hover:text-violet-300 hover:bg-violet-500/10" 
                        : "text-slate-600 hover:text-violet-600 hover:bg-violet-50/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? (darkMode ? "text-violet-400" : "text-violet-600") : (darkMode ? "text-slate-500" : "text-slate-400")}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  moreOpen || moreNav.some(n => isActive(n.path))
                    ? darkMode 
                      ? "bg-violet-500/20 text-violet-300" 
                      : "bg-violet-50 text-violet-700"
                    : darkMode 
                      ? "text-slate-400 hover:text-violet-300 hover:bg-violet-500/10" 
                      : "text-slate-600 hover:text-violet-600 hover:bg-violet-50/40"
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>

              {moreOpen && (
                <div className={`absolute top-full right-0 mt-2 w-56 rounded-2xl shadow-xl border overflow-hidden z-50 ${
                  darkMode 
                    ? "bg-slate-800 border-slate-700" 
                    : "bg-white border-violet-100"
                }`}>
                  {moreNav.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center space-x-2.5 px-4 py-3 text-sm font-medium transition-all ${
                          active 
                            ? darkMode 
                              ? "bg-violet-500/20 text-violet-300" 
                              : "bg-violet-50 text-violet-700"
                            : darkMode 
                              ? "text-slate-300 hover:bg-violet-500/10 hover:text-violet-300" 
                              : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA + Dark Mode */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                darkMode 
                  ? "text-amber-400 hover:bg-amber-400/10" 
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/dashboard"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md shadow-violet-200/50 hover:shadow-lg hover:shadow-violet-300/50"
            >
              <span className={`relative px-4 py-2 transition-all ease-in duration-150 rounded-lg font-medium ${
                darkMode 
                  ? "bg-slate-900 text-violet-300 group-hover:bg-transparent group-hover:text-white" 
                  : "bg-white text-violet-700 group-hover:bg-transparent group-hover:text-white"
              }`}>
                Launch Portal
              </span>
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                darkMode ? "text-amber-400" : "text-slate-500"
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                darkMode ? "text-slate-400 hover:text-violet-300" : "text-slate-500 hover:text-violet-600"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden px-4 pt-2 pb-4 space-y-1 shadow-inner border-t ${
          darkMode 
            ? "bg-slate-900 border-slate-800" 
            : "bg-white border-violet-50"
        }`}>
          {[...mainNav, ...moreNav].map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  active
                    ? darkMode 
                      ? "bg-violet-500/20 text-violet-300 border-l-4 border-violet-500" 
                      : "bg-violet-50 text-violet-700 border-l-4 border-violet-600"
                    : darkMode 
                      ? "text-slate-400 hover:text-violet-300 hover:bg-violet-500/10" 
                      : "text-slate-600 hover:text-violet-600 hover:bg-violet-50/50"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? (darkMode ? "text-violet-400" : "text-violet-600") : (darkMode ? "text-slate-500" : "text-slate-400")}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className={`pt-4 border-t flex justify-center ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium shadow-sm"
            >
              Launch Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
