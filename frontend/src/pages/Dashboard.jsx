import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import SchemesModal from "../components/SchemesModal";
import Krishak from "../components/Krishak";
import { useLanguage } from "../context/LanguageContext";
import aphid from "../assets/aphid.jpg";
import rain from "../assets/rain.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [farmerName, setFarmerName] = useState("Farmer");
  const [showMenu, setShowMenu] = useState(false);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);
  const [activeSchemeId, setActiveSchemeId] = useState("pmkisan");

  const menuRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("farmerName");
    if (storedName) {
      setFarmerName(storedName);
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const healthScore = 88;

  const openScheme = (id) => {
    setActiveSchemeId(id);
    setIsSchemeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-8">
        {/* Header Bar */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-xs border border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              🌾 {t("navDashboard")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {lang === "hi"
                ? "आपके खेत का स्मार्ट लाइव अवलोकन एवं प्रबंधन"
                : "Real-time smart monitoring and AI recommendations for your farm"}
            </p>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-3 cursor-pointer p-1.5 rounded-2xl hover:bg-slate-100 transition"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
                {farmerName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-extrabold text-slate-800 leading-tight">
                  {farmerName}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  {lang === "hi" ? "सत्यापित किसान" : "Verified Farmer"}
                </p>
              </div>
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl p-2 border border-slate-100 z-30 animate-fade-in">
                <button
                  onClick={() => {
                    localStorage.removeItem("farmerName");
                    navigate("/");
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2 transition"
                >
                  <span>🚪</span>
                  <span>{t("logout")}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Farmer Profile & Health Card */}
        <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-wrap justify-between items-center gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center text-3xl font-extrabold shadow-inner backdrop-blur-sm">
              {farmerName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                👋 {t("welcome")}, {farmerName}!
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1 font-medium flex items-center gap-2">
                <span>📍 {lang === "hi" ? "उत्तर प्रदेश (भारत)" : "Uttar Pradesh (India)"}</span>
                <span>•</span>
                <span>🌾 {lang === "hi" ? "फसल: गेहूँ एवं धान" : "Wheat & Paddy Farm"}</span>
              </p>
            </div>
          </div>

          {/* Health Score Progress */}
          <div className="w-full sm:w-72 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm relative z-10">
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                {t("farmHealthScore")}
              </p>
              <p className="text-lg font-extrabold text-emerald-300">
                {healthScore}%
              </p>
            </div>

            <div className="w-full bg-black/20 rounded-full h-3.5 p-0.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-green-300 h-full rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${healthScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Weather & Farm Stats */}
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <h3 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <span>🌤️</span>
              <span>{t("currentWeather")}</span>
            </h3>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-5xl font-extrabold text-slate-900">28°C</p>
                <p className="text-sm font-semibold text-emerald-700 mt-1">
                  {lang === "hi" ? "आंशिक रूप से बादल छाए रहेंगे" : "Partly Cloudy"}
                </p>
              </div>

              <div className="text-right text-xs font-bold text-slate-600 space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p>💧 {t("humidity")}: 64%</p>
                <p>💨 {t("wind")}: 12 km/h</p>
                <p>🧭 {lang === "hi" ? "दबाव: 1008 hPa" : "Press: 1008 hPa"}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/rainfall")}
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold py-2.5 rounded-xl border border-emerald-200 transition"
            >
              {lang === "hi" ? "पूर्ण मौसम पूर्वानुमान देखें →" : "View Detailed Weather Forecast →"}
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard title={t("rainfall")} value="210 mm" icon="🌧️" />
            <StatCard title={t("soilPh")} value="6.8" icon="⚖️" />
            <StatCard title={t("cropStatus")} value={lang === "hi" ? "उत्कृष्ट" : "Healthy"} icon="🌱" />
            <StatCard title={t("yieldForecast")} value="+14%" icon="📈" />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Disease Detection Card */}
          <div
            onClick={() => navigate("/disease")}
            className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[220px] flex flex-col justify-end p-6 border border-emerald-200"
          >
            <img
              src={aphid}
              alt="Crop Disease"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>

            <div className="relative z-10 text-white">
              <span className="bg-emerald-500/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-emerald-200 border border-emerald-400/30">
                AI Vision
              </span>
              <h3 className="text-2xl font-extrabold mt-2 mb-1">
                🖼️ {t("detectDiseaseTitle")}
              </h3>
              <p className="text-emerald-100 text-xs line-clamp-2">
                {t("detectDiseaseDesc")}
              </p>
            </div>
          </div>

          {/* Rainfall Prediction Card */}
          <div
            onClick={() => navigate("/rainfall")}
            className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[220px] flex flex-col justify-end p-6 border border-blue-200"
          >
            <img
              src={rain}
              alt="Rainfall"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent"></div>

            <div className="relative z-10 text-white">
              <span className="bg-blue-500/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-blue-200 border border-blue-400/30">
                Weather Forecast
              </span>
              <h3 className="text-2xl font-extrabold mt-2 mb-1">
                🌧️ {t("predictRainfallTitle")}
              </h3>
              <p className="text-blue-100 text-xs line-clamp-2">
                {t("predictRainfallDesc")}
              </p>
            </div>
          </div>

          {/* Crop Recommendation Card */}
          <div
            onClick={() => navigate("/recommendation")}
            className="group bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-3xl text-white shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[220px] flex flex-col justify-between border border-emerald-500"
          >
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider self-start text-emerald-100">
              Soil NPK Match
            </span>

            <div>
              <h3 className="text-2xl font-extrabold mb-1">
                🌱 {t("cropRecTitle")}
              </h3>
              <p className="text-emerald-100 text-xs line-clamp-2">
                {t("cropRecDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Farmers Corner */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🏛️</span>
              <span>{t("farmersCorner")}</span>
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {lang === "hi" ? "सरकारी योजनाएं" : "Government Schemes"}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CornerCard
              icon="📝"
              title={t("pmKisan")}
              color="bg-amber-100 border-amber-300 text-amber-950"
              onClick={() => openScheme("pmkisan")}
            />
            <CornerCard
              icon="🛡️"
              title={t("fasalBima")}
              color="bg-emerald-100 border-emerald-300 text-emerald-950"
              onClick={() => openScheme("fasalbima")}
            />
            <CornerCard
              icon="💳"
              title={t("kcc")}
              color="bg-blue-100 border-blue-300 text-blue-950"
              onClick={() => openScheme("kcc")}
            />
            <CornerCard
              icon="🧪"
              title={t("soilCard")}
              color="bg-purple-100 border-purple-300 text-purple-950"
              onClick={() => openScheme("soilcard")}
            />
            <CornerCard
              icon="💰"
              title={t("subsidies")}
              color="bg-yellow-100 border-yellow-300 text-yellow-950"
              onClick={() => openScheme("subsidy")}
            />
            <CornerCard
              icon="📋"
              title={t("viewList")}
              color="bg-teal-100 border-teal-300 text-teal-950"
              onClick={() => openScheme("pmkisan")}
            />
          </div>
        </div>
      </main>

      {/* Schemes Information Modal */}
      <SchemesModal
        isOpen={isSchemeModalOpen}
        onClose={() => setIsSchemeModalOpen(false)}
        selectedSchemeId={activeSchemeId}
      />

      <Krishak />
    </div>
  );
}

/* Sub-components */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-200 text-center flex flex-col items-center justify-center hover:border-emerald-300 transition">
      <span className="text-2xl mb-1">{icon}</span>
      <p className="text-[11px] font-bold text-slate-500 uppercase">{title}</p>
      <p className="text-xl font-extrabold text-slate-900 mt-0.5">{value}</p>
    </div>
  );
}

function CornerCard({ icon, title, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} border p-6 rounded-3xl shadow-xs hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-4`}
    >
      <div className="text-3xl bg-white/70 w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs shrink-0">
        {icon}
      </div>
      <h3 className="text-sm font-extrabold">{title}</h3>
    </div>
  );
}
