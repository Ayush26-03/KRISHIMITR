# 🌾 KrishiMitra (कृषि मित्र) — AI-Powered Smart Agriculture Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-brightgreen?style=for-the-badge&logo=render)](https://krishimitr-frontend.onrender.com)
[![API Docs](https://img.shields.io/badge/Swagger%20API-Docs-009688?style=for-the-badge&logo=fastapi)](https://krishimitr-bucq.onrender.com/docs)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![PyTorch](https://img.shields.io/badge/Deep%20Learning-PyTorch-EE4C2C?style=for-the-badge&logo=pytorch)](https://pytorch.org/)

**KrishiMitra** is an end-to-end Smart Agriculture web platform designed to empower farmers and agricultural stakeholders with AI-driven insights. It delivers real-time plant disease diagnosis, machine-learning-based rainfall prediction, intelligent crop recommendations, and market analytics — all accessible in **Hindi** and **English**.

---

## 🌐 Live Deployments

- **🖥️ Frontend Web App**: [https://krishimitr-frontend.onrender.com](https://krishimitr-frontend.onrender.com)
- **⚡ Backend REST API**: [https://krishimitr-bucq.onrender.com](https://krishimitr-bucq.onrender.com)
- **📖 Interactive API Docs (Swagger UI)**: [https://krishimitr-bucq.onrender.com/docs](https://krishimitr-bucq.onrender.com/docs)

---

## 🌟 Key Features

### 1. 🍃 AI Plant Disease Detection
- Upload or capture leaf photos to diagnose crop health.
- Identifies major crop diseases such as **Yellow Rust (Wheat)**, **Late Blight (Tomato)**, and **Rice Blast (Paddy)**.
- Provides actionable diagnostic reports:
  - **Symptoms breakdown**
  - **Organic remedies** (e.g., Neem oil, buttermilk, Trichoderma)
  - **Chemical control measures** (e.g., Propiconazole, Mancozeb, Tricyclazole)
  - **Preventive actions**

### 2. 🌧️ ML Rainfall Prediction & Live Weather
- Predicts seasonal and monthly rainfall using trained machine learning models based on geographical region, season, and atmospheric conditions.
- Real-time weather integration powered by **Open-Meteo API** (live temperature, humidity, atmospheric pressure, and wind speed).

### 3. 🌱 Smart Crop Recommendation
- Recommends the most suitable and profitable crops tailored to specific soil types (Alluvial, Black, Red, Clay, Sandy), agro-climatic zones, and seasonal conditions.

### 4. 📊 Market Trends & Crop Analytics
- Real-time market insights, mandi price indications, and crop health metrics to maximize farmer revenue.

### 5. 🌐 Bilingual Support (हिन्दी / English)
- Full one-click localization between Hindi and English for maximum rural accessibility.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Context API |
| **Backend** | FastAPI, Python 3.10+, Uvicorn, Pydantic |
| **AI / ML & CV** | PyTorch, Scikit-learn, NumPy, Pillow, Joblib |
| **External APIs** | Open-Meteo Weather API |
| **Deployment** | Render (Static Site + Web Service), Docker, Render Blueprints (`render.yaml`) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **Git**

---

### 1. Clone the Repository
```bash
git clone https://github.com/Ayush26-03/KRISHIMITR.git
cd KRISHIMITR
```

---

### 2. Setup & Run Backend

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
python -m backend.app
# Backend will start at http://localhost:8000
```

---

### 3. Setup & Run Frontend

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install packages
npm install

# Start development server
npm run dev
# Frontend will start at http://localhost:5173
```

---

## 📁 Project Structure

```text
KRISHIMITR/
├── backend/
│   ├── app.py                      # Main FastAPI server & prediction routes
│   ├── recommendation_data.py      # Crop catalog and recommendation engine
│   ├── weather_data.py             # Weather coordinates and API integration
│   ├── train_market_model.py       # Market price model training pipeline
│   ├── train_rainfall_model.py     # Rainfall ML model training pipeline
│   ├── requirements.txt            # Python dependencies
│   └── models/                     # Trained ML & PyTorch model weights
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI components (Navbar, etc.)
│   │   ├── context/                # Language context (Hindi/English)
│   │   ├── pages/                  # Pages: Landing, Dashboard, Disease, Rainfall, Recommendation
│   │   └── config/api.js           # API base URL configuration
│   ├── package.json
│   └── vite.config.js
│
├── render.yaml                     # Render Infrastructure-as-Code Blueprint
└── README.md
```

---

## ☁️ Deployment on Render

This project includes a preconfigured [`render.yaml`](./render.yaml) for one-click deployment:

1. **Backend Web Service**:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `python -m backend.app`

2. **Frontend Static Site**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Rewrite Rule**: `/*` $\rightarrow$ `/index.html` (SPA Routing)
   - **Environment Variable**: `VITE_API_BASE_URL` = `https://krishimitr-bucq.onrender.com`

---

## 📜 License
Distributed under the **MIT License**. Feel free to use, modify, and distribute for educational and commercial purposes.

---

## 👨‍💻 Author
- **Ayush Pandey** — [GitHub (@Ayush26-03)](https://github.com/Ayush26-03)
