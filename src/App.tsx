/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/FloatingChatbot";

// Lazy load all page components for massive performance boost
const Hero = lazy(() => import("./components/Hero"));
const WorkEquity = lazy(() => import("./components/WorkEquity"));
const EquityDashboard = lazy(() => import("./components/EquityDashboard"));
const HerFinance = lazy(() => import("./components/HerFinance"));
const MentorshipHub = lazy(() => import("./components/MentorshipHub"));
const SalaryInsights = lazy(() => import("./components/SalaryInsights"));
const HerVenture = lazy(() => import("./components/HerVenture"));
const LegalRights = lazy(() => import("./components/LegalRights"));
const SkillPathway = lazy(() => import("./components/SkillPathway"));

// Simple loading skeleton while routes chunk
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

export default function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("forher_dark_mode") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("forher_dark_mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50/50 text-slate-900"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                <Route path="/" element={<Hero />} />
                <Route path="/workequity" element={<WorkEquity />} />
                <Route path="/herfinance" element={<HerFinance />} />
                <Route path="/dashboard" element={<EquityDashboard />} />
                <Route path="/mentorship" element={<MentorshipHub />} />
                <Route path="/salary-insights" element={<SalaryInsights />} />
                <Route path="/herventure" element={<HerVenture />} />
                <Route path="/legal-rights" element={<LegalRights />} />
                <Route path="/skill-pathway" element={<SkillPathway />} />
                <Route path="*" element={<Hero />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingChatbot />
      <Footer />
    </div>
  );
}
