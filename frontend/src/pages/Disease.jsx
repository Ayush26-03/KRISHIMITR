import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { API_BASE_URL } from "../config/api";

const SAMPLE_DISEASES = [
  {
    id: "yellow_rust",
    crop: { hi: "गेहूँ (Wheat)", en: "Wheat" },
    name: { hi: "पीला रतुआ (Yellow Rust / Stripe Rust)", en: "Yellow Rust (Stripe Rust)" },
    severity: "High / उच्च ⚠️",
    imagePlaceholder: "🍂",
    bgGradient: "from-amber-500 to-yellow-600",
    symptoms: {
      hi: [
        "पत्तियों पर पीले रंग की धारियां और पाउडर जैसी संरचना।",
        "पत्तियां समय से पहले पीली पड़कर सूखने लगती हैं।",
        "दाने छोटे और कमजोर रह जाते हैं।",
      ],
      en: [
        "Yellow stripe-like pustules forming lines on upper leaf surface.",
        "Leaves turn yellow prematurely and dry up.",
        "Grain filling is severely impaired.",
      ],
    },
    organicRemedy: {
      hi: "खट्टी छाछ (Sour buttermilk) 5% घोल में 10 लीटर प्रति एकड़ का छिड़काव करें या नीम तेल 1500 ppm छिड़कें।",
      en: "Spray 5% sour buttermilk solution or 1500 ppm Neem Oil at 3 ml/litre of water.",
    },
    chemicalRemedy: {
      hi: "प्रोपीकोनाज़ोल 25% EC (Tilt) 1 मिली/लीटर पानी की दर से मिलाकर छिड़काव करें।",
      en: "Foliar spray of Propiconazole 25% EC @ 1 ml/litre of water.",
    },
    prevention: {
      hi: "प्रतिरोधी किस्मों (जैसे HD 2967, DBW 187) की बुवाई करें और अधिक नाइट्रोजन का उपयोग न करें।",
      en: "Sow resistant wheat varieties (HD 2967, DBW 187) and avoid excess nitrogen.",
    },
  },
  {
    id: "rice_blast",
    crop: { hi: "धान / चावल (Paddy)", en: "Paddy (Rice)" },
    name: { hi: "धान का झोंका रोग (Rice Blast Disease)", en: "Rice Blast Disease" },
    severity: "Critical / अति गंभीर 🚨",
    imagePlaceholder: "🌾",
    bgGradient: "from-emerald-600 to-teal-700",
    symptoms: {
      hi: [
        "पत्तियों पर आँख या नाव के आकार के भूरे-सफेद धब्बे।",
        "बालियों के गले का काला पड़ना (Neck Blast)।",
        "फसल का भूसा बन जाना।",
      ],
      en: [
        "Spindle-shaped or eye-shaped lesions with grey center on leaves.",
        "Neck region turns blackish brown (Neck Blast).",
        "Severe grain discoloration and empty panicles.",
      ],
    },
    organicRemedy: {
      hi: "ट्राइकोडर्मा विरिडी (Trichoderma viride) 5 ग्राम/लीटर पानी में मिलाकर शाम के समय छिड़कें।",
      en: "Spray Trichoderma viride @ 5g/litre during evening hours.",
    },
    chemicalRemedy: {
      hi: "ट्राइसाइक्लाज़ोल 75% WP (Baan) 0.6 ग्राम/लीटर पानी की दर से छिड़कें।",
      en: "Spray Tricyclazole 75% WP @ 0.6g/litre of water upon first symptoms.",
    },
    prevention: {
      hi: "बीज को कारबेंडाजिम से उपचारित करें तथा खेत में पानी का स्तर संतुलित रखें।",
      en: "Perform seed treatment with Carbendazim & maintain optimum water level.",
    },
  },
  {
    id: "tomato_blight",
    crop: { hi: "टमाटर (Tomato)", en: "Tomato" },
    name: { hi: "अगेती / पछेती झुलसा (Late Blight of Tomato)", en: "Late Blight of Tomato" },
    severity: "High / उच्च ⚠️",
    imagePlaceholder: "🍅",
    bgGradient: "from-rose-500 to-red-600",
    symptoms: {
      hi: [
        "पत्तियों के किनारों पर काले-भूरे पानी जैसे धब्बे।",
        "नमी के मौसम में पत्तियों के नीचे सफेद फफूंद।",
        "फल पर कड़े भूरे चकत्ते पड़ना।",
      ],
      en: [
        "Water-soaked dark brown spots appearing on leaf margins.",
        "White velvety fungal growth underneath leaves in humid weather.",
        "Hard dark brown rot spots on fruits.",
      ],
    },
    organicRemedy: {
      hi: "कॉपर ऑक्सीक्लोराइड 3 ग्राम + 1 लीटर पानी में घोलकर 7 दिन के अंतराल पर छिड़कें।",
      en: "Apply Copper Oxychloride @ 3g/litre of water at 7-day intervals.",
    },
    chemicalRemedy: {
      hi: "मैनकोज़ेब 75% WP या साइमोक्सानिल + मैनकोज़ेब (Moximate) 2 ग्राम/लीटर का छिड़काव करें।",
      en: "Spray Cymoxanil + Mancozeb (Moximate) @ 2g/litre of water.",
    },
    prevention: {
      hi: "पौधों के बीच हवा का आवागमन बनाए रखें और जलभराव न होने दें।",
      en: "Ensure good air circulation between plants & avoid overhead watering.",
    },
  },
  {
    id: "healthy_leaf",
    crop: { hi: "स्वस्थ फसल (Healthy Crop)", en: "Healthy Crop" },
    name: { hi: "कोई रोग नहीं पाया गया (Healthy & Disease Free)", en: "Healthy & Disease Free" },
    severity: "Safe / सुरक्षित ✅",
    imagePlaceholder: "🌱",
    bgGradient: "from-green-500 to-emerald-600",
    symptoms: {
      hi: ["पत्तियां हरी और चमकदार हैं।", "कोई फंगल या कीट संक्रमण नहीं पाया गया।"],
      en: ["Vibrant green leaves with uniform coloration.", "No fungal, bacterial or pest infestation detected."],
    },
    organicRemedy: {
      hi: "फसल बहुत स्वस्थ है। समय पर जैविक कम्पोस्ट या वर्मीकंपोस्ट डालते रहें।",
      en: "Crop is in excellent condition. Apply vermicompost at regular intervals.",
    },
    chemicalRemedy: {
      hi: "रसायनिक स्प्रे की आवश्यकता नहीं है।",
      en: "No chemical sprays required at this stage.",
    },
    prevention: {
      hi: "संतुलित सिंचाई और पोषण बनाए रखें।",
      en: "Maintain balanced irrigation & micronutrient application.",
    },
  },
];

export default function Disease() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDiagnosis(null);
    }
  };

  const handleSampleSelect = (sample) => {
    setSelectedFile(null);
    setPreviewUrl(null);
    runAnalysis(sample);
  };

  const runAnalysis = async (customSample = null) => {
    setScanning(true);
    setProgress(15);
    setDiagnosis(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 250);

    try {
      const formData = new FormData();
      if (customSample) {
        formData.append("sampleId", customSample.id);
      } else if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        throw new Error("No image or sample selected");
      }

      const response = await fetch(`${API_BASE_URL}/predict-disease`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Disease detection request failed");
      }

      const result = await response.json();
      clearInterval(interval);
      setProgress(100);
      // Backend does not return bgGradient — look it up from SAMPLE_DISEASES
      const matched = SAMPLE_DISEASES.find((s) => s.id === result.class);
      setDiagnosis({
        ...result,
        bgGradient: result.bgGradient || (matched ? matched.bgGradient : "from-slate-600 to-slate-700"),
      });
    } catch (error) {
      console.error(error);
      clearInterval(interval);
      setProgress(100);
      setDiagnosis({
        crop: { hi: "त्रुटि", en: "Error" },
        name: { hi: "रोग पता नहीं चला", en: "Disease detection failed" },
        severity: "Unknown",
        bgGradient: "from-slate-600 to-slate-700",
        symptoms: {
          hi: [error.message || "अज्ञात त्रुटि"],
          en: [error.message || "Unknown error"],
        },
        organicRemedy: { hi: "कृपया बाद में पुनः प्रयास करें।", en: "Please try again later." },
        chemicalRemedy: { hi: "आगामी समय में फिर से प्रयास करें।", en: "Please try again later." },
        prevention: { hi: "सुनिश्चित करें कि बैकएंड चल रहा है।", en: "Ensure the backend is running." },
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-20 select-none">
            🔬
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              {lang === "hi" ? "कंप्यूटर विज़न एआई" : "Computer Vision AI Diagnostic"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2">
              🖼️ {t("detectDiseaseTitle")}
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              {t("detectDiseaseDesc")}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Upload & Sample Gallery */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upload Box */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span>📸</span>
                <span>{lang === "hi" ? "पत्ती की फोटो अपलोड करें" : "Upload Leaf Photo"}</span>
              </h2>

              <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 text-center bg-emerald-50/50 hover:bg-emerald-50 transition cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {previewUrl ? (
                  <div className="space-y-3">
                    <img
                      src={previewUrl}
                      alt="Leaf Preview"
                      className="w-full h-48 object-cover rounded-xl shadow-md"
                    />
                    <p className="text-xs font-bold text-emerald-800">
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-5xl inline-block">🍃</span>
                    <p className="text-sm font-bold text-slate-700">
                      {lang === "hi" ? "यहाँ फोटो खींचकर या खींचकर छोड़ें" : "Click or drag leaf image here"}
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, JPEG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {previewUrl && (
                <button
                  onClick={() => runAnalysis()}
                  disabled={scanning}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                >
                  {scanning ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{lang === "hi" ? "एआई स्कैनिंग चालू है..." : "AI Scanning..."}</span>
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>{lang === "hi" ? "रोग पहचान विश्लेषण शुरू करें" : "Analyze Leaf Disease"}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Quick Test Samples */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                🧪 {lang === "hi" ? "नमूना तस्वीरें (Quick Test Samples)" : "Test with Sample Diseases"}
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {SAMPLE_DISEASES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSampleSelect(sample)}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition text-left group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {sample.imagePlaceholder}
                      </span>
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">
                        {sample.crop[lang]}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 line-clamp-1">
                      {sample.name[lang]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Diagnosis Output */}
          <div className="lg:col-span-7">
            {scanning ? (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl mb-4 animate-spin">
                  ⚙️
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {lang === "hi" ? "एआई विज़न पत्ती का विश्लेषण कर रहा है..." : "Deep Neural Network Analyzing Leaf..."}
                </h3>
                <div className="w-full max-w-md bg-slate-100 rounded-full h-3 mt-4 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold text-emerald-800 mt-2">
                  {progress}% Completed
                </p>
              </div>
            ) : diagnosis ? (
              <div className="space-y-6 animate-fade-in">
                {/* Header Card */}
                <div className={`p-6 rounded-3xl text-white shadow-lg bg-gradient-to-r ${diagnosis.bgGradient}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {diagnosis.crop[lang]}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
                        {diagnosis.name[lang]}
                      </h2>
                    </div>

                    <span className="bg-white text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
                      {diagnosis.severity}
                    </span>
                  </div>
                </div>

                {/* Diagnosis Breakdown */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-5">
                  {/* Symptoms */}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>🩺</span>
                      <span>{lang === "hi" ? "लक्षण (Symptoms Detected)" : "Symptoms"}</span>
                    </h3>
                    <ul className="space-y-1.5 pl-4 list-disc text-sm text-slate-700 font-medium">
                      {diagnosis.symptoms[lang].map((sym, i) => (
                        <li key={i}>{sym}</li>
                      ))}
                    </ul>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Organic Treatment */}
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                    <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🌿</span>
                      <span>{lang === "hi" ? "जैविक / देसी इलाज (Organic Remedy)" : "Organic Remedy"}</span>
                    </h4>
                    <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                      {diagnosis.organicRemedy[lang]}
                    </p>
                  </div>

                  {/* Chemical Treatment */}
                  <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
                    <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🧪</span>
                      <span>{lang === "hi" ? "रासायनिक स्प्रे इलाज (Chemical Spray)" : "Chemical Control"}</span>
                    </h4>
                    <p className="text-sm text-blue-950 font-medium leading-relaxed">
                      {diagnosis.chemicalRemedy[lang]}
                    </p>
                  </div>

                  {/* Prevention */}
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
                    <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🛡️</span>
                      <span>{lang === "hi" ? "भविष्य से बचाव (Prevention Tips)" : "Preventive Actions"}</span>
                    </h4>
                    <p className="text-sm text-amber-950 font-medium leading-relaxed">
                      {diagnosis.prevention[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center min-h-[400px]">
                <span className="text-6xl mb-4 animate-bounce">🍂</span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {lang === "hi" ? "रोग पहचान के लिए पत्ती की फोटो चुनें" : "Upload or Select a Leaf to Diagnose"}
                </h3>
                <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                  {lang === "hi"
                    ? "बाईं तरफ से अपनी फसल की पत्ती अपलोड करें या दिए गए नमूने (Sample) पर क्लिक करें।"
                    : "Upload a photo of an infected leaf or choose one of the sample diseases on the left to see diagnosis results."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
