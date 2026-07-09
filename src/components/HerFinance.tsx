import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquareCode, Sparkles, Send, BookOpen, 
  Info, RotateCcw, AlertCircle 
} from "lucide-react";
import { ChatMessage } from "../types";

export default function HerFinance() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: "welcome",
        role: "assistant",
        parts: [{ text: "Hello! I am HerAssistant, your dedicated economic advisor on ForHer. 🌸\n\nI specialize in helping you navigate specialized collateral-free loans, micro-grants, MSME advantages, and financial planning tailored to women entrepreneurs. How can I help launch or grow your business today?" }],
        timestamp: new Date()
      }
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const suggestions = [
    "How to get collateral-free funding?",
    "Suggest schemes for my boutique startup",
    "How do I register for Udyam MSME?",
    "Stree Shakti Package interest concession?"
  ];

  const directorySchemes = [
    {
      title: "Stree Shakti Package",
      prompt: "Can you detail the Stree Shakti Package by SBI? How do I get interest concessions for my business?",
      tag: "Interest Concessions",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "PMMY Mudra Loans",
      prompt: "I want to apply for a PMMY Mudra Loan. What documents should I have ready for the Kishor category?",
      tag: "Up to ₹10 Lakhs",
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Udyam Registration",
      prompt: "What is Udyam registration and how can it help decrease loan interest rates for female founders?",
      tag: "Free MSME Certificate",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Mahila Udyam Nidhi",
      prompt: "Tell me about the Mahila Udyam Nidhi Scheme. What types of machines or equipment are covered?",
      tag: "Long-term SIDBI Loan",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      parts: [{ text: textToSend }],
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMsg].map(msg => ({
        role: msg.role,
        parts: msg.parts
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory })
      });

      if (!response.ok) throw new Error("Chat engine error.");

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        parts: [{ text: data.text }],
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        parts: [{ text: "I'm having trouble connecting right now. ⚠️ If you are in the developer preview, please verify your internet connection or check that your Gemini API Key is entered in the server." }],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      parts: [{ text: "Hello! I am HerAssistant, your dedicated economic advisor on ForHer. 🌸\n\nHow can I help launch or grow your business today?" }],
      timestamp: new Date()
    }]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <motion.div 
        className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl flex items-center gap-2.5">
            <div className="p-2.5 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-xl text-white shadow-lg shadow-pink-200">
              <MessageSquareCode className="w-6 h-6" />
            </div>
            <span className="gradient-text-pink">HerFinance AI Guide</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Interact with HerAssistant, our conversational AI advisor. Query funding pathways, MSME certifications, collateral waivers, and general operational advice.
          </p>
        </div>
        <button
          onClick={clearChat}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 text-sm font-semibold flex items-center gap-2 transition-all bg-white/50 backdrop-blur-sm cursor-pointer shadow-sm w-fit"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Chat</span>
        </button>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div 
            className="glass rounded-2xl p-5 shadow-lg border-white/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
              <BookOpen className="w-4.5 h-4.5 text-pink-500" />
              <span>Quick Query Directory</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Click any package below to instantly populate your conversation with targeted queries:
            </p>

            <div className="space-y-3">
              {directorySchemes.map((sch, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sch.prompt)}
                  className="w-full text-left p-3.5 rounded-xl bg-white/50 border border-slate-100 hover:border-pink-200 hover:bg-white hover:shadow-md transition-all text-xs cursor-pointer group flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-slate-800 group-hover:text-pink-600 transition-colors">{sch.title}</span>
                    <span className={`text-[9px] font-bold text-white font-mono px-2 py-0.5 rounded-full bg-gradient-to-r ${sch.color}`}>
                      {sch.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium italic line-clamp-2">
                    "{sch.prompt}"
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-violet-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h4 className="text-xs font-black text-violet-200 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>MSME Compliance Tip</span>
            </h4>
            <p className="text-sm text-slate-100 leading-relaxed relative z-10">
              When applying for central bank credit, having an active <strong>Udyam MSME number</strong> can legally reduce your base interest concessions by up to 2.0% under direct credit frameworks. Ask me how to register!
            </p>
          </motion.div>
        </div>

        {/* Right Column: Chat Window */}
        <motion.div 
          className="lg:col-span-8 flex flex-col h-[600px] glass rounded-2xl shadow-xl border-white/50 overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Header */}
          <div className="p-4 bg-white/80 border-b border-slate-100 flex justify-between items-center shrink-0 backdrop-blur-xl z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-gradient-to-tr from-pink-500 to-rose-600 p-2.5 rounded-xl text-white shadow-sm shadow-pink-200">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">HerAssistant AI</h3>
                <p className="text-[10px] text-slate-500 font-semibold font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Powered by Gemini
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Secure Connection
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-6 bg-slate-50/30 custom-scrollbar scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${isAssistant ? "justify-start" : "justify-end"} items-end gap-3`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs shrink-0 border border-pink-200 shadow-sm">
                        HA
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                      isAssistant 
                        ? "bg-white text-slate-800 border border-slate-100 rounded-bl-sm whitespace-pre-line" 
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-br-sm"
                    }`}>
                      {msg.parts[0].text}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start items-end gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs shrink-0 border border-pink-200">
                  HA
                </div>
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-5 py-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Bottom Suggestion prompts */}
          {messages.length <= 2 && (
            <div className="p-3 bg-white/50 border-t border-slate-100 flex flex-wrap gap-2 shrink-0 backdrop-blur-md">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug)}
                  className="text-xs font-semibold text-slate-600 hover:text-pink-600 bg-white border border-slate-200 hover:border-pink-300 shadow-sm px-3.5 py-1.5 rounded-full cursor-pointer transition-all hover:scale-105"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Form Entry Field */}
          <div className="p-4 bg-white/80 border-t border-slate-100 shrink-0 backdrop-blur-xl z-10">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent transition-all shadow-sm"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask HerAssistant about Mudra loans, Stree Shakti criteria, tax guidelines..."
                className="flex-1 bg-transparent text-sm px-3 py-2 outline-none text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-3 rounded-lg hover:shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
