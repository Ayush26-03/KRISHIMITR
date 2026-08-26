import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config/api";

const SOIL_TYPES = [
  { hi: "दोमट मिट्टी (Loam Soil)", en: "Loam Soil" },
  { hi: "जलोढ़ मिट्टी (Alluvial Soil)", en: "Alluvial Soil" },
  { hi: "काली मिट्टी (Black Cotton Soil)", en: "Black Soil" },
  { hi: "लाल व पीली मिट्टी (Red Soil)", en: "Red Soil" },
  { hi: "बलुई मिट्टी (Sandy Soil)", en: "Sandy Soil" },
  { hi: "चिकनी मिट्टी (Clay Soil)", en: "Clay Soil" },
];

export default function Recommendation() {
  const { lang, t } = useLanguage();

  const [nitrogen, setNitrogen] = useState(90);
  const [phosphorus, setPhosphorus] = useState(42);
  const [potassium, setPotassium] = useState(43);
  const [ph, setPh] = useState(6.5);
  const [soilType, setSoilType] = useState("Loam Soil");
  const [season, setSeason] = useState("Kharif");

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleRecommend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations(null);

    try {
      const formData = new FormData();
      formData.append("season", season);
      formData.append("soilType", soilType);
      formData.append("nitrogen", nitrogen);
      formData.append("phosphorus", phosphorus);
      formData.append("potassium", potassium);
      formData.append("ph", ph);

      const response = await fetch(`${API_BASE_URL}/recommend-crop`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Crop recommendation request failed");
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error(error);
      setRecommendations([
        {
          name: { hi: "त्रुटि", en: "Error" },
          icon: "⚠️",
          match: 0,
          yieldPerAcre: "N/A",
          waterReq: { hi: "N/A", en: "N/A" },
          npkRatio: "N/A",
          profitScore: "N/A",
          desc: {
            hi: "कृपया सुनिश्चित करें कि बैकएंड चल रहा है।",
            en: "Please make sure the backend is running.",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-green-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-20 select-none">
            🌱
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              {lang === "hi" ? "मृदा एवं फसल अनुशंसा एआई" : "Soil & Crop Match Engine"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2">
              🌱 {t("cropRecTitle")}
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              {t("cropRecDesc")}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span>🧪</span>
              <span>{lang === "hi" ? "मिट्टी (NPK) एवं मौसम विवरण" : "Soil NPK & Climate Data"}</span>
            </h2>

            <form onSubmit={handleRecommend} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  🌾 {lang === "hi" ? "फसल का मौसम" : "Cropping Season"}
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Kharif">{lang === "hi" ? "खरीफ (जून - अक्टूबर)" : "Kharif (Monsoon)"}</option>
                  <option value="Rabi">{lang === "hi" ? "रबी (नवंबर - अप्रैल)" : "Rabi (Winter)"}</option>
                  <option value="Zaid">{lang === "hi" ? "जायद (मार्च - जून)" : "Zaid (Summer)"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  🏔️ {lang === "hi" ? "मिट्टी का प्रकार (Soil Type)" : "Soil Type"}
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {SOIL_TYPES.map((st, idx) => (
                    <option key={idx} value={st.en}>
                      {st[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-emerald-800 uppercase mb-1">
                    N ({lang === "hi" ? "नाइट्रोजन" : "Nitrogen"})
                  </label>
                  <input
                    type="number"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="kg/ha"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-blue-800 uppercase mb-1">
                    P ({lang === "hi" ? "फास्फोरस" : "Phos."})
                  </label>
                  <input
                    type="number"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="kg/ha"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-amber-800 uppercase mb-1">
                    K ({lang === "hi" ? "पोटेशियम" : "Potassium"})
                  </label>
                  <input
                    type="number"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold text-center focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="kg/ha"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  ⚖️ {lang === "hi" ? "मिट्टी का पीएच स्तर (pH Level)" : "Soil pH Level"}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="4.5"
                    max="9.0"
                    step="0.1"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="w-12 text-center py-1 bg-emerald-100 font-extrabold text-emerald-900 rounded-lg text-sm">
                    {ph}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{lang === "hi" ? "सर्वश्रेष्ठ फसलें खोजी जा रही हैं..." : "Matching Best Crops..."}</span>
                  </>
                ) : (
                  <>
                    <span>🌱</span>
                    <span>{lang === "hi" ? "सर्वश्रेष्ठ फसल सुझाव प्राप्त करें" : "Get Crop Recommendations"}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 space-y-4">
            {recommendations ? (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-800 flex items-center justify-between">
                  <span>🎯 {lang === "hi" ? "अनुशंसित फसलें (Top Matched Crops)" : "Top Recommended Crops"}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    {recommendations.length} {lang === "hi" ? "विकल्प उपलब्ध" : "Matches Found"}
                  </span>
                </h3>

                {recommendations.map((crop, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all group"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {crop.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-extrabold text-slate-900">
                            {crop.name[lang]}
                          </h4>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                            {crop.profitScore}
                          </span>
                        </div>
                      </div>

                      <div className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-2xl font-extrabold text-sm shadow-xs">
                        {crop.match}% {lang === "hi" ? "उपयुक्त" : "Match"}
                      </div>
                    </div>
 
                    <div className="flex flex-wrap gap-2 items-center mb-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {lang === "hi" ? "बाजार स्कोर" : "Market Score"}:
                      </span>
                      <span className="text-sm font-bold text-indigo-800 bg-indigo-100 px-2 py-1 rounded-full">
                        {crop.marketScore ?? "N/A"}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {lang === "hi" ? "अनुमानित बाजार मूल्य" : "Est. Price"}:
                      </span>
                      <span className="text-sm font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-full">
                        ₹{crop.predictedMarketPrice ?? "N/A"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                      {crop.desc[lang]}
                    </p>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">
                          {lang === "hi" ? "अनुमानित पैदावार" : "Est. Yield"}
                        </p>
                        <p className="text-xs font-extrabold text-slate-800 mt-0.5">
                          {crop.yieldPerAcre}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">
                          {lang === "hi" ? "जल आवश्यकता" : "Water Req."}
                        </p>
                        <p className="text-xs font-extrabold text-blue-700 mt-0.5">
                          {crop.waterReq[lang]}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">
                          {lang === "hi" ? "संतुलित NPK" : "NPK Ratio"}
                        </p>
                        <p className="text-xs font-extrabold text-emerald-800 mt-0.5">
                          {crop.npkRatio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center min-h-[380px]">
                <span className="text-6xl mb-4 animate-bounce">🌾</span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {lang === "hi" ? "अपनी ज़मीन की क्षमता पहचानें" : "Discover Crop Suitability"}
                </h3>
                <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                  {lang === "hi"
                    ? "बाईं ओर अपनी मिट्टी का NPK मान और मौसम चुनें, फिर 'सर्वश्रेष्ठ फसल सुझाव' बटन पर क्लिक करें।"
                    : "Enter your soil NPK values and season on the left to receive AI-powered crop recommendations."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
