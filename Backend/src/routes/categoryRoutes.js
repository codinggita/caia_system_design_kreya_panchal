import express from 'express';
import {
  getCategories,
  getCategoryByName,
  getCategoryConcepts,
  getSubcategories,
  getTags,
  getConceptsByTag,
  getPatterns,
  getPatternByName,
} from '../controllers/categoryController.js';

const router = express.Router();

// ─── Category Routes ───────────────────────────────────────────────────────────
// GET /api/v1/categories
router.get('/', getCategories);

// GET /api/v1/categories/:category
router.get('/:category', getCategoryByName);

// GET /api/v1/categories/:category/concepts
router.get('/:category/concepts', getCategoryConcepts);

export default router;

// ─── Exported sub-routers (mounted separately in app.js) ──────────────────────
export const subcategoryRouter = (() => {
  const r = express.Router();
  // GET /api/v1/subcategories
  r.get('/', getSubcategories);
  return r;
})();

export const tagRouter = (() => {
  const r = express.Router();
  // GET /api/v1/tags
  r.get('/', getTags);
  // GET /api/v1/tags/:tag
  r.get('/:tag', getConceptsByTag);
  return r;
})();

export const patternRouter = (() => {
  const r = express.Router();
  // GET /api/v1/patterns
  r.get('/', getPatterns);
  // GET /api/v1/patterns/:patternName
  r.get('/:patternName', getPatternByName);
  return r;
})();
