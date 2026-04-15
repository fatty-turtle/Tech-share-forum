import BaseRepository from "./base.repository.js";

/**
 * Repository for tag-related database operations
 * @extends BaseRepository
 */
class TagRepository extends BaseRepository {
  constructor() {
    super("tags");
  }

  /**
   * Retrieves trending tags by usage_count (number of posts tagged)
   * @param {number} limit - Maximum number of tags
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{total: number, rows: Array}>}
   */
  async getTrendTags(limit, offset) {
    const [rows] = await this.pool.query(
      "SELECT * FROM tags ORDER BY usage_count DESC LIMIT ? OFFSET ?",
      [limit, offset],
    );
    const [[{ total }]] = await this.pool.query(
      "SELECT COUNT(*) AS total FROM tags",
    );
    return { total, rows };
  }
}

export default TagRepository;
