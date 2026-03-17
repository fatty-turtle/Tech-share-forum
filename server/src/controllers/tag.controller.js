import TagService from "../services/tag.service.js";
import { getPagination, getPagingMeta } from "../utils/pagination.utils.js";

const tagService = new TagService();

/**
 * Controller for handling post-related HTTP requests
 */
class TagController {
  /**
   * Retrieves paginated list of tags
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */

  async getTags(req, res, next) {
    try {
      const { page, limit, offset } = getPagination(req.query);
      const result = await tagService.getTags(limit, offset);
      const meta = getPagingMeta({ page, limit, total: result.total });

      return res.status(200).json({
        status_code: 200,
        message: "Tags retrieved successfully",
        ...meta,
        tags: result.tags,
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to retrieve tags",
      });
    }
  }
  /**
   * Retrieves paginated list of posts
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */

  async getTrendTags(req, res, next) {
    try {
      const { page, offset } = getPagination(req.query);
      const limit = 5;
      const result = await tagService.getTrendTags(limit, offset);
      const meta = getPagingMeta({ page, limit, total: result.total });

      return res.status(200).json({
        status_code: 200,
        message: "Trend tags retrieved successfully",
        ...meta,
        tags: result.tags,
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to retrieve tags",
      });
    }
  }
}

export default TagController;
