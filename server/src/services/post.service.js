import PostRepository from "../repositories/post.repository.js";

/**
 * Service for handling post-related business logic and CRUD operations.
 */
class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  /**
   * Retrieves paginated list of posts with author info.
   * @param {number} limit - Posts per page (default 10)
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{total: number, posts: Array}>} Paginated posts
   */
  async getPosts(limit, offset) {
    const { total, rows } = await this.postRepository.getPosts(limit, offset);
    return { total, posts: rows };
  }

  /**
   * Retrieves trending posts sorted by views (optional tag filter).
   * @param {string|null} tagName - Filter by tag name
   * @param {number} limit - Number of posts
   * @param {number} offset - Offset
   * @returns {Promise<{total: number, posts: Array}>}
   */
  async getTrendPosts(tagName, limit, offset) {
    const { total, rows } = await this.postRepository.getTrendPosts(
      tagName,
      limit,
      offset,
    );
    return { total, posts: rows };
  }

  /**
   * Toggles LIKE/DISLIKE reaction on post for user.
   * @param {number} postId - Post ID
   * @param {number} userId - User ID
   * @param {'LIKE' | 'DISLIKE'} [reactionType='LIKE'] - Reaction type
   * @returns {Promise<{reacted: boolean, type: string}>}
   */
  async toggleReaction(postId, userId, reactionType = "LIKE") {
    return await this.postRepository.toggleReaction(
      postId,
      userId,
      reactionType,
    );
  }

  /**
   * Increments view count for a post.
   * @param {number} postId - Post ID
   * @returns {Promise<void>}
   */
  async incrementViews(postId) {
    await this.postRepository.incrementViews(postId);
  }

  /**
   * Creates a new post.
   * @param {Object} data - Post data
   * @param {number} data.author_id - Author user ID
   * @param {string} data.title - Post title
   * @param {string} data.content - Post content
   * @param {'DRAFT' | 'PUBLISHED' | 'ARCHIVED'} [data.status='PUBLISHED'] - Post status
   * @param {boolean} [data.is_pinned=false] - Pinned post
   * @returns {Promise<Object>} Created post
   * @throws {Error} Missing required fields
   */
  async createPost(data) {
    const { author_id, title, content, status = "PUBLISHED" } = data;

    if (!author_id || !title || !content) {
      throw new Error("author_id, title and content are required");
    }

    return await this.postRepository.create({
      author_id,
      title,
      content,
      status,
      ...data,
    });
  }

  /**
   * Updates existing post (author only).
   * @param {number} postId - Post ID
   * @param {number} authorId - Author user ID (authorization check)
   * @param {Object} data - Fields to update (title, content, status, is_pinned)
   * @returns {Promise<boolean>} Success
   * @throws {Error} Forbidden if not author
   */
  async updatePost(postId, authorId, data) {
    const post = await this.postRepository.findById(postId);

    if (post.author_id !== authorId) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    return await this.postRepository.update(postId, data);
  }

  /**
   * Deletes post (author only).
   * @param {number} postId - Post ID
   * @param {number} authorId - Author user ID (authorization check)
   * @returns {Promise<boolean>} Success
   * @throws {Error} Forbidden if not author
   */
  async deletePost(postId, authorId) {
    const post = await this.postRepository.findById(postId);

    if (post.author_id !== authorId) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    return await this.postRepository.delete(postId);
  }
}

export default PostService;
