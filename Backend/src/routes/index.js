import express from 'express';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

// Mount individual route handlers
// This mounts GET /health onto /api/v1/health
router.use('/health', healthRoutes);

export default router;
