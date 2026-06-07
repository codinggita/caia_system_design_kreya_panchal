import mongoose from 'mongoose';
import conceptService from '../services/conceptService.js';
import apiResponse from '../utils/apiResponse.js';

/**
 * Express controller handlers for CAIA System Design Concepts.
 */

// GET /api/v1/concepts/random
export const getRandomConcept = async (req, res, next) => {
  try {
    const concept = await conceptService.getRandomConcept();
    if (!concept) {
      return apiResponse.sendError(res, 'No concepts found in database', 404);
    }
    return apiResponse.sendSuccess(res, 'Random concept retrieved successfully', concept);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/concepts/latest
export const getLatestConcepts = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const concepts = await conceptService.getLatestConcepts(limit);
    return apiResponse.sendSuccess(res, 'Latest concepts retrieved successfully', concepts);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/concepts/popular
export const getPopularConcepts = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const concepts = await conceptService.getPopularConcepts(limit);
    return apiResponse.sendSuccess(res, 'Popular concepts retrieved successfully', concepts);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/concepts/trending
export const getTrendingConcepts = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const concepts = await conceptService.getTrendingConcepts(limit);
    return apiResponse.sendSuccess(res, 'Trending concepts retrieved successfully', concepts);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/concepts/:id/summary
export const getConceptSummary = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse.sendError(res, 'Invalid concept ID format', 400);
    }

    const summary = await conceptService.getConceptSummary(id);
    if (!summary) {
      return apiResponse.sendError(res, 'Concept not found or is archived', 404);
    }

    return apiResponse.sendSuccess(res, 'Concept summary retrieved successfully', summary);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/concepts/:id/history
export const getConceptHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse.sendError(res, 'Invalid concept ID format', 400);
    }

    const history = await conceptService.getConceptHistory(id);
    if (!history) {
      return apiResponse.sendError(res, 'Concept not found', 404);
    }

    return apiResponse.sendSuccess(res, 'Concept history retrieved successfully', history);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/concepts/:id/archive
export const archiveConcept = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse.sendError(res, 'Invalid concept ID format', 400);
    }

    const archivedConcept = await conceptService.archiveConcept(id);
    if (!archivedConcept) {
      return apiResponse.sendError(res, 'Concept not found or already archived', 404);
    }

    return apiResponse.sendSuccess(res, 'Concept archived successfully (soft deleted)', archivedConcept);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/concepts/:id/restore
export const restoreConcept = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse.sendError(res, 'Invalid concept ID format', 400);
    }

    const restoredConcept = await conceptService.restoreConcept(id);
    if (!restoredConcept) {
      return apiResponse.sendError(res, 'Concept not found or is not archived', 404);
    }

    return apiResponse.sendSuccess(res, 'Concept restored successfully', restoredConcept);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/concepts/:id/related
export const getRelatedConcepts = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse.sendError(res, 'Invalid concept ID format', 400);
    }

    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;
    const related = await conceptService.getRelatedConcepts(id, limit);
    if (related === null) {
      return apiResponse.sendError(res, 'Target concept not found', 404);
    }

    return apiResponse.sendSuccess(res, 'Related concepts retrieved successfully', related);
  } catch (error) {
    next(error);
  }
};

export default {
  getRandomConcept,
  getLatestConcepts,
  getPopularConcepts,
  getTrendingConcepts,
  getConceptSummary,
  getConceptHistory,
  archiveConcept,
  restoreConcept,
  getRelatedConcepts,
};
