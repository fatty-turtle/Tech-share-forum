/**
 * Calculates pagination parameters from query string
 * @param {Object} query - Query parameters
 * @param {Object} options - Pagination options
 * @returns {Object} Pagination parameters
 */
export const getPagination = (query, options = {}) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    parseInt(query.limit, 10) || options.defaultLimit || 10,
    options.maxLimit || 100,
  );

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
};

/**
 * Generates pagination metadata
 * @param {Object} params - Pagination parameters
 * @returns {Object} Pagination metadata
 */
export const getPagingMeta = ({ page, limit, total }) => {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
};
