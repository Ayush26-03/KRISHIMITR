import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

export default function Signup() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [name, setName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const farmerName = name.trim() || (lang === "hi" ? "किसान भाई" : "Farmer");
    localStorage.setItem("farmerName", farmerName);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
              🌱
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {t("signUp")}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              {lang === "hi"
                ? "स्मार्ट एआई कृषि सेवाओं से जुड़ें"
                : "Join Smart AI Agriculture Network"}
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {lang === "hi" ? "पूरा नाम (Full Name)" : "Full Name"}
              </label>
              <input
                type="text"
                placeholder={lang === "hi" ? "उदा. रमेश कुमार" : "e.g. Ramesh Kumar"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {lang === "hi" ? "मोबाइल नंबर (Mobile Number)" : "Mobile Number"}
              </label>
              <input
                type="tel"
                placeholder="9876543210"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {lang === "hi" ? "पासवर्ड (Password)" : "Password"}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-emerald-200 transition-all text-sm"
            >
              {t("signUp")}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 font-medium">
            {lang === "hi" ? "पहले से खाता है?" : "Already have an account?"}{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-emerald-700 hover:underline cursor-pointer font-bold"
            >
              {t("login")}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
