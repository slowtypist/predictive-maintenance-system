import sys
import os
# This tells Python to look in your local 'lib' folder first
sys.path.append(os.path.join(os.getcwd(), "lib"))

# Now the rest of your imports
os.environ["KERAS_BACKEND"] = "tensorflow"
import keras
from keras import layers
# ... rest of your code
from preprocess_lstm import create_sequences, verify_data_integrity

def train_lstm_model():
    # ... (the rest of your code)
    
    # Update your model definition to use the new 'layers' syntax:
    model = keras.Sequential([
        layers.LSTM(units=50, return_sequences=True, input_shape=(X_sequences.shape[1], X_sequences.shape[2])),
        layers.Dropout(0.2),
        layers.LSTM(units=50),
        layers.Dropout(0.2),
        layers.Dense(units=1)
    ])

def clean_data():
    # Define Column Names
    col_names = ['id', 'cycle', 'set1', 'set2', 'set3'] + [f's{i}' for i in range(1, 22)]
    
    # Load the training file
    train_path = 'data/train_FD001.txt'
    
    if os.path.exists(train_path):
        df = pd.read_csv(train_path, sep='\s+', header=None, names=col_names)
        
        # Calculate RUL: The engine fails at the last cycle for each ID
        # So RUL = (Max Cycle for that ID) - (Current Cycle)
        max_cycle = df.groupby('id')['cycle'].transform('max')
        df['RUL'] = max_cycle - df['cycle']
        
        # Save as a clean CSV
        df.to_csv('data/processed_train.csv', index=False)
        print(" Success! 'data/processed_train.csv' created.")
    else:
        print("Error: train_FD001.txt not found in data folder!")

if __name__ == "__main__":
    clean_data()