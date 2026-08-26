import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

from backend.recommendation_data import CROP_CATALOG, SEASONS, SOIL_TYPES

import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "market_model.joblib")


def make_training_data():
    rows = []
    targets = []

    for crop_index, crop in enumerate(CROP_CATALOG):
        base_price = crop["baseMarket"]
        for season_index, season in enumerate(SEASONS):
            for soil_index, soil_type in enumerate(SOIL_TYPES):
                for nitrogen in [20, 50, 80, 110, 140]:
                    for phosphorus in [10, 30, 50, 70]:
                        for potassium in [10, 30, 50, 70]:
                            for ph in [5.5, 6.5, 7.5, 8.5]:
                                score = base_price
                                if crop_index == 0 and season == "Kharif":
                                    score += 10
                                if crop_index == 1 and soil_type in ["Loam Soil", "Alluvial Soil"]:
                                    score += 8
                                if crop_index == 2 and soil_type in ["Black Soil", "Loam Soil"]:
                                    score += 6
                                if crop_index in [3, 4] and soil_type in ["Sandy Soil", "Red Soil"]:
                                    score += 7
                                if crop_index == 5 and season == "Rabi":
                                    score += 12
                                if crop_index == 6 and season == "Rabi":
                                    score += 9
                                if crop_index == 7 and ph >= 6.0:
                                    score += 5
                                score += (nitrogen - 60) * 0.1
                                score += (phosphorus - 35) * 0.08
                                score += (potassium - 35) * 0.07
                                score += np.random.uniform(-5, 5)
                                rows.append([
                                    nitrogen,
                                    phosphorus,
                                    potassium,
                                    ph,
                                    season_index,
                                    soil_index,
                                    crop_index,
                                ])
                                targets.append(score)

    return np.array(rows, dtype=np.float32), np.array(targets, dtype=np.float32)


def main():
    X, y = make_training_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=30, max_depth=12, random_state=42)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)

    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH, compress=3)
    print(f"Saved market model to {MODEL_PATH}. Test R^2 score: {score:.3f}")


if __name__ == "__main__":
    main()
