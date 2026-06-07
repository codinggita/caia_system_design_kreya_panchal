/**
 * Reusable MongoDB aggregation pipeline builders for the Category & Taxonomy module.
 */

/**
 * Builds a pipeline to extract all unique tags from non-archived Concepts.
 * Unwinds the tags array, groups by tag name, and counts occurrences.
 * Results are sorted by descending count (most-used tags first).
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getUniqueTagsPipeline = () => [
  {
    $match: { isArchived: { $ne: true } },
  },
  {
    $unwind: { path: '$tags', preserveNullAndEmptyArrays: false },
  },
  {
    $group: {
      _id: '$tags',
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1, _id: 1 },
  },
  {
    $project: {
      _id: 0,
      tag: '$_id',
      count: 1,
    },
  },
];

/**
 * Builds a pipeline to extract a flat list of all subcategories across all Categories.
 * Each result item carries the subcategory name and the parent category name.
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getAllSubcategoriesPipeline = () => [
  {
    $match: { subcategories: { $exists: true, $not: { $size: 0 } } },
  },
  {
    $unwind: '$subcategories',
  },
  {
    $group: {
      _id: '$subcategories',
      parentCategories: { $addToSet: '$name' },
      count: { $sum: 1 },
    },
  },
  {
    $sort: { _id: 1 },
  },
  {
    $project: {
      _id: 0,
      subcategory: '$_id',
      parentCategories: 1,
      count: 1,
    },
  },
];

/**
 * Builds a pipeline to extract all design patterns from all Category documents.
 * Each result carries the pattern details alongside the parent category name.
 *
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getAllPatternsPipeline = () => [
  {
    $match: { patterns: { $exists: true, $not: { $size: 0 } } },
  },
  {
    $unwind: '$patterns',
  },
  {
    $project: {
      _id: 0,
      category: '$name',
      patternId: '$patterns._id',
      name: '$patterns.name',
      description: '$patterns.description',
      useCases: '$patterns.useCases',
      keyFeatures: '$patterns.keyFeatures',
    },
  },
  {
    $sort: { category: 1, name: 1 },
  },
];

/**
 * Builds a pipeline to retrieve a single design pattern by name (case-insensitive).
 *
 * @param {string} patternName - The pattern name to search for
 * @returns {Array<object>} Aggregation pipeline stages
 */
export const getSinglePatternPipeline = (patternName) => [
  {
    $match: {
      'patterns.name': { $regex: new RegExp(`^${patternName}$`, 'i') },
    },
  },
  {
    $unwind: '$patterns',
  },
  {
    $match: {
      'patterns.name': { $regex: new RegExp(`^${patternName}$`, 'i') },
    },
  },
  {
    $project: {
      _id: 0,
      category: '$name',
      patternId: '$patterns._id',
      name: '$patterns.name',
      description: '$patterns.description',
      useCases: '$patterns.useCases',
      keyFeatures: '$patterns.keyFeatures',
    },
  },
  {
    $limit: 1,
  },
];

/**
 * Builds a pipeline to aggregate concepts for a given tag.
 * Returns concept list with projected fields for client consumption.
 *
 * @param {string} tag - The tag name to filter by
 * @returns {Array<object>} Aggregation pipeline stages for Concept collection
 */
export const getConceptsByTagPipeline = (tag) => [
  {
    $match: {
      isArchived: { $ne: true },
      tags: { $in: [tag] },
    },
  },
  {
    $project: {
      title: 1,
      description: 1,
      summary: 1,
      category: 1,
      tags: 1,
      views: 1,
      bookmarks: 1,
      createdAt: 1,
    },
  },
  {
    $sort: { views: -1 },
  },
];

export default {
  getUniqueTagsPipeline,
  getAllSubcategoriesPipeline,
  getAllPatternsPipeline,
  getSinglePatternPipeline,
  getConceptsByTagPipeline,
};
