# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## AI Backend and Model Setup

This project includes a new Python backend for real crop disease detection and market-based crop recommendation.

1. Install backend dependencies with Python 3.11 or 3.12:
   ```bash
   cd ..
   python -m pip install -r backend/requirements.txt
   ```
2. Generate the market recommendation model:
   ```bash
   python -m backend.train_market_model
   ```
3. Generate the rainfall prediction model using real weather data if available:
   ```bash
   python -m backend.train_rainfall_model --data backend/data/sample_weather.csv
   ```
   Replace `backend/data/sample_weather.csv` with your own historical weather CSV dataset for more accurate predictions.
4. Use live weather integration on the Rainfall page:
   - Open the Rainfall page and click "Fetch Live Weather" to load current temperature, humidity, pressure, and wind data from Open-Meteo for the selected region.
5. Optionally, generate the disease CNN model stub:
   ```bash
   python -m backend.train_disease_model
   ```
6. Run the backend service:
   ```bash
   uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
   ```
7. Run the React frontend:
   ```bash
   cd krishimitra
   npm run dev
   ```

The `/disease` page now uses a CNN inference backend for leaf image classification, and the `/recommendation` page uses a trained market prediction model to recommend crops.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
