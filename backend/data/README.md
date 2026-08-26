# Rainfall Dataset Support

This folder contains optional weather datasets for training the rainfall prediction model.

## CSV format

The training script expects a CSV file with the following columns:

- `region` — region name matching one of the supported values:
  - `Uttar Pradesh (Gangetic Plain)`
  - `Punjab & Haryana`
  - `Bihar & West Bengal`
  - `Maharashtra & Madhya Pradesh`
  - `Rajasthan (Arid)`
  - `South India (Coastal)`
- `season` — season name: `Monsoon`, `Rabi`, or `Summer`
- `temp` — air temperature in °C
- `humidity` — relative humidity percentage
- `pressure` — atmospheric pressure in hPa
- `wind` — wind speed in km/h

Target columns:

- `probability` — rainfall probability score from 0 to 100
- `volume` — estimated rainfall volume in mm

Alternatively, a dataset may use a `rainfall_mm` column instead of `probability` and `volume`. In that case, the training script derives `probability` as `100` whenever rainfall is present.

## Training with your own dataset

Run:

```bash
python -m backend.train_rainfall_model --data backend/data/sample_weather.csv
```

Replace `backend/data/sample_weather.csv` with your real historical weather dataset file.

If the `--data` file is not found, the script falls back to synthetic sample data.

## Live weather API

The backend can also fetch current weather parameters from the Open-Meteo API. The Rainfall page in the frontend uses this live weather integration to auto-fill temperature, humidity, pressure, and wind speed for the selected region.
