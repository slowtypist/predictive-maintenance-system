import pandas as pd
import numpy as np
import joblib
import shap
import matplotlib.pyplot as plt

# 1. LOAD THE BRAIN
model = joblib.load('models/factory_guard_brain.joblib')

# 2. LOAD DATA (NASA C-MAPSS-1)
col_names = ['id', 'cycle', 'setting1', 'setting2', 'setting3'] + [f's{i}' for i in range(1, 22)]
df = pd.read_csv('data/train_FD001.txt', sep=r'\s+', header=None, names=col_names)

# 3. FEATURE ENGINEERING (Must match train_brain.py)
sensor_cols = [f's{i}' for i in range(1, 22)]
# Create the 12-cycle rolling mean
df_rolling = df.groupby('id')[sensor_cols].rolling(window=12).mean().reset_index(level=0, drop=True)
df_rolling.columns = [col + '_mean_12' for col in sensor_cols]

# Combine and drop non-feature columns
X = pd.concat([df, df_rolling], axis=1).dropna()
X = X.drop(['id', 'cycle'], axis=1)

# Ensure no target label is present in the feature set
if 'label' in X.columns:
    X = X.drop('label', axis=1)

# 4. RUN SHAP (Using 100 rows to ensure 4600 data points match the error)
X_sample = X.head(100)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_sample)

# 5. GENERATE THE VISUALIZATION
plt.figure(figsize=(10, 6))
shap.summary_plot(shap_values, X_sample, show=False)
plt.title("FactoryGuard AI: Sensor Importance Breakdown")
plt.tight_layout()
plt.savefig('models/sensor_importance.png')
print("Success! Visualization saved to models/sensor_importance.png")