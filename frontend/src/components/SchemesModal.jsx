import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const SCHEMES = [
  {
    id: "pmkisan",
    title: { hi: "पीएम-किसान सम्मान निधि", en: "PM-KISAN Samman Nidhi" },
    icon: "📝",
    color: "from-amber-50 to-orange-100 border-amber-300",
    summary: {
      hi: "किसानों को प्रति वर्ष ₹6,000 की वित्तीय सहायता (3 किस्तों में ₹2,000)।",
      en: "Financial support of ₹6,000 per year for eligible farmers in 3 installments of ₹2,000.",
    },
    eligibility: {
      hi: "छोटे और सीमांत किसान जिनके पास कृषि योग्य भूमि है।",
      en: "Small and marginal farmers holding cultivable land.",
    },
    documents: {
      hi: "आधार कार्ड, भूमि दस्तावेज (खतौनी), बैंक खाता विवरण, मोबाइल नंबर।",
      en: "Aadhaar Card, Land documents (Khatauni), Bank Account details, Mobile number.",
    },
    process: {
      hi: "1. PM-KISAN की आधिकारिक वेबसाइट (pmkisan.gov.in) पर जाएं।\n2. 'New Farmer Registration' पर क्लिक करें।\n3. आधार और राज्य का चयन करें और विवरण भरें।",
      en: "1. Visit official website (pmkisan.gov.in).\n2. Click 'New Farmer Registration'.\n3. Enter Aadhaar and state details.",
    },
  },
  {
    id: "fasalbima",
    title: { hi: "प्रधानमंत्री फसल बीमा योजना", en: "PM Fasal Bima Yojana" },
    icon: "🛡️",
    color: "from-emerald-50 to-teal-100 border-emerald-300",
    summary: {
      hi: "प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल क्षति का व्यापक बीमा।",
      en: "Comprehensive crop insurance against natural calamities, pests & diseases.",
    },
    eligibility: {
      hi: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।",
      en: "All farmers growing notified crops in notified areas.",
    },
    documents: {
      hi: "भूमि स्वामित्व प्रमाणपत्र, बुवाई प्रमाणपत्र, बैंक पासबुक, पहचान पत्र।",
      en: "Land ownership certificate, Sowing certificate, Bank Passbook, ID proof.",
    },
    process: {
      hi: "pmfby.gov.in पर जाएं या निकटतम सीएससी (CSC) केंद्र या बैंक शाखा में आवेदन करें।",
      en: "Apply via pmfby.gov.in or visit nearest Common Service Center (CSC) or bank branch.",
    },
  },
  {
    id: "kcc",
    title: { hi: "किसान क्रेडिट कार्ड (KCC)", en: "Kisan Credit Card (KCC)" },
    icon: "💳",
    color: "from-blue-50 to-indigo-100 border-blue-300",
    summary: {
      hi: "4% की कम ब्याज दर पर कृषि एवं संबद्ध गतिविधियों हेतु रियायती ऋण।",
      en: "Concessional credit for agriculture and allied activities at low 4% effective interest.",
    },
    eligibility: {
      hi: "सभी किसान, पट्टेदार किसान, और स्वयं सहायता समूह (SHG)।",
      en: "All farmers, tenant farmers, sharecroppers, and Self Help Groups (SHGs).",
    },
    documents: {
      hi: "आवेदन पत्र, जमीन के कागज, पासपोर्ट फोटो, पहचान व निवास प्रमाण।",
      en: "Application form, Land records, Passport photo, ID and Residence proof.",
    },
    process: {
      hi: "किसी भी राष्ट्रीयकृत बैंक शाखा में KCC फॉर्म जमा करें या ऑनलाइन आवेदन करें।",
      en: "Submit KCC form at any commercial bank branch or apply online via bank portals.",
    },
  },
  {
    id: "soilcard",
    title: { hi: "मृदा स्वास्थ्य कार्ड (Soil Health Card)", en: "Soil Health Card Scheme" },
    icon: "🧪",
    color: "from-purple-50 to-violet-100 border-purple-300",
    summary: {
      hi: "मिट्टी के पोषक तत्वों की स्थिति एवं उपयुक्त उर्वरकों की मुफ़्त जाँच रिपोर्ट।",
      en: "Free soil nutrient testing report indicating optimal fertilizer dosages.",
    },
    eligibility: {
      hi: "देश के सभी किसान इस मुफ़्त परीक्षण सेवा के पात्र हैं।",
      en: "All farmers across the country are eligible for free soil testing.",
    },
    documents: {
      hi: "खेत से मिट्टी का नमूना और किसान का आधार/पहचान पत्र।",
      en: "Soil sample collected from farm field and farmer ID card.",
    },
    process: {
      hi: "निकटतम कृषि विज्ञान केंद्र (KVK) या मृदा परीक्षण प्रयोगशाला में संपर्क करें।",
      en: "Contact local Krishi Vigyan Kendra (KVK) or Agriculture Dept Soil Testing Lab.",
    },
  },
  {
    id: "subsidy",
    title: { hi: "कृषि उपकरण एवं उर्वरक सब्सिडी", en: "Equipment & Fertilizer Subsidy" },
    icon: "💰",
    color: "from-yellow-50 to-amber-100 border-yellow-300",
    summary: {
      hi: "ट्रैक्टर, ड्रिप सिंचाई और एनपीके उर्वरक पर 40% से 80% तक का अनुदान।",
      en: "40% to 80% subsidy on tractors, drip irrigation, and NPK fertilizers.",
    },
    eligibility: {
      hi: "पंजीकृत किसान एवं महिला किसान समूह।",
      en: "Registered farmers and women farmer SHGs.",
    },
    documents: {
      hi: "किसान पंजीकरण संख्या, आधार कार्ड, भूमि रसीद।",
      en: "Farmer Registration ID, Aadhaar Card, Land Record receipt.",
    },
    process: {
      hi: "राज्य कृषि विभाग (DBT Agriculture) पोर्टल पर ऑनलाइन आवेदन करें।",
      en: "Apply online through your State Agriculture Department DBT portal.",
    },
  },
];

export default function SchemesModal({ isOpen, onClose, selectedSchemeId }) {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState(selectedSchemeId || "pmkisan");

  if (!isOpen) return null;

  const currentScheme = SCHEMES.find((s) => s.id === activeId) || SCHEMES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h2 className="text-xl font-bold">
                {lang === "hi" ? "सरकारी योजनाएं एवं किसान सहायता" : "Government Schemes & Farmer Assistance"}
              </h2>
              <p className="text-xs text-emerald-100">
                {lang === "hi" ? "पात्रता, दस्तावेज और आवेदन प्रक्रिया की जानकारी" : "Eligibility, documents & application guide"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid md:grid-cols-12 gap-6">
          {/* Scheme Tabs Sidebar */}
          <div className="md:col-span-4 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {lang === "hi" ? "योजनाएं चुनें" : "Select Scheme"}
            </p>
            {SCHEMES.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setActiveId(scheme.id)}
                className={`w-full text-left p-3 rounded-2xl flex items-center gap-3 transition-all ${
                  activeId === scheme.id
                    ? "bg-emerald-600 text-white shadow-md font-semibold translate-x-1"
                    : "bg-gray-50 hover:bg-emerald-50 text-gray-700"
                }`}
              >
                <span className="text-xl">{scheme.icon}</span>
                <span className="text-xs sm:text-sm line-clamp-1">
                  {scheme.title[lang]}
                </span>
              </button>
            ))}
          </div>

          {/* Scheme Detail View */}
          <div className="md:col-span-8 space-y-5">
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${currentScheme.color} border`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{currentScheme.icon}</span>
                <h3 className="text-xl font-bold text-gray-900">
                  {currentScheme.title[lang]}
                </h3>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                {currentScheme.summary[lang]}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-1">
                  🎯 {lang === "hi" ? "पात्रता (Eligibility)" : "Eligibility Criteria"}
                </h4>
                <p className="text-sm text-emerald-950 font-medium">
                  {currentScheme.eligibility[lang]}
                </p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
                <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1">
                  📄 {lang === "hi" ? "आवश्यक दस्तावेज" : "Required Documents"}
                </h4>
                <p className="text-sm text-amber-950 font-medium">
                  {currentScheme.documents[lang]}
                </p>
              </div>

              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
                <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-1">
                  📲 {lang === "hi" ? "आवेदन कैसे करें?" : "How to Apply?"}
                </h4>
                <p className="text-sm text-blue-950 font-medium whitespace-pre-line leading-relaxed">
                  {currentScheme.process[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            {lang === "hi" ? "बंद करें" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
