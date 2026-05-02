import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { getMLPrediction } from '@/lib/getMLPrediction';
import GlowingButton from '@/components/GlowingButton.jsx';

const SENSOR_FIELDS = [
  { key: 'temperature', label: 'Temperature (°C)', default: 85 },
  { key: 'pressure', label: 'Pressure (PSI)', default: 450 },
  { key: 'vibration', label: 'Vibration (mm/s)', default: 12 },
  { key: 'rpm', label: 'RPM', default: 8500 },
  { key: 'fuelFlow', label: 'Fuel Flow', default: 750 },
  { key: 'oilTemperature', label: 'Oil Temperature', default: 95 },
  { key: 'bearingTemperature', label: 'Bearing Temp', default: 78 },
  { key: 'compressorInletTemp', label: 'Comp Inlet Temp', default: 25 },
  { key: 'turbineOutletTemp', label: 'Turbine Outlet Temp', default: 650 },
  { key: 'compressorOutletTemp', label: 'Comp Outlet Temp', default: 200 },
  { key: 'turbineInletTemp', label: 'Turbine Inlet Temp', default: 800 },
  { key: 'bleedAirTemp', label: 'Bleed Air Temp', default: 300 },
  { key: 'bypassRatio', label: 'Bypass Ratio', default: 5.2 },
  { key: 'throttlePosition', label: 'Throttle Position', default: 75 },
  { key: 'altitude', label: 'Altitude', default: 35000 },
  { key: 'machNumber', label: 'Mach Number', default: 0.85 },
  { key: 'ambientTemp', label: 'Ambient Temp', default: -55 },
  { key: 'humidity', label: 'Humidity', default: 45 },
  { key: 'fuelPressure', label: 'Fuel Pressure', default: 350 },
  { key: 'lubricationPressure', label: 'Lube Pressure', default: 280 },
  { key: 'vibrationX', label: 'Vibration X', default: 5.2 },
  { key: 'vibrationY', label: 'Vibration Y', default: 4.8 },
  { key: 'vibrationZ', label: 'Vibration Z', default: 6.1 }
];

const ManualOverrideModal = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    SENSOR_FIELDS.forEach(f => {
      initial[f.key] = initialData?.[f.key] ?? f.default;
    });
    return initial;
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await getMLPrediction(formData);
      setResult(prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Manual Sensor Override</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {result ? (
              <div className="space-y-6">
                <div className={`p-6 rounded-xl border ${
                  result.status === 'Critical' ? 'bg-destructive/10 border-destructive text-destructive' :
                  result.status === 'Caution' ? 'bg-secondary/10 border-secondary text-secondary' :
                  'bg-primary/10 border-primary text-primary'
                }`}>
                  <h3 className="text-xl font-bold mb-2">Prediction Result: {result.status}</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm opacity-80">Remaining Useful Life</p>
                      <p className="text-3xl font-bold">{result.rul.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Confidence Score</p>
                      <p className="text-3xl font-bold">{result.confidence}%</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-current/20">
                    <p className="text-sm opacity-80 mb-1">Recommended Action</p>
                    <p className="font-medium">{result.recommendedAction}</p>
                  </div>
                </div>
                <GlowingButton onClick={() => setResult(null)} className="w-full">
                  Run Another Test
                </GlowingButton>
              </div>
            ) : (
              <form id="override-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SENSOR_FIELDS.map(field => (
                  <div key={field.key} className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                    <input
                      type="number"
                      step="any"
                      name={field.key}
                      value={formData[field.key]}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                ))}
              </form>
            )}

            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start space-x-3 text-destructive">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {!result && (
            <div className="p-6 border-t border-border bg-background/50 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <GlowingButton
                type="submit"
                form="override-form"
                disabled={loading}
                className="min-w-[160px]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Calculating...
                  </span>
                ) : (
                  'Run Prediction'
                )}
              </GlowingButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ManualOverrideModal;