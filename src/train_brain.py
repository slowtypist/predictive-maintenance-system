import pandas as pd
import numpy as np
import joblib
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# 1. LOAD DATA
# The NASA dataset uses spaces as separators (\s+)
col_names = ['id', 'cycle', 'setting1', 'setting2', 'setting3'] + [f's{i}' for i in range(1, 22)]
df = pd.read_csv('data/train_FD001.txt', sep=r'\s+', header=None, names=col_names)
# 2. LABELING (The 24-Hour Goal)
# We find the last cycle for each engine (the failure point)
max_cycle = df.groupby('id')['cycle'].transform('max')
# Label '1' if the engine is within 24 cycles of failing, otherwise '0'
df['label'] = np.where(df['cycle'] >= (max_cycle - 24), 1, 0)

# 3. FEATURE ENGINEERING (Rolling Windows)
# As per project requirements, we give the model "memory"
sensor_cols = [f's{i}' for i in range(1, 22)]
# Calculate 12-cycle rolling mean for all sensors
df_rolling = df.groupby('id')[sensor_cols].rolling(window=12).mean().reset_index(level=0, drop=True)
df_rolling.columns = [col + '_mean_12' for col in sensor_cols]

# Combine and drop rows that don't have enough history for the window
df_final = pd.concat([df, df_rolling], axis=1).dropna()

# 4. TRAIN/TEST SPLIT
X = df_final.drop(['label', 'id', 'cycle'], axis=1)
y = df_final['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# 5. HANDLE IMBALANCE (<1% Failure Rate)
# Calculate the scale_pos_weight for XGBoost
weight = len(y_train[y_train == 0]) / len(y_train[y_train == 1])

# 6. INITIALIZE & TRAIN THE BRAIN
model = XGBClassifier(
    scale_pos_weight=weight, 
    n_estimators=100, 
    max_depth=5, 
    learning_rate=0.1,
    eval_metric='aucpr' # Optimize for Precision-Recall Area Under Curve
)

print("Training FactoryGuard AI...")
model.fit(X_train, y_train)

# 7. SAVE FOR DEPLOYMENT
joblib.dump(model, 'models/factory_guard_brain.joblib')
print("Brain saved successfully in /models!")