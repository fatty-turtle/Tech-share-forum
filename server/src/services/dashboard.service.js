import AccountRepository from "../repositories/account.repository.js";
import UserRepository from "../repositories/user.repository.js";
import PostRepository from "../repositories/post.repository.js";
import TagRepository from "../repositories/tag.repository.js";
/**
 * Service for handling dasboard operations
 */
class DashBoardService {
  constructor() {
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();
    this.tagRepository = new TagRepository();
  }

  /**
   * Retrieves dashboard statistics such as total users, active users, and new registrations
   * @returns {Promise<Object>} Object containing dashboard statistics
   */
  async getDashboardStats() {
    const totalUsers = await this.userRepository.getTotal();
    const totalPosts = await this.postRepository.getTotal();
    const totalTags = await this.tagRepository.getTotal();
    const newUsersToday = await this.userRepository.countNewUsersToday();

    const recentPosts = await this.postRepository.getRecentPosts(5, 0);

    // Trim created_at and updated_at to date only (YYYY-MM-DD)
    recentPosts.rows = recentPosts.rows.map((post) => ({
      ...post,
      created_at: post.created_at
        ? new Date(post.created_at).toISOString().split("T")[0]
        : post.created_at,
      updated_at: post.updated_at
        ? new Date(post.updated_at).toISOString().split("T")[0]
        : post.updated_at,
    }));

    return { totalUsers, totalPosts, totalTags, newUsersToday, recentPosts };
  }
}

export default DashBoardService;
