import express from 'express';
import {
  getRandomConcept,
  getLatestConcepts,
  getPopularConcepts,
  getTrendingConcepts,
  getConceptSummary,
  getConceptHistory,
  archiveConcept,
  restoreConcept,
  getRelatedConcepts,
} from '../controllers/conceptController.js';

const router = express.Router();

// Fetch random concept
router.get('/random', getRandomConcept);

// Fetch concepts lists by specific criteria
router.get('/latest', getLatestConcepts);
router.get('/trending', getTrendingConcepts);
router.get('/popular', getPopularConcepts);

// Fetch item-specific details & metadata
router.get('/:id/summary', getConceptSummary);
router.get('/:id/history', getConceptHistory);
router.get('/:id/related', getRelatedConcepts);

// Soft delete lifecycle management
router.patch('/:id/archive', archiveConcept);
router.patch('/:id/restore', restoreConcept);

export default router;
