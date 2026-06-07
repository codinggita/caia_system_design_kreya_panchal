import express from 'express';
import { getHealth } from '../controllers/healthController.js';

const router = express.Router();

// Maps GET /api/v1/health (when mounted at /health in the main router)
router.get('/', getHealth);

export default router;
