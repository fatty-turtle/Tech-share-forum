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
   * Retrieves posts sorted by view count descending
   * @param {number} limit - Maximum number of posts to return
   * @param {number} offset - Number of posts to skip
   * @returns {Promise<{total: number, rows: Array}>}
   */
  async getTrendPosts(limit, offset) {
    const [rows] = await this.pool.query(
      `
    SELECT 
      p.*,
      u.username AS author_name,
      u.avatar   AS author_avatar
    FROM posts p
    JOIN users u ON u.user_id = p.author_id
    ORDER BY p.view_count DESC
    LIMIT ? OFFSET ?
    `,
      [limit, offset],
    );

    const [[{ total }]] = await this.pool.query(
      `SELECT COUNT(*) AS total FROM posts`,
    );

    return { total, rows };
  }

  // /**
  //  * Toggles like on a post for a given user
  //  * @param {number} postId - Post ID
  //  * @param {number} userId - User ID
  //  * @returns {Promise<{liked: boolean}>}
  //  */
  // async toggleLike(postId, userId) {
  //   const [existing] = await this.pool.query(
  //     `SELECT 1 FROM post_likes WHERE post_id = ? AND user_id = ?`,
  //     [postId, userId],
  //   );

  //   if (existing.length) {
  //     await this.pool.query(
  //       `DELETE FROM post_likes WHERE post_id = ? AND user_id = ?`,
  //       [postId, userId],
  //     );
  //     await this.pool.query(
  //       `UPDATE posts SET like_count = like_count - 1 WHERE post_id = ?`,
  //       [postId],
  //     );
  //     return { liked: false };
  //   }

  //   await this.pool.query(
  //     `INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)`,
  //     [postId, userId],
  //   );
  //   await this.pool.query(
  //     `UPDATE posts SET like_count = like_count + 1 WHERE post_id = ?`,
  //     [postId],
  //   );
  //   return { liked: true };
  // }
  /**
   * Increments the view count of a post by 1
   * @param {number} postId - Post ID
   * @returns {Promise<void>}
   */
  async incrementView(postId) {
    await this.pool.query(
      `UPDATE posts SET view_count = view_count + 1 WHERE post_id = ?`,
      [postId],
    );
  }
}

export default PostRepository;
