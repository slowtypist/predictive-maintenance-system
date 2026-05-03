import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { z } from 'zod';
import logger from '../utils/logger.js';
import { History } from '../models/History.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const sensorSchema = z.object({
  temperature: z.number(),
  pressure: z.number(),
  vibration: z.number(),
  rpm: z.number(),
  fuelFlow: z.number(),
  oilTemperature: z.number(),
  bearingTemperature: z.number(),
  compressorInletTemp: z.number(),
  turbineOutletTemp: z.number(),
  compressorOutletTemp: z.number(),
  turbineInletTemp: z.number(),
  bleedAirTemp: z.number(),
  bypassRatio: z.number(),
  throttlePosition: z.number(),
  altitude: z.number(),
  machNumber: z.number(),
  ambientTemp: z.number(),
  humidity: z.number(),
  fuelPressure: z.number(),
  lubricationPressure: z.number(),
  vibrationX: z.number(),
  vibrationY: z.number(),
  vibrationZ: z.number(),
});

// Protect the endpoint with authentication
router.post('/', authMiddleware, async (req, res) => {
  try {
    // 1. Zod Validation
    const validatedData = sensorSchema.parse(req.body);
    
    // 2. Spawn Python process
    const predictScriptPath = path.resolve(process.cwd(), '../ml-model/predict_engine.py');
    const pythonProcess = spawn('python', [predictScriptPath]);
    
    let resultData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    // 3. Send JSON via stdin
    pythonProcess.stdin.write(JSON.stringify(validatedData));
    pythonProcess.stdin.end();

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        logger.error(`Python script exited with code ${code}. Error: ${errorData}`);
        return res.status(500).json({ error: 'Failed to process ML prediction.' });
      }

      try {
        // 4. Capture JSON from stdout
        const prediction = JSON.parse(resultData);
        logger.info(`RUL prediction generated successfully`);
        
        // 5. Data Persistence in MongoDB
        try {
          let user_id = req.user?.id;
          if (user_id === 'anonymous') user_id = null;
          
          await History.create({
            sensor_data: validatedData,
            prediction_result: prediction,
            user_id: user_id
          });
        } catch (dbError) {
          logger.error('Failed to log prediction to MongoDB:', dbError.message);
        }

        // Return to frontend
        res.json(prediction);
      } catch (parseError) {
        logger.error('Failed to parse Python output:', parseError);
        res.status(500).json({ error: 'Invalid prediction output format.', output: resultData });
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    logger.error('Prediction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;