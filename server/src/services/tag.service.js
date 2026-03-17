import TagRepository from "../repositories/tag.repository.js";

class TagService {
  constructor() {
    this.tagRepository = new TagRepository();
  }
  /**
   * Retrieves all tags with pagination
   * @param {number} limit - Maximum number of records to return
   * @param {number} offset - Number of records to skip
   * @returns {Promise<{total: number, tags: Array}>}
   */
  async getTags(limit, offset) {
    const result = await this.tagRepository.findAll(limit, offset);
    return { total: result.total, tags: result.rows };
  }

  /**
   * Retrieves trending tags by post_count
   * @param {number} limit - Maximum number of tags
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{total: number, tags: Array}>}
   */
  async getTrendTags(limit, offset) {
    const result = await this.tagRepository.getTrendTags(limit, offset);
    return { total: result.total, tags: result.rows };
  }
}

export default TagService;
