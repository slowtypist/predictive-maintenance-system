import os
import pandas as pd
import numpy as np
import keras
from keras import layers
from sklearn.preprocessing import MinMaxScaler

# Setup backend for TensorFlow
os.environ["KERAS_BACKEND"] = "tensorflow"

def build_and_save_lstm():
    # 1. Path setup - finding the data
    # This looks for the data relative to the project root
    data_path = 'data/processed_train.csv'
    
    if not os.path.exists(data_path):
        print("❌ Error: 'data/processed_train.csv' not found!")
        print("Make sure you are running the terminal from the 'predictive-maintenance-system' folder.")
        return

    print("--- Loading and Scaling Data (Memory Optimized) ---")
    df = pd.read_csv(data_path)

    # 2. Select ONLY the sensors to save memory (s1 through s21)
    sensor_cols = [f's{i}' for i in range(1, 22)]
    
    # 3. Scaling (Essential for LSTM convergence)
    scaler = MinMaxScaler()
    df[sensor_cols] = scaler.fit_transform(df[sensor_cols])

    # 4. Create Sequences (Using 15 time-steps for better RAM management)
    seq_length = 15 
    data_array = df[sensor_cols].values.astype('float32') # Use float32 to save RAM
    
    sequences = []
    for i in range(len(data_array) - seq_length):
        sequences.append(data_array[i : i + seq_length])
    
    X = np.array(sequences)
    y = df['RUL'].values[seq_length:].astype('float32')

    # 5. Define the Architecture (Optimized for your internship project)
    model = keras.Sequential([
        layers.Input(shape=(seq_length, len(sensor_cols))),
        layers.LSTM(64, return_sequences=False), 
        layers.Dropout(0.2),
        layers.Dense(16, activation='relu'),
        layers.Dense(1)
    ])

    # 6. Training
    model.compile(optimizer='adam', loss='mse')
    print(f"🚀 Training starting with sequence length {seq_length}...")
    
    # Batch size 32 is stable and memory-friendly
    model.fit(X, y, epochs=10, batch_size=32, verbose=1)

    # 7. FORCE SAVE - This ensures the file appears in your sidebar
    # Find the folder where this script is actually sitting
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, 'lstm_model.keras')

    model.save(model_path)
    
    print("\n" + "="*30)
    if os.path.exists(model_path):
        print(f"✅ SUCCESS: 'lstm_model.keras' created at:")
        print(f"📍 {model_path}")
        print("="*30)
        print("👉 ACTION: Click the REFRESH icon in your VS Code sidebar now!")
    else:
        print("❌ ERROR: File save failed. Check folder permissions.")

if __name__ == "__main__":
    build_and_save_lstm()