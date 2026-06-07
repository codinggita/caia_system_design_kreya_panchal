import mongoose from 'mongoose';

/**
 * Controller to handle API health check request.
 * Returns information about API runtime and MongoDB database connection status.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
export const getHealth = (req, res, next) => {
  const dbState = mongoose.connection.readyState;
  
  // Mapping Mongoose connection states
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  
  const databaseStatus = dbStatusMap[dbState] || 'unknown';
  const isDbHealthy = dbState === 1;

  const healthData = {
    status: isDbHealthy ? 'UP' : 'DOWN',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: {
      status: databaseStatus,
      readyState: dbState,
    },
    system: {
      memoryUsage: {
        rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      },
      nodeVersion: process.version,
      platform: process.platform,
    },
  };

  // If DB is not connected, return 503 Service Unavailable, otherwise 200 OK
  return res.status(isDbHealthy ? 200 : 503).json(healthData);
};

export default {
  getHealth,
};
