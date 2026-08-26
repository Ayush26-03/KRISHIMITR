import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Krishak from "../components/Krishak";
import { useLanguage } from "../context/LanguageContext";
import caterpillar from "../assets/caterpillar.jpg";
import rain from "../assets/rain.jpg";

export default function Landing() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-emerald-100/30 to-slate-50">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
            🤖 AI-Powered Smart Agriculture Platform
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {lang === "hi" ? (
              <>
                किसानों का सच्चा साथी <br />
                <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 bg-clip-text text-transparent">
                  स्मार्ट एआई कृषि मित्र 🌾
                </span>
              </>
            ) : (
              <>
                Empowering Farmers with <br />
                <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 bg-clip-text text-transparent">
                  Next-Gen Smart AI 🌾
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            {lang === "hi"
              ? "फसल रोग पहचान, वर्षा पूर्वानुमान, मिट्टी (NPK) आधारित फसल सलाह और सरकारी योजनाओं की सटीक जानकारी — एक ही स्थान पर।"
              : "Detect crop diseases, forecast rainfall, discover optimal crop NPK matches, and access government scheme benefits in one click."}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-200 hover:scale-105 active:scale-95 transition-all"
            >
              {lang === "hi" ? "डैशबोर्ड खोलें 🚀" : "Open Dashboard 🚀"}
            </button>

            <a
              href="#features"
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-7 py-3.5 rounded-2xl border border-slate-200 shadow-xs transition"
            >
              {lang === "hi" ? "विशेषताएं देखें ↓" : "Explore Features ↓"}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {lang === "hi" ? "मुख्य एआई सुविधाएं" : "Key AI Features"}
          </h2>
          <p className="text-sm font-semibold text-slate-500 max-w-md mx-auto">
            {lang === "hi"
              ? "आधुनिक तकनीक से अपनी खेती को अधिक लाभदायक और सुरक्षित बनाएं।"
              : "Boost farm yield and lower risks with intelligent real-time diagnostics."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Disease */}
          <div
            onClick={() => navigate("/disease")}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={caterpillar}
                alt="Disease Detection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-emerald-950/40"></div>
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                🖼️ Image Diagnosis
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {t("detectDiseaseTitle")}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  {t("detectDiseaseDesc")}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                {lang === "hi" ? "जांच शुरू करें →" : "Try Diagnosis →"}
              </span>
            </div>
          </div>

          {/* Card 2: Rainfall */}
          <div
            onClick={() => navigate("/rainfall")}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={rain}
                alt="Rainfall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-950/40"></div>
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                🌧️ Weather Forecast
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">
                  {t("predictRainfallTitle")}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  {t("predictRainfallDesc")}
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                {lang === "hi" ? "मौसम देखें →" : "Check Weather →"}
              </span>
            </div>
          </div>

          {/* Card 3: Crop Recommendation */}
          <div
            onClick={() => navigate("/recommendation")}
            className="group bg-gradient-to-br from-emerald-700 via-green-800 to-teal-800 text-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between border border-emerald-600 min-h-[320px]"
          >
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start text-emerald-100">
              🌱 Soil NPK AI
            </span>

            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold group-hover:translate-x-1 transition-transform">
                {t("cropRecTitle")}
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                {t("cropRecDesc")}
              </p>
            </div>

            <span className="text-xs font-extrabold text-emerald-200 flex items-center gap-1 pt-4">
              {lang === "hi" ? "फसल सुझाव लें →" : "Get Suggestions →"}
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-center py-8 text-xs border-t border-slate-800 font-medium">
        © {new Date().getFullYear()} KrishiMitra AI. {lang === "hi" ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
      </footer>

      <Krishak />
    </div>
  );
}
