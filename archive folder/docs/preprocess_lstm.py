import pandas as pd
import numpy as np

def create_sequences(data, sequence_length=30):
    """
    Converts flat data into 3D sequences for LSTM.
    Shape: (Samples, Time_Steps, Features)
    """
    # We only want the sensor columns (s1 to s21)
    sensor_cols = [f's{i}' for i in range(1, 22)]
    data_array = data[sensor_cols].values
    
    sequences = []
    for i in range(len(data_array) - sequence_length):
        sequences.append(data_array[i : i + sequence_length])
        
    return np.array(sequences)

# This doesn't delete their work, it just adds a new way to 
# format the data for your advanced model.


import hashlib

def verify_data_integrity(file_path):
    """Generates a SHA-256 hash to ensure the data hasn't been tampered with."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    print(f"Data Security Signature: {sha256_hash.hexdigest()}")