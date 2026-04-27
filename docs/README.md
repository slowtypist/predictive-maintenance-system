Industrial Predictive Maintenance System
🏭 Project Overview
This system is designed for smart factory environments to predict the Remaining Useful Life (RUL) of industrial assets, including robotic arms, automated assembly lines, and high-precision motors.

By analyzing multi-sensor data (such as torque, vibration, and thermal fluctuations), the model identifies subtle degradation patterns before they lead to costly factory-line stoppages.

🤖 Key Features
Predictive Analytics: Uses an LSTM Neural Network to handle complex time-series sensor data.

Asset Agnostic: While currently validated on operational cycles, the architecture is designed to scale across various factory hardware.

High Accuracy: Achieved a Mean Absolute Error (MAE) of 16.53, providing reliable maintenance windows for robotic actuators.

## 🚀 Key Features
- **LSTM Architecture:** Utilizes Long Short-Term Memory networks to capture temporal dependencies in asset degradation.
- **Normalization Pipeline:** Features a robust MinMaxScaler pre-processing layer to handle high-variance sensor data.
- **Integrity Validation:** Custom security checks to verify data consistency before training.
- **Performance Evaluation:** Integrated RMSE and MAE calculation for high-precision maintenance scheduling.

## 📊 Technical Results
- **Mean Absolute Error (MAE):** 16.53 cycles
- **Root Mean Squared Error (RMSE):** 27.22 cycles
- **Training Duration:** 100 Epochs with Adam optimization

## 🛠 Setup & Usage
1. Ensure `data/processed_train.csv` is present.
2. Run training: `python train_lstm.py`
3. Visualize and evaluate: `python visualize_results.py`

## 📂 Project Structure
- `train_lstm.py`: Model architecture and training logic.
- `visualize_results.py`: Evaluation metrics and graph generation.
- `preprocess_lstm.py`: Data sequencing and integrity utilities.