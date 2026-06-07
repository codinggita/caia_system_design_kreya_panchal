import app from './src/app.js';
import env from './src/config/env.js';
import connectDB from './src/config/db.js';

// Establish connection to MongoDB
connectDB();

// Start the Express HTTP server
const PORT = env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  CAIA Backend Server running in [${env.NODE_ENV}] mode`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`==================================================`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception thrown!');
  console.error(err.stack || err);
  console.log('Shutting down application server gracefully...');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('CRITICAL: Unhandled Promise Rejection at:', promise);
  console.error('Reason:', reason.stack || reason);
  console.log('Shutting down application server gracefully...');
  server.close(() => {
    process.exit(1);
  });
});

// Handle system termination signals (e.g. for Docker / Kubernetes pods)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Commencing graceful server shutdown...');
  server.close(() => {
    console.log('Express server closed. Exiting process.');
    process.exit(0);
  });
});
