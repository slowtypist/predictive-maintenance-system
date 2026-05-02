export const generateEngineData = () => {
  const engines = [
    { id: 'Engine-001', baseRul: 85, status: 'Healthy' },
    { id: 'Engine-002', baseRul: 62, status: 'Caution' },
    { id: 'Engine-003', baseRul: 92, status: 'Healthy' },
    { id: 'Engine-004', baseRul: 28, status: 'Critical' },
    { id: 'Engine-005', baseRul: 45, status: 'Caution' },
  ];

  const data = {};

  engines.forEach(engine => {
    // Generate 30 days of history
    const history = [];
    let currentRul = engine.baseRul + 15; // Start higher 30 days ago
    if (currentRul > 100) currentRul = 100;

    for (let i = 30; i >= 0; i--) {
      history.push({
        day: `Day -${i}`,
        rul: Math.max(0, Math.round(currentRul))
      });
      // Degrade slightly each day
      currentRul -= (Math.random() * 1.5);
    }

    // Current sensor readings
    const sensors = {
      temperature: 85 + (Math.random() * 20 - 10),
      pressure: 450 + (Math.random() * 50 - 25),
      vibration: 12 + (Math.random() * 5),
      rpm: 8500 + (Math.random() * 500 - 250),
      fuelFlow: 750 + (Math.random() * 50 - 25),
      oilTemperature: 95 + (Math.random() * 10 - 5),
      bearingTemperature: 78 + (Math.random() * 15 - 7.5),
      compressorInletTemp: 25 + (Math.random() * 10 - 5),
      turbineOutletTemp: 650 + (Math.random() * 100 - 50),
      compressorOutletTemp: 200 + (Math.random() * 30 - 15),
      turbineInletTemp: 800 + (Math.random() * 100 - 50),
      bleedAirTemp: 300 + (Math.random() * 40 - 20),
      bypassRatio: 5.2 + (Math.random() * 0.4 - 0.2),
      throttlePosition: 75 + (Math.random() * 20 - 10),
      altitude: 35000 + (Math.random() * 5000 - 2500),
      machNumber: 0.85 + (Math.random() * 0.1 - 0.05),
      ambientTemp: -55 + (Math.random() * 10 - 5),
      humidity: 45 + (Math.random() * 20 - 10),
      fuelPressure: 350 + (Math.random() * 40 - 20),
      lubricationPressure: 280 + (Math.random() * 30 - 15),
      vibrationX: 5.2 + (Math.random() * 2 - 1),
      vibrationY: 4.8 + (Math.random() * 2 - 1),
      vibrationZ: 6.1 + (Math.random() * 2 - 1)
    };

    data[engine.id] = {
      id: engine.id,
      currentRul: history[history.length - 1].rul,
      status: engine.status,
      lastUpdated: new Date().toISOString(),
      history,
      sensors
    };
  });

  return data;
};

const engineDataStore = generateEngineData();

export const getEngineData = (id) => {
  return engineDataStore[id];
};

export const getAllEngines = () => {
  return Object.values(engineDataStore).map(e => ({
    id: e.id,
    status: e.status,
    currentRul: e.currentRul
  }));
};