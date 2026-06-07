import Category from '../models/Category.js';
import Concept from '../models/Concept.js';
import {
  getUniqueTagsPipeline,
  getAllSubcategoriesPipeline,
  getAllPatternsPipeline,
  getSinglePatternPipeline,
  getConceptsByTagPipeline,
} from '../utils/aggregationHelper.js';

/**
 * Retrieves all categories with their subcategory and pattern counts.
 *
 * @returns {Promise<Array<object>>}
 */
export const getCategories = async () => {
  return Category.find({}, {
    name: 1,
    description: 1,
    subcategories: 1,
    patternsCount: { $size: { $ifNull: ['$patterns', []] } },
    createdAt: 1,
  }).lean();
};

/**
 * Retrieves a single category by name (case-insensitive) with full details.
 *
 * @param {string} name - Category name from URL param
 * @returns {Promise<object|null>}
 */
export const getCategoryByName = async (name) => {
  return Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
  }).lean();
};

/**
 * Retrieves all non-archived concepts belonging to a specific category.
 *
 * @param {string} category - Category name to filter by
 * @param {number} limit - Max results (default 20)
 * @returns {Promise<Array<object>>}
 */
export const getCategoryConcepts = async (category, limit = 20) => {
  const maxLimit = Math.max(1, parseInt(limit, 10) || 20);
  return Concept.find(
    {
      category: { $regex: new RegExp(`^${category}$`, 'i') },
      isArchived: { $ne: true },
    },
    {
      title: 1,
      description: 1,
      summary: 1,
      category: 1,
      tags: 1,
      views: 1,
      bookmarks: 1,
      createdAt: 1,
    }
  )
    .sort({ views: -1 })
    .limit(maxLimit)
    .lean();
};

/**
 * Retrieves a flat list of all subcategories aggregated across all Category documents.
 * Each result includes its parent category associations.
 *
 * @returns {Promise<Array<object>>}
 */
export const getSubcategories = async () => {
  return Category.aggregate(getAllSubcategoriesPipeline());
};

/**
 * Retrieves a sorted, counted list of unique tags aggregated from non-archived Concepts.
 *
 * @returns {Promise<Array<object>>}
 */
export const getTags = async () => {
  return Concept.aggregate(getUniqueTagsPipeline());
};

/**
 * Retrieves all non-archived concepts that contain a specific tag.
 *
 * @param {string} tag - Tag to search for
 * @param {number} limit - Max results (default 20)
 * @returns {Promise<Array<object>>}
 */
export const getConceptsByTag = async (tag, limit = 20) => {
  const maxLimit = Math.max(1, parseInt(limit, 10) || 20);
  const pipeline = getConceptsByTagPipeline(tag);
  pipeline.push({ $limit: maxLimit });
  return Concept.aggregate(pipeline);
};

/**
 * Retrieves all design patterns across all Category documents.
 *
 * @returns {Promise<Array<object>>}
 */
export const getPatterns = async () => {
  return Category.aggregate(getAllPatternsPipeline());
};

/**
 * Retrieves a single design pattern by name (case-insensitive).
 *
 * @param {string} patternName - Pattern name from URL param
 * @returns {Promise<object|null>}
 */
export const getPatternByName = async (patternName) => {
  const results = await Category.aggregate(getSinglePatternPipeline(patternName));
  return results[0] || null;
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
