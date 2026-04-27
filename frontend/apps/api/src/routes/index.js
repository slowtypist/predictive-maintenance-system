import { Router } from 'express';
import healthCheck from './health-check.js';
import predictRouter from './predict.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/predict', predictRouter);

    return router;
};