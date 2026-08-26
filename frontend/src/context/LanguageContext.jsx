import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    brandName: "KrishiMitra",
    tagline: "Smart AI Assistant for Farmers",
    navHome: "Home",
    navDashboard: "Dashboard",
    navDisease: "Disease Detection",
    navRainfall: "Rainfall Prediction",
    navRecommendation: "Crop Recommendation",
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",
    welcome: "Welcome",
    farmHealthScore: "Farm Health Score",
    currentWeather: "Current Weather",
    humidity: "Humidity",
    wind: "Wind",
    rainfall: "Rainfall",
    soilPh: "Soil pH",
    cropStatus: "Crop Status",
    yieldForecast: "Yield Forecast",
    detectDiseaseTitle: "Crop Disease Detection",
    detectDiseaseDesc: "Upload leaf image or select sample to diagnose diseases instantly.",
    predictRainfallTitle: "Rainfall Prediction",
    predictRainfallDesc: "Analyze weather parameters and get rainfall forecast.",
    cropRecTitle: "Crop Recommendation",
    cropRecDesc: "Discover optimal crops based on your soil NPK & climate data.",
    farmersCorner: "Farmers' Corner & Government Schemes",
    pmKisan: "PM-KISAN Scheme",
    fasalBima: "PM Fasal Bima Yojana",
    kcc: "Kisan Credit Card (KCC)",
    soilCard: "Soil Health Card",
    subsidies: "Subsidy & Financial Support",
    viewList: "View Beneficiary List",
    aiKrishak: "AI Krishak",
    close: "Close",
    askAnything: "Ask AI Krishak anything about farming...",
  },
  hi: {
    brandName: "कृषि मित्र",
    tagline: "किसानों के लिए स्मार्ट एआई सहायक",
    navHome: "मुख्य पृष्ठ",
    navDashboard: "डैशबोर्ड",
    navDisease: "फसल रोग पहचान",
    navRainfall: "वर्षा पूर्वानुमान",
    navRecommendation: "फसल अनुशंसा",
    login: "लॉगिन",
    signUp: "साइन अप",
    logout: "लॉगआउट",
    welcome: "स्वागत है",
    farmHealthScore: "खेत स्वास्थ्य स्कोर",
    currentWeather: "वर्तमान मौसम",
    humidity: "नमी",
    wind: "हवा की गति",
    rainfall: "वर्षा",
    soilPh: "मिट्टी पीएच",
    cropStatus: "फसल की स्थिति",
    yieldForecast: "उपज पूर्वानुमान",
    detectDiseaseTitle: "फसल रोग की पहचान",
    detectDiseaseDesc: "पत्ती की तस्वीर अपलोड करें या सैंपल चुनकर तुरंत बीमारी पहचानें।",
    predictRainfallTitle: "वर्षा का पूर्वानुमान",
    predictRainfallDesc: "मौसम मापदंडों का विश्लेषण करें और वर्षा की भविष्यवाणी पाएं।",
    cropRecTitle: "स्मार्ट फसल सुझाव",
    cropRecDesc: "अपनी मिट्टी (NPK) और जलवायु के आधार पर सर्वश्रेष्ठ फसल जानें।",
    farmersCorner: "किसान कॉर्नर एवं सरकारी योजनाएं",
    pmKisan: "पीएम-किसान सम्मान निधि",
    fasalBima: "प्रधानमंत्री फसल बीमा योजना",
    kcc: "किसान क्रेडिट कार्ड (KCC)",
    soilCard: "मृदा स्वास्थ्य कार्ड",
    subsidies: "सब्सिडी और वित्तीय सहायता",
    viewList: "लाभार्थी सूची देखें",
    aiKrishak: "एआई कृषक",
    close: "बंद करें",
    askAnything: "कृषि से जुड़ा कोई भी सवाल एआई कृषक से पूछें...",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("hi");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "hi" ? "en" : "hi"));
  };

  const t = (key) => translations[lang]?.[key] || translations["en"]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
