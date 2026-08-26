import argparse
import os

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

from backend.weather_data import WEATHER_REGIONS, WEATHER_SEASONS

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "rainfall_model.joblib")


def load_real_data(csv_path: str):
    df = pd.read_csv(csv_path)
    required_columns = {"region", "season", "temp", "humidity", "pressure", "wind"}
    if not required_columns.issubset(df.columns):
        missing = required_columns - set(df.columns)
        raise ValueError(f"Missing required columns in dataset: {', '.join(sorted(missing))}")

    if {"probability", "volume"}.issubset(df.columns):
        probability = df["probability"].astype(float)
        volume = df["volume"].astype(float)
    elif "rainfall_mm" in df.columns:
        probability = (df["rainfall_mm"] > 0).astype(float) * 100
        volume = df["rainfall_mm"].astype(float)
    else:
        raise ValueError(
            "Dataset must contain either 'probability' and 'volume' columns, or 'rainfall_mm' to derive targets."
        )

    region_map = {region: idx for idx, region in enumerate(WEATHER_REGIONS)}
    season_map = {season: idx for idx, season in enumerate(WEATHER_SEASONS)}

    feature_df = df.copy()
    feature_df["region"] = feature_df["region"].astype(str).map(region_map).fillna(0).astype(int)
    feature_df["season"] = feature_df["season"].astype(str).map(season_map).fillna(0).astype(int)

    X = feature_df[["region", "season", "temp", "humidity", "pressure", "wind"]].astype(float).to_numpy()
    y = np.vstack([probability, volume]).T
    return X, y


def make_synthetic_data():
    rows = []
    targets = []

    for region_index, region in enumerate(WEATHER_REGIONS):
        for season_index, season in enumerate(WEATHER_SEASONS):
            for temp in [20, 25, 30, 35, 40]:
                for humidity in [30, 50, 70, 90]:
                    for pressure in [980, 1000, 1015, 1030]:
                        for wind in [5, 12, 20, 30]:
                            probability = humidity * 0.8
                            probability += (1025 - pressure) * 1.2
                            probability -= (temp - 25) * 1.3
                            probability -= wind * 0.3
                            if season == "Monsoon":
                                probability += 10
                            if season == "Rabi":
                                probability -= 5
                            if region in ["South India (Coastal)", "Bihar & West Bengal"]:
                                probability += 4
                            probability = np.clip(probability, 5, 99)
                            volume = np.clip(probability / 100 * 60 + np.random.uniform(-5, 5), 0, 120)
                            rows.append([
                                region_index,
                                season_index,
                                temp,
                                humidity,
                                pressure,
                                wind,
                            ])
                            targets.append([probability, volume])

    return np.array(rows, dtype=np.float32), np.array(targets, dtype=np.float32)


def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=30, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    return model, score


def main():
    parser = argparse.ArgumentParser(description="Train or retrain the rainfall prediction model.")
    parser.add_argument(
        "--data",
        type=str,
        default=None,
        help="Path to a CSV dataset containing historical weather and rainfall information.",
    )
    args = parser.parse_args()

    if args.data and os.path.exists(args.data):
        print(f"Loading real weather dataset from {args.data}")
        X, y = load_real_data(args.data)
    else:
        if args.data:
            print(f"Dataset not found at {args.data}. Falling back to synthetic sample data.")
        else:
            print("No dataset path provided, training with synthetic sample data.")
        X, y = make_synthetic_data()

    model, score = train_model(X, y)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH, compress=3)
    print(f"Saved rainfall model to {MODEL_PATH}. Test R^2 score: {score:.3f}")


if __name__ == "__main__":
    main()
