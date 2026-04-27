# AeroPredict-AI: Predictive Maintenance System

AeroPredict-AI is a deep learning-based predictive maintenance solution designed to estimate the Remaining Useful Life (RUL) of aircraft engines using multi-sensor temporal data.

## 🚀 Key Features
- **LSTM Architecture:** Utilizes Long Short-Term Memory networks to capture temporal dependencies in engine degradation.
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