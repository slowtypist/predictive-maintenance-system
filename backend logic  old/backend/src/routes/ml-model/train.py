import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

def train_model():
    # 1. Load the cleaned data
    data_path = 'data/processed_train.csv'
    if not os.path.exists(data_path):
        print(" Error: Run preprocess.py first!")
        return

    print(" Loading processed data...")
    df = pd.read_csv(data_path)
    
    # 2. Feature Selection
    # X = Sensors and Settings | y = Remaining Useful Life (RUL)
    X = df.drop(columns=['id', 'cycle', 'RUL'])
    y = df['RUL']
    
    # 3. Train the Model
    # We use Random Forest as the baseline per Zaalima standards
    print(" Training the Predictive Maintenance Model... this may take a moment.")
    model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
    model.fit(X, y)
    
    # 4. Save the Model Artifact
    # This file will be used by your Backend later
    joblib.dump(model, 'model.pkl')
    print(" Success! 'model.pkl' created in the root folder.")

if __name__ == "__main__":
    train_model()