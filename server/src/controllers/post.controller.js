import PostService from "../services/post.service.js";
import { getPagination, getPagingMeta } from "../utils/pagination.utils.js";

const postService = new PostService();

/**
 * Controller for handling post-related HTTP requests
 */
class PostController {
  /**
   * Retrieves a paginated list of posts
   * @param {Object} req - Express request object

   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with users list and pagination metadata
   */
  async getPosts(req, res) {
    try {
      const { page, limit, offset } = getPagination(req.query);
      const result = await postService.getPosts(limit, offset);

      const meta = getPagingMeta({ page, limit, total: result.total });

      return res.status(200).json({
        status_code: 200,
        message: "Posts retrieved successfully",
        ...meta,
        posts: result.posts,
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to retrieve posts",
      });
    }
  }

  /**
   * Retrieves trending posts by view count
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getTrendPosts(req, res) {
    try {
      const { page, offset } = getPagination(req.query);
      const limit = 4;
      const result = await postService.getTrendPosts(limit, offset);

      const meta = getPagingMeta({ page, limit, total: result.total });

      return res.status(200).json({
        status_code: 200,
        message: "Trend posts retrieved successfully",
        ...meta,
        posts: result.posts,
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to retrieve posts",
      });
    }
  }

  // /**
  //  * Retrieves a single post by ID and increments its view count
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  * @param {Function} next - Express next middleware function
  //  */
  // async getPostById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     await postService.incrementView(id);
  //     const post = await postService.getPostById(id);

  //     return res.status(200).json({
  //       status_code: 200,
  //       message: "Post retrieved successfully",
  //       post,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // /**
  //  * Creates a new post
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  * @param {Function} next - Express next middleware function
  //  */
  // async createPost(req, res, next) {
  //   try {
  //     const { type, title, content } = req.body;
  //     const author_id = req.user.user_id;

  //     const post = await postService.createPost({
  //       author_id,
  //       type,
  //       title,
  //       content,
  //     });

  //     return res.status(201).json({
  //       status_code: 201,
  //       message: "Post created successfully",
  //       post,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // /**
  //  * Updates an existing post
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  * @param {Function} next - Express next middleware function
  //  */
  // async updatePost(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const author_id = req.user.user_id;

  //     const updated = await postService.updatePost(
  //       Number(id),
  //       author_id,
  //       req.body,
  //     );

  //     return res.status(200).json({
  //       status_code: 200,
  //       message: "Post updated successfully",
  //       updated,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // /**
  //  * Deletes a post
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  * @param {Function} next - Express next middleware function
  //  */
  // async deletePost(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const author_id = req.user.user_id;

  //     await postService.deletePost(id, author_id);

  //     return res.status(200).json({
  //       status_code: 200,
  //       message: "Post deleted successfully",
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // /**
  //  * Toggles like on a post for the authenticated user
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  * @param {Function} next - Express next middleware function
  //  */
  // async toggleLike(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const user_id = req.user.user_id;

  //     const result = await postService.toggleLike(id, user_id);

  //     return res.status(200).json({
  //       status_code: 200,
  //       message: result.liked ? "Post liked" : "Post unliked",
  //       ...result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

export default PostController;
