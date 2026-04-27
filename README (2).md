# AeroPredict AI: Predictive Maintenance & RUL Analytics

**AERO PREDICT AI** is an enterprise-grade industrial IoT solution designed to minimize unscheduled downtime in aviation and manufacturing. By leveraging **Machine Learning (ML)** to analyze multi-modal sensor telemetry, the system calculates the **Remaining Useful Life (RUL)** of critical assets, enabling a transition from reactive to proactive maintenance strategies.

---

## 🎯 Why This Project?
Industrial machinery, especially aircraft engines, are subject to extreme conditions. Traditional maintenance is either:
1. **Reactive:** Fixing things after they break (high risk, high cost).
2. **Scheduled:** Fixing things based on time (wasteful, replaces good parts).

**AeroPredict AI** solves this by being **Predictive**. We use data to predict exactly when a part will fail, saving millions in operational costs and ensuring maximum safety.

---

## 🚀 What It Does
* **Real-time Health Monitoring:** Visualizes engine status via an interactive dashboard.
* **RUL Prediction:** Calculates the remaining cycles/time before maintenance is required.
* **Manual Simulation:** Allows engineers to input specific sensor data to test "what-if" failure scenarios.
* **Secure Access:** Protects industrial data through a robust authentication layer.

---

## 🏗️ How It Works (The Architecture)
The system uses a decoupled **Monorepo** architecture to separate heavy computation from the user interface:

1.  **The Brain (ML Layer):** A Python engine loads a pre-trained `.pkl` model. It receives raw sensor data and outputs a precise RUL prediction.
2.  **The Face (Frontend):** A React-based dashboard (running on Port 3005) that provides real-time gauges and input modals.
3.  **The Nervous System (Backend):** A Node.js API (Port 3001) that bridges the UI and the ML model using process spawning and manages data persistence.
4.  **The Memory (Database):** Pocketbase stores user credentials and a complete history of all predictions made.

---

## 🛠️ Tech Stack
| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Machine Learning** | Python, Scikit-learn, Joblib, NumPy |
| **Database** | Pocketbase |
| **Authentication** | JWT (JSON Web Tokens) |

---

## 👥 The Team: **Zaalima Development**
This project is a collaborative effort by the following team members:

* **@slowtypist** (Lead Data Scientist & Frontend Architect)
    * *Contributions:* ML Model training, `predict_engine.py` architecture, React Dashboard development, and system design.
* **@Shivareddy8008** (Back end& S ecurity Engineer)
    * *Contributions:* Backend API Bridge, Authentication logic, Database schema, and Input validation.



## 🛠️ Setup Instructions
1. Install Python dependencies: `pip install -r requirements.txt`
2. Run the preprocessing script: `python ml-model/preprocess.py`
3. Train the model: `python ml-model/train.py`