import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout.jsx';
import HealthGauge from '@/components/HealthGauge.jsx';
import DegradationChart from '@/components/DegradationChart.jsx';
import ManualOverrideModal from '@/components/ManualOverrideModal.jsx';
import GlowingButton from '@/components/GlowingButton.jsx';
import { getAllEngines, getEngineData } from '@/lib/simulateSensorData';

const DashboardPage = () => {
  const [engines, setEngines] = useState([]);
  const [selectedEngineId, setSelectedEngineId] = useState(null);
  const [engineData, setEngineData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allEngines = getAllEngines();
    setEngines(allEngines);
    if (allEngines.length > 0) {
      setSelectedEngineId(allEngines[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedEngineId) {
      // Simulate API fetch delay
      const data = getEngineData(selectedEngineId);
      setEngineData(data);
    }
  }, [selectedEngineId]);

  if (!engineData) return null;

  return (
    <>
      <Helmet>
        <title>Dashboard - AeroPredict AI</title>
      </Helmet>

      <DashboardLayout 
        engines={engines} 
        selectedEngineId={selectedEngineId} 
        onSelectEngine={setSelectedEngineId}
      >
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                {engineData.id}
                <span className="text-sm font-normal px-3 py-1 rounded-full bg-card border border-border text-muted-foreground">
                  Last updated: {new Date(engineData.lastUpdated).toLocaleTimeString()}
                </span>
              </h1>
            </div>
            <GlowingButton onClick={() => setIsModalOpen(true)} variant="outline" className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Manual Override
            </GlowingButton>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEngineId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Left Column: Gauge */}
              <div className="lg:col-span-1">
                <HealthGauge rul={engineData.currentRul} />
                
                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Core Temp</p>
                    <p className="text-xl font-mono font-semibold">{engineData.sensors.temperature.toFixed(1)}°C</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Vibration</p>
                    <p className="text-xl font-mono font-semibold">{engineData.sensors.vibration.toFixed(2)} mm/s</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Pressure</p>
                    <p className="text-xl font-mono font-semibold">{engineData.sensors.pressure.toFixed(0)} PSI</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-1">RPM</p>
                    <p className="text-xl font-mono font-semibold">{engineData.sensors.rpm.toFixed(0)}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Chart */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <DegradationChart data={engineData.history} currentRul={engineData.currentRul} />
                
                {/* Sensor Data Grid */}
                <div className="bg-card rounded-2xl border border-border p-6 flex-1">
                  <h3 className="text-lg font-medium text-muted-foreground mb-4">Live Telemetry</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Object.entries(engineData.sensors).slice(0, 12).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-lg bg-background/50 border border-border/50">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate" title={key}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm font-mono mt-1">{value.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DashboardLayout>

      <ManualOverrideModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={engineData.sensors}
      />
    </>
  );
};

export default DashboardPage;