import BaseRepository from "./base.repository.js";

/**
 * Repository for authentication-related database operations
 * @extends BaseRepository
 */

class PostRepository extends BaseRepository {
  constructor() {
    super("posts");
  }

  /**
   * Retrieves all posts with author info and pagination
   * @param {number} limit - Maximum number of posts to return
   * @param {number} offset - Number of posts to skip
   * @returns {Promise<{total: number, rows: Array}>}
   */
  async getPosts(limit, offset) {
    const [rows] = await this.pool.query(
      `
    SELECT 
      p.*,
      u.username AS author_name,
      u.avatar   AS author_avatar
    FROM posts p
    JOIN users u ON u.user_id = p.author_id
    LIMIT ? OFFSET ?
    `,
      [limit, offset],
    );

    const [[{ total }]] = await this.pool.query(
      `SELECT COUNT(*) AS total FROM posts`,
    );

    return { total, rows };
  }

  /**
   * Retrieves trending posts by view count descending (optional tag filter)
   * @param {string|null} tagName - Optional tag name to filter
   * @param {number} limit
   * @param {number} offset
   * @returns {Promise<{total: number, rows: Array}>}
   */
  async getTrendPosts(tagName, limit, offset) {
    let query = `
      SELECT 
        p.*,
        u.username AS author_name,
        u.avatar   AS author_avatar
    `;
    let countQuery;
    let params;
    const joins = `JOIN users u ON u.user_id = p.author_id`;

    if (tagName) {
      query += `
        FROM posts p
        ${joins}
        JOIN posts_tags pt ON pt.post_id = p.post_id
        JOIN tags t ON t.tag_id = pt.tag_id
        WHERE t.name = ?
        ORDER BY p.view_count DESC
        LIMIT ? OFFSET ?`;
      params = [tagName, limit, offset];

      countQuery = `
        SELECT COUNT(DISTINCT p.post_id) AS total
        FROM posts p
        JOIN posts_tags pt ON pt.post_id = p.post_id
        JOIN tags t ON t.tag_id = pt.tag_id
        WHERE t.name = ?`;
    } else {
      query += `
        FROM posts p
        ${joins}
        ORDER BY p.view_count DESC
        LIMIT ? OFFSET ?`;
      params = [limit, offset];

      countQuery = `SELECT COUNT(*) AS total FROM posts`;
    }

    const [rows] = await this.pool.query(query, params);

    const [[{ total }]] = await this.pool.query(
      countQuery,
      tagName ? [tagName] : [],
    );

    return { total, rows };
  }

  async getTrendPostsByTag(tagName, limit, offset) {
    const [rows] = await this.pool.query(
      `
      SELECT 
        p.*,
        u.username AS author_name,
        u.avatar   AS author_avatar
      FROM posts p
      JOIN users u ON u.user_id = p.author_id
      JOIN posts_tags pt ON pt.post_id = p.post_id
      JOIN tags t ON t.tag_id = pt.tag_id
      WHERE t.name = ?
      ORDER BY p.view_count DESC
      LIMIT ? OFFSET ?
      `,
      [tagName, limit, offset],
    );

    const [[{ total }]] = await this.pool.query(
      `
      SELECT COUNT(DISTINCT p.post_id) AS total
      FROM posts p
      JOIN posts_tags pt ON pt.post_id = p.post_id
      JOIN tags t ON t.tag_id = pt.tag_id
      WHERE t.name = ?
      `,
      [tagName],
    );

    return { total, rows };
  }
}

export default PostRepository;
