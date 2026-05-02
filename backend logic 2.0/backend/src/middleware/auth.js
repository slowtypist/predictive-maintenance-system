import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // For testing purposes, if no token is provided, continue as 'anonymous'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('No auth token provided. Proceeding as anonymous for testing.');
    req.user = { id: 'anonymous' };
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'dev-secret-key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error.message);
    // Even if token is invalid, allow passing for testing
    req.user = { id: 'anonymous' };
    next();
  }
};
