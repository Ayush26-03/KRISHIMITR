from typing import Dict, List

CROP_CATALOG = [
    {
        "id": "rice",
        "name": {"hi": "धान / चावल (Rice/Paddy)", "en": "Paddy (Rice)"},
        "icon": "🌾",
        "npkRatio": "120:60:40 kg/ha",
        "waterReq": {"hi": "उच्च (1200-1400 mm)", "en": "High (1200-1400 mm)"},
        "profitScore": "High ⭐⭐⭐⭐⭐",
        "yieldPerAcre": "22-26 Quintal",
        "desc": {
            "hi": "उच्च नाइट्रोजन और फास्फोरस वाली मिट्टी धान की पैदावार के लिए उपयुक्त है।",
            "en": "High nitrogen and phosphorus soil is ideal for paddy yields.",
        },
        "baseMarket": 100,
    },
    {
        "id": "maize",
        "name": {"hi": "मक्का (Maize)", "en": "Maize (Corn)"},
        "icon": "🌽",
        "npkRatio": "100:50:30 kg/ha",
        "waterReq": {"hi": "मध्यम (500-600 mm)", "en": "Medium (500-600 mm)"},
        "profitScore": "Very High ⭐⭐⭐⭐⭐",
        "yieldPerAcre": "18-22 Quintal",
        "desc": {
            "hi": "मक्का व्यावसायिक लाभ के लिये दोमट और जलोढ़ मिट्टी में अच्छा रहता है।",
            "en": "Maize yields excellent commercial returns in loam and alluvial soils.",
        },
        "baseMarket": 95,
    },
    {
        "id": "cotton",
        "name": {"hi": "कपास (Cotton)", "en": "Cotton"},
        "icon": "☁️",
        "npkRatio": "90:45:45 kg/ha",
        "waterReq": {"hi": "मध्यम (600-800 mm)", "en": "Medium (600-800 mm)"},
        "profitScore": "High ⭐⭐⭐⭐",
        "yieldPerAcre": "10-14 Quintal",
        "desc": {
            "hi": "काली या दोमट मिट्टी में पौष्टिक पोटेशियम दर पर कपास की पैदावार अच्छी रहती है।",
            "en": "Cotton performs well in black or loamy soil with balanced potassium.",
        },
        "baseMarket": 88,
    },
    {
        "id": "pigeon_pea",
        "name": {"hi": "अरहर / तूर (Pigeon Pea)", "en": "Pigeon Pea (Arhar)"},
        "icon": "🫘",
        "npkRatio": "20:50:20 kg/ha",
        "waterReq": {"hi": "कम (350-450 mm)", "en": "Low (350-450 mm)"},
        "profitScore": "Very High ⭐⭐⭐⭐⭐",
        "yieldPerAcre": "8-12 Quintal",
        "desc": {
            "hi": "दलहनी फसल कम उर्वरक में अच्छा लाभ देती है और मिट्टी को नाइट्रोजन भी जोड़ती है।",
            "en": "Leguminous crop fixing nitrogen naturally and offering strong returns.",
        },
        "baseMarket": 92,
    },
    {
        "id": "bajra",
        "name": {"hi": "बाजरा (Pearl Millet)", "en": "Pearl Millet (Bajra)"},
        "icon": "🌾",
        "npkRatio": "60:30:20 kg/ha",
        "waterReq": {"hi": "बहुत कम (250-350 mm)", "en": "Very Low (250-350 mm)"},
        "profitScore": "High ⭐⭐⭐⭐",
        "yieldPerAcre": "12-15 Quintal",
        "desc": {
            "hi": "कम बारिश और मध्यम उपजाऊ मिट्टी के लिये बाजरा सबसे टिकाऊ विकल्प है।",
            "en": "Most resilient crop for low rainfall and moderate soil fertility.",
        },
        "baseMarket": 85,
    },
    {
        "id": "wheat",
        "name": {"hi": "गेहूँ (Wheat)", "en": "Wheat"},
        "icon": "🌾",
        "npkRatio": "120:60:40 kg/ha",
        "waterReq": {"hi": "मध्यम (450-550 mm)", "en": "Medium (450-550 mm)"},
        "profitScore": "Very High ⭐⭐⭐⭐⭐",
        "yieldPerAcre": "20-24 Quintal",
        "desc": {
            "hi": "रबी मौसम में गेहूँ की प्रमुख पैदावार बेहतर नाइट्रोजन स्तर पर है।",
            "en": "Wheat is a top Rabi crop with strong yield under balanced nitrogen levels.",
        },
        "baseMarket": 98,
    },
    {
        "id": "mustard",
        "name": {"hi": "सरसों (Mustard)", "en": "Mustard"},
        "icon": "🌼",
        "npkRatio": "80:40:40 kg/ha",
        "waterReq": {"hi": "कम (250-350 mm)", "en": "Low (250-350 mm)"},
        "profitScore": "High ⭐⭐⭐⭐⭐",
        "yieldPerAcre": "8-11 Quintal",
        "desc": {
            "hi": "तेलहन फसल कम सिंचाई में भी उत्कृष्ट बाजार मूल्य देती है।",
            "en": "Oilseed crop yielding strong returns with minimal irrigation.",
        },
        "baseMarket": 90,
    },
    {
        "id": "chickpea",
        "name": {"hi": "चना (Chickpea)", "en": "Chickpea (Gram)"},
        "icon": "🫘",
        "npkRatio": "20:50:20 kg/ha",
        "waterReq": {"hi": "कम (250-300 mm)", "en": "Low (250-300 mm)"},
        "profitScore": "High ⭐⭐⭐⭐",
        "yieldPerAcre": "10-14 Quintal",
        "desc": {
            "hi": "मिट्टी के स्वास्थ्य को सुधारते हुए कम पानी में उच्च लाभ देती है।",
            "en": "Soil-improving legume with strong returns under low irrigation.",
        },
        "baseMarket": 87,
    },
]

SOIL_TYPES = [
    "Loam Soil",
    "Alluvial Soil",
    "Black Soil",
    "Red Soil",
    "Sandy Soil",
    "Clay Soil",
]

SEASONS = ["Kharif", "Rabi", "Zaid"]

def format_recommendation(crop: Dict, market_score: float, predicted_price: float) -> Dict:
    return {
        **crop,
        "predictedMarketPrice": round(predicted_price, 2),
        "marketScore": round(market_score, 1),
    }

def get_crop_by_id(crop_id: str) -> Dict:
    for crop in CROP_CATALOG:
        if crop["id"] == crop_id:
            return crop
    return None

def get_crop_options() -> List[Dict]:
    return CROP_CATALOG
