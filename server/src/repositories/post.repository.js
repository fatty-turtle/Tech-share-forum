import BaseRepository from "./base.repository.js";

class PostRepository extends BaseRepository {
  constructor() {
    super("posts");
  }

  async getPosts(limit, offset) {
    const [rows] = await this.pool.query(
      `
      SELECT 
        p.*,
        u.username AS author_name,
        u.avatar AS author_avatar
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

  async getTrendPosts(tagName, limit, offset) {
    let query = `
      SELECT 
        p.*,
        u.username AS author_name,
        u.avatar AS author_avatar
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
        ORDER BY p.views DESC
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
        ORDER BY p.views DESC
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
        u.avatar AS author_avatar
      FROM posts p
      JOIN users u ON u.user_id = p.author_id
      JOIN posts_tags pt ON pt.post_id = p.post_id
      JOIN tags t ON t.tag_id = pt.tag_id
      WHERE t.name = ?
      ORDER BY p.views DESC
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
      WHERE t.name = ?`,
      [tagName],
    );

    return { total, rows };
  }

  async toggleReaction(postId, userId, reactionType = "LIKE") {
    const [existing] = await this.pool.query(
      `SELECT reaction_type FROM post_reactions WHERE post_id = ? AND user_id = ?`,
      [postId, userId],
    );

    if (existing.length > 0) {
      if (existing[0].reaction_type === reactionType) {
        // Remove reaction
        await this.pool.query(
          `DELETE FROM post_reactions WHERE post_id = ? AND user_id = ?`,
          [postId, userId],
        );
        return { reacted: false };
      } else {
        // Toggle to new type
        await this.pool.query(
          `UPDATE post_reactions SET reaction_type = ? WHERE post_id = ? AND user_id = ?`,
          [reactionType, postId, userId],
        );
        return { reacted: true, type: reactionType };
      }
    } else {
      // Add reaction
      await this.pool.query(
        `INSERT INTO post_reactions (post_id, user_id, reaction_type)
         VALUES (?, ?, ?)`,
        [postId, userId, reactionType],
      );
      return { reacted: true, type: reactionType };
    }
  }

  async incrementViews(postId) {
    await this.pool.query(
      `UPDATE posts SET views = views + 1 WHERE post_id = ?`,
      [postId],
    );
  }

  // BaseRepository methods like create, update, findById, delete available
}

export default PostRepository;
