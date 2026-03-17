import PostRepository from "../repositories/post.repository.js";

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  /**
   * Retrieves paginated list of posts
   * @param {number} limit - Posts per page
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{total: number, page: number, limit: number, posts: Array}>}
   */
  async getPosts(limit, offset) {
    const { total, rows } = await this.postRepository.getPosts(limit, offset);
    return { total, posts: rows };
  }

  /**
   * Retrieves trending posts by view count (optional tagName)
   * @param {string|null} tagName - Optional tag filter
   * @param {number} limit - Posts per page
   * @param {number} offset - Offset for pagination
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
   * Toggles like on a post for a given user
   * @param {number} postId - Post ID
   * @param {number} userId - User ID
   * @returns {Promise<{liked: boolean}>}
   */
  async toggleLike(postId, userId) {
    return await this.postRepository.toggleLike(postId, userId);
  }

  /**
   * Increments view count of a post
   * @param {number} postId - Post ID
   * @returns {Promise<void>}
   */
  async incrementView(postId) {
    await this.postRepository.incrementView(postId);
  }

  /**
   * Creates a new post
   * @param {Object} data - Post data
   * @param {number} data.author_id
   * @param {string} data.type
   * @param {string} data.title
   * @param {string} data.content
   * @returns {Promise<Object>} Created post
   */
  async createPost(data) {
    const { author_id, type, title, content } = data;

    if (!author_id || !title || !content) {
      throw new Error("author_id, title and content are required");
    }

    return await this.postRepository.createPost({
      author_id,
      type,
      title,
      content,
    });
  }

  /**
   * Updates an existing post
   * @param {number} postId - Post ID
   * @param {number} authorId - Must match post's author_id
   * @param {Object} data - Fields to update
   * @returns {Promise<boolean>}
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
   * Deletes a post
   * @param {number} postId - Post ID
   * @param {number} authorId - Must match post's author_id
   * @returns {Promise<boolean>}
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
