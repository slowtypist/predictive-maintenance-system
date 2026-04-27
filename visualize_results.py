import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import keras
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.preprocessing import MinMaxScaler
from preprocess_lstm import create_sequences

def run_evaluation():
    # 1. Load Data
    df = pd.read_csv('data/processed_train.csv')
    
    # 2. Scale the sensors (Must match training!)
    scaler = MinMaxScaler()
    sensor_cols = [c for c in df.columns if c.startswith('s')]
    df[sensor_cols] = scaler.fit_transform(df[sensor_cols])
    
    # 3. Load the Model
    model = keras.models.load_model('lstm_model.keras')

    # 4. Prepare Sequences
    X_sequences = create_sequences(df, sequence_length=30)
    y_actual = df['RUL'].values[30:]

    # 5. Get AI Predictions
    print("AI is calculating predictions and metrics...")
    y_pred = model.predict(X_sequences).flatten() # flatten to 1D for metrics

    # --- PART A: CALCULATE METRICS ---
    mae = mean_absolute_error(y_actual, y_pred)
    rmse = np.sqrt(mean_squared_error(y_actual, y_pred))

    print("\n" + "="*35)
    print("      AeroPredict-AI REPORT")
    print("="*35)
    print(f"Mean Absolute Error: {mae:.2f} cycles")
    print(f"Root Mean Squared Error: {rmse:.2f} cycles")
    print("="*35 + "\n")

    # --- PART B: PLOT GRAPH ---
    plt.figure(figsize=(12, 6))
    plt.plot(y_actual[:500], label='Actual RUL', color='blue', linewidth=2)
    plt.plot(y_pred[:500], label='LSTM Prediction', color='red', linestyle='--')
    
    plt.title(f'AeroPredict-AI Performance (RMSE: {rmse:.2f})')
    plt.xlabel('Flight Cycles')
    plt.ylabel('Remaining Useful Life (RUL)')
    plt.legend()
    plt.grid(True)
    
    print("Displaying graph...")
    plt.show()

if __name__ == "__main__":
    run_evaluation()