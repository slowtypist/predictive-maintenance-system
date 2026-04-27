import os
os.environ["KERAS_BACKEND"] = "tensorflow"
import pandas as pd
import numpy as np
import keras
from keras import layers
from sklearn.preprocessing import MinMaxScaler
from preprocess_lstm import create_sequences, verify_data_integrity

def train_lstm_model():
    data_path = 'data/processed_train.csv'
    if not os.path.exists(data_path):
        print("Error: processed_train.csv not found!")
        return
    
    verify_data_integrity(data_path)
    df = pd.read_csv(data_path)
    
    # Scaling is key!
    scaler = MinMaxScaler()
    sensor_cols = [c for c in df.columns if c.startswith('s')]
    df[sensor_cols] = scaler.fit_transform(df[sensor_cols])

    X_sequences = create_sequences(df, sequence_length=30)
    y = df['RUL'].values[30:] 

    # Robust Model Architecture
    model = keras.Sequential([
        layers.Input(shape=(X_sequences.shape[1], X_sequences.shape[2])),
        layers.LSTM(units=128, return_sequences=True),
        layers.Dropout(0.2),
        layers.LSTM(units=64),
        layers.Dropout(0.2),
        layers.Dense(units=32, activation='relu'),
        layers.Dense(units=1) 
    ])

    # Using a slightly higher learning rate to help the model move faster
    optimizer = keras.optimizers.Adam(learning_rate=0.001)
    model.compile(optimizer=optimizer, loss='mse')
    
    print("Starting Deep Training (100 Epochs)... This will fix the under-prediction.")
    model.fit(X_sequences, y, epochs=100, batch_size=64, validation_split=0.1, verbose=1)

    model.save('lstm_model.keras')
    print("Success! Fresh 'lstm_model.keras' created.")

if __name__ == "__main__":
    train_lstm_model()