import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const QUICK_QUESTIONS = [
  { hi: "गेहूँ में पीला रतुआ कैसे रोकें?", en: "How to stop yellow rust in wheat?" },
  { hi: "पीएम-किसान 17वीं किश्त कब आएगी?", en: "When is PM-KISAN installment?" },
  { hi: "एक एकड़ में कितना यूरिया डालें?", en: "Urea quantity per acre?" },
  { hi: "धान में सिंचाई का सही समय?", en: "Best irrigation time for paddy?" },
];

const BOT_RESPONSES = {
  "गेहूँ में पीला रतुआ कैसे रोकें?":
    "गेहूँ में पीला रतुआ दिखने पर प्रोपीकोनाज़ोल 25% EC (1 मिली/लीटर पानी) का छिड़काव करें। जैविक रूप से 5% खट्टी छाछ या नीम तेल (1500 ppm) छिड़कें।",
  "How to stop yellow rust in wheat?":
    "Foliar spray of Propiconazole 25% EC @ 1ml/litre water controls yellow rust. Organically, spray 5% sour buttermilk or 1500 ppm Neem Oil.",
  "पीएम-किसान 17वीं किश्त कब आएगी?":
    "पीएम-किसान योजना की किस्तें हर 4 महीने में ट्रांसफर होती हैं। स्टेटस जांचने के लिए डैशबोर्ड पर 'सरकारी योजनाएं' सेक्शन देखें।",
  "When is PM-KISAN installment?":
    "PM-KISAN installments are released every 4 months. Check the Govt Schemes modal on the dashboard for eligibility and status.",
  "एक एकड़ में कितना यूरिया डालें?":
    "गेहूँ या धान में 1 एकड़ में लगभग 45-50 किग्रा यूरिया (1 बैग) की आवश्यकता होती है, जिसे बुवाई और सिंचाई के दौरान 2-3 भागों में बांटकर दें।",
  "Urea quantity per acre?":
    "For wheat or rice, about 45-50 kg (1 bag) of Urea is recommended per acre, split into 2-3 doses during irrigation.",
  defaultHi:
    "नमस्ते किसान भाइयों! मैं AI कृषक हूँ। आप मुझसे फसल रोग, यूरिया की मात्रा, मौसम और सरकारी योजनाओं के बारे में कोई भी प्रश्न पूछ सकते हैं।",
  defaultEn:
    "Hello farmer! I am AI Krishak. Ask me anything about crop diseases, fertilizers, weather predictions, or government schemes.",
};

export default function Krishak() {
  const { lang, t } = useLanguage();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: lang === "hi" ? BOT_RESPONSES.defaultHi : BOT_RESPONSES.defaultEn,
      },
    ]);
  }, [lang]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (textToSend = null) => {
    const query = textToSend || input.trim();
    if (!query) return;

    // Add User message
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!textToSend) setInput("");

    setIsTyping(true);

    setTimeout(() => {
      let reply =
        BOT_RESPONSES[query] ||
        (lang === "hi"
          ? `आपने पूछा: "${query}"। इसके लिए अपने निकटतम कृषि विकास अधिकारी (ADO) या कृषि विज्ञान केंद्र से संपर्क करें।`
          : `You asked: "${query}". For specific local guidance, please consult your nearest Krishi Vigyan Kendra.`);

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Drawer Window */}
      {open && (
        <div className="mb-4 w-[92vw] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-emerald-100 flex flex-col h-[500px] overflow-hidden animate-fade-in">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  {t("aiKrishak")}
                </h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online AI Farming Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition"
            >
              ✕
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-emerald-50/60 border-b border-emerald-100 overflow-x-auto flex gap-2 no-scrollbar">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q[lang])}
                className="whitespace-nowrap text-xs font-semibold bg-white text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs"
              >
                {q[lang]}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400 font-semibold p-2">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder={t("askAnything")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-slate-100 text-slate-800 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            <button
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition"
            >
              ➢
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-gradient-to-tr from-emerald-700 to-green-500 text-white rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-white"
        title="Chat with AI Krishak"
      >
        🤖
      </button>
    </div>
  );
}
