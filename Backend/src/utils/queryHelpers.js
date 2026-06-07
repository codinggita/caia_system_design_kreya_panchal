/**
 * Merges a soft-delete exclusion filter (isArchived != true) into an existing query.
 *
 * @param {object} query - Existing mongoose query filter object
 * @returns {object} - Updated query filter object
 */
export const excludeArchived = (query = {}) => {
  return {
    ...query,
    isArchived: { $ne: true },
  };
};

/**
 * Builds a query to retrieve related concepts sharing the same category or overlapping tags,
 * excluding the target concept and any archived ones.
 *
 * @param {object} concept - The Mongoose concept document to compare against
 * @returns {object} - Mongoose query filter object for finding related concepts
 */
export const buildRelatedQuery = (concept) => {
  if (!concept) {
    return excludeArchived();
  }

  const tagList = Array.isArray(concept.tags) ? concept.tags : [];

  // Match same category OR containing any tags from the target concept, excluding itself
  const conditions = [
    { category: concept.category },
  ];

  if (tagList.length > 0) {
    conditions.push({ tags: { $in: tagList } });
  }

  return excludeArchived({
    _id: { $ne: concept._id },
    $or: conditions,
  });
};

/**
 * Builds a MongoDB aggregation pipeline to calculate a trending score:
 * trendingScore = views + (bookmarks * 3).
 * Drops archived records and limits the result.
 *
 * @param {number} limit - Maximum concepts to return
 * @returns {Array<object>} - Aggregation pipeline stages
 */
export const getTrendingPipeline = (limit = 10) => {
  return [
    {
      $match: {
        isArchived: { $ne: true },
      },
    },
    {
      $addFields: {
        trendingScore: {
          $add: [
            { $ifNull: ['$views', 0] },
            { $multiply: [{ $ifNull: ['$bookmarks', 0] }, 3] },
          ],
        },
      },
    },
    {
      $sort: {
        trendingScore: -1,
        createdAt: -1,
      },
    },
    {
      $limit: limit,
    },
  ];
};

export default {
  excludeArchived,
  buildRelatedQuery,
  getTrendingPipeline,
};
