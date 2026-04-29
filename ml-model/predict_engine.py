import sys
import json
import joblib
import numpy as np
import os

# Suppress TF logs for a clean output
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import keras

def run_dual_prediction():
    try:
        # 1. Load BOTH models
        # Ensure these files are in the same folder as this script
        rf_model = joblib.load('model.pkl')
        lstm_model = keras.models.load_model('lstm_model.keras')

        # 2. Read data from Node.js
        input_json = sys.stdin.read()
        if not input_json:
            return
        input_data = json.loads(input_json)
        
        # 3. Prepare features
        # Ensure the order of keys matches your training data (s1, s2... s21)
        input_values = list(input_data.values())
        rf_features = np.array([input_values])

        # 4. Predict using your Random Forest (Aero Specific)
        rf_prediction = rf_model.predict(rf_features)

        # 5. Predict using LSTM (General Hardware)
        # MATCHING THE TRAINING: Use sequence length 15
        # We reshape to (1, 15, 21)
        lstm_seq = np.repeat(rf_features, 15, axis=0).reshape(1, 15, rf_features.shape[1])
        lstm_prediction = lstm_model.predict(lstm_seq, verbose=0)

        # 6. Send results back to the website
        results = {
            "aero_rf_rul": round(float(rf_prediction[0]), 2),
            "general_lstm_rul": round(float(lstm_prediction[0][0]), 2),
            "status": "Success",
            "engine_type": "Unified Dual-Model"
        }
        
        print(json.dumps(results))

    except Exception as e:
        # Crucial for debugging the Node.js connection
        print(json.dumps({"error": str(e), "status": "Failed"}))

if __name__ == "__main__":
    run_dual_prediction()