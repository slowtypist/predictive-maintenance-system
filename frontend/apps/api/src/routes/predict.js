import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

// Validate required sensor parameters
const REQUIRED_SENSORS = [
  'temperature',
  'pressure',
  'vibration',
  'rpm',
  'fuelFlow',
  'oilTemperature',
  'bearingTemperature',
  'compressorInletTemp',
  'turbineOutletTemp',
  'compressorOutletTemp',
  'turbineInletTemp',
  'bleedAirTemp',
  'bypassRatio',
  'throttlePosition',
  'altitude',
  'machNumber',
  'ambientTemp',
  'humidity',
  'fuelPressure',
  'lubricationPressure',
  'vibrationX',
  'vibrationY',
  'vibrationZ',
];

/**
 * Simulate ML model prediction for RUL (Remaining Useful Life)
 * Calculates RUL based on sensor inputs with realistic variance
 */
function predictRUL(sensors) {
  // Normalize sensor values to 0-1 range for calculation
  const normalizedValues = {
    tempFactor: Math.min(sensors.temperature / 150, 1),
    pressureFactor: Math.min(sensors.pressure / 500, 1),
    vibrationFactor: Math.min(sensors.vibration / 50, 1),
    rpmFactor: Math.min(sensors.rpm / 10000, 1),
    bearingTempFactor: Math.min(sensors.bearingTemperature / 120, 1),
    oilTempFactor: Math.min(sensors.oilTemperature / 100, 1),
    fuelFlowFactor: Math.min(sensors.fuelFlow / 1000, 1),
    vibrationXFactor: Math.min(Math.abs(sensors.vibrationX) / 30, 1),
    vibrationYFactor: Math.min(Math.abs(sensors.vibrationY) / 30, 1),
    vibrationZFactor: Math.min(Math.abs(sensors.vibrationZ) / 30, 1),
  };

  // Calculate degradation score (0-1, where 1 is worst condition)
  const degradationScore =
    normalizedValues.tempFactor * 0.15 +
    normalizedValues.pressureFactor * 0.12 +
    normalizedValues.vibrationFactor * 0.20 +
    normalizedValues.rpmFactor * 0.10 +
    normalizedValues.bearingTempFactor * 0.15 +
    normalizedValues.oilTempFactor * 0.10 +
    normalizedValues.fuelFlowFactor * 0.08 +
    (normalizedValues.vibrationXFactor +
      normalizedValues.vibrationYFactor +
      normalizedValues.vibrationZFactor) *
      0.10;

  // Convert degradation score to RUL (0-100)
  // Higher degradation = lower RUL
  let baseRUL = 100 - degradationScore * 100;

  // Add realistic variance (±5-10%)
  const variance = (Math.random() - 0.5) * 20; // ±10%
  const rul = Math.max(0, Math.min(100, baseRUL + variance));

  // Calculate confidence based on sensor consistency
  const vibrationConsistency =
    1 -
    Math.abs(
      normalizedValues.vibrationXFactor -
        normalizedValues.vibrationYFactor
    ) /
      2;
  const confidence = Math.round(
    85 + vibrationConsistency * 14 + Math.random() * 0.5
  );

  // Determine status based on RUL
  let status;
  if (rul >= 70) {
    status = 'Healthy';
  } else if (rul >= 40) {
    status = 'Caution';
  } else {
    status = 'Critical';
  }

  // Determine recommended action
  let recommendedAction;
  if (status === 'Healthy') {
    recommendedAction = 'Continue normal operation with routine maintenance';
  } else if (status === 'Caution') {
    recommendedAction =
      'Schedule preventive maintenance within next 2-4 weeks';
  } else {
    recommendedAction =
      'Immediate inspection and maintenance required to prevent failure';
  }

  return {
    rul: Math.round(rul * 10) / 10, // Round to 1 decimal place
    confidence,
    status,
    recommendedAction,
  };
}

/**
 * POST /predict
 * Accepts 24 sensor parameters and returns RUL prediction
 */
router.post('/', async (req, res) => {
  const { body } = req;

  // Validate all required sensors are present
  const missingParams = REQUIRED_SENSORS.filter((param) => !(param in body));
  if (missingParams.length > 0) {
    return res.status(400).json({
      error: 'Missing required sensor parameters',
      missing: missingParams,
    });
  }

  // Validate all parameters are numbers
  const invalidParams = REQUIRED_SENSORS.filter(
    (param) => typeof body[param] !== 'number' || isNaN(body[param])
  );
  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: 'Invalid sensor parameters - all values must be numbers',
      invalid: invalidParams,
    });
  }

  // Validate sensor values are within reasonable ranges
  const rangeValidation = {
    temperature: { min: -50, max: 200 },
    pressure: { min: 0, max: 1000 },
    vibration: { min: 0, max: 100 },
    rpm: { min: 0, max: 20000 },
    fuelFlow: { min: 0, max: 2000 },
    oilTemperature: { min: -20, max: 150 },
    bearingTemperature: { min: -20, max: 150 },
    compressorInletTemp: { min: -50, max: 100 },
    turbineOutletTemp: { min: 0, max: 1000 },
    compressorOutletTemp: { min: 0, max: 300 },
    turbineInletTemp: { min: 0, max: 1000 },
    bleedAirTemp: { min: 0, max: 500 },
    bypassRatio: { min: 0, max: 10 },
    throttlePosition: { min: 0, max: 100 },
    altitude: { min: -1000, max: 50000 },
    machNumber: { min: 0, max: 3 },
    ambientTemp: { min: -60, max: 60 },
    humidity: { min: 0, max: 100 },
    fuelPressure: { min: 0, max: 500 },
    lubricationPressure: { min: 0, max: 500 },
    vibrationX: { min: -100, max: 100 },
    vibrationY: { min: -100, max: 100 },
    vibrationZ: { min: -100, max: 100 },
  };

  const outOfRangeParams = REQUIRED_SENSORS.filter((param) => {
    const value = body[param];
    const range = rangeValidation[param];
    return value < range.min || value > range.max;
  });

  if (outOfRangeParams.length > 0) {
    return res.status(400).json({
      error: 'Sensor values out of acceptable range',
      outOfRange: outOfRangeParams.map((param) => ({
        parameter: param,
        value: body[param],
        range: rangeValidation[param],
      })),
    });
  }

  // Generate prediction
  const prediction = predictRUL(body);

  logger.info(
    `RUL prediction generated: RUL=${prediction.rul}, Status=${prediction.status}`
  );

  res.json(prediction);
});

export default router;