import categoryService from '../services/categoryService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// GET /api/v1/categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    return sendSuccess(res, 'Categories retrieved successfully', categories);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/categories/:category
export const getCategoryByName = async (req, res, next) => {
  try {
    const { category } = req.params;
    const data = await categoryService.getCategoryByName(category);
    if (!data) {
      return sendError(res, `Category "${category}" not found`, 404);
    }
    return sendSuccess(res, 'Category retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/categories/:category/concepts
export const getCategoryConcepts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
    const concepts = await categoryService.getCategoryConcepts(category, limit);
    return sendSuccess(
      res,
      `Concepts in category "${category}" retrieved successfully`,
      concepts
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/subcategories
export const getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await categoryService.getSubcategories();
    return sendSuccess(res, 'Subcategories retrieved successfully', subcategories);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/tags
export const getTags = async (req, res, next) => {
  try {
    const tags = await categoryService.getTags();
    return sendSuccess(res, 'Tags retrieved successfully', tags);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/tags/:tag
export const getConceptsByTag = async (req, res, next) => {
  try {
    const { tag } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
    const concepts = await categoryService.getConceptsByTag(tag, limit);
    return sendSuccess(
      res,
      `Concepts tagged with "${tag}" retrieved successfully`,
      concepts
    );
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/patterns
export const getPatterns = async (req, res, next) => {
  try {
    const patterns = await categoryService.getPatterns();
    return sendSuccess(res, 'Design patterns retrieved successfully', patterns);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/patterns/:patternName
export const getPatternByName = async (req, res, next) => {
  try {
    const { patternName } = req.params;
    const pattern = await categoryService.getPatternByName(patternName);
    if (!pattern) {
      return sendError(res, `Pattern "${patternName}" not found`, 404);
    }
    return sendSuccess(res, 'Pattern retrieved successfully', pattern);
  } catch (error) {
    next(error);
  }
};

export default {
  getCategories,
  getCategoryByName,
  getCategoryConcepts,
  getSubcategories,
  getTags,
  getConceptsByTag,
  getPatterns,
  getPatternByName,
};
