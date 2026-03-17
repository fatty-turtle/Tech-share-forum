import BaseRepository from "./base.repository.js";

/**
 * Repository for user-related database operations
 * @extends BaseRepository
 */
class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  // /**
  //  * Retrieves a paginated list of users
  //  * @param {number} limit - Maximum number of users to return
  //  * @param {number} offset - Number of users to skip
  /**
   * Retrieves a paginated list of users
   * @param {number} limit - Maximum number of users to return
   * @param {number} offset - Number of users to skip
   * @returns {Promise<{total: number, rows: Array}>}
   */
  async getUserList(limit, offset) {
    const [rows] = await this.pool.query(
      `
    SELECT
      u.user_id,
      u.username,
      u.avatar,
      u.bio,
      u.created_at
    FROM users u
    ORDER BY u.created_at DESC
    LIMIT ? OFFSET ?
    `,
      [limit, offset],
    );

    const [[{ total }]] = await this.pool.query(
      `SELECT COUNT(*) AS total FROM users`,
    );

    return { total, rows };
  }

  /**
   * Retrieves detailed information for a specific user including their email and role
   * @param {number} userId - User's ID
   * @returns {Promise<Object|null>} User object or null if not found
   */
  async getUserInfo(userId) {
    const [rows] = await this.pool.query(
      `
      SELECT
        u.user_id,
        u.username,
        u.avatar,
        u.bio,
        a.email,
        a.role,
        u.created_at
      FROM users u
      LEFT JOIN accounts a ON u.account_id = a.account_id
      WHERE u.user_id = ?
      LIMIT 1
      `,
      [userId],
    );

    return rows[0] || null;
  }

  /**
   * Updates user profile fields dynamically based on provided data
   * @param {number} userId - User's ID
   * @param {Object} data - Fields to update
   * @param {string} [data.username] - New username
   * @param {string} [data.avatar]   - New avatar URL
   * @param {string} [data.bio]      - New bio
   * @returns {Promise<boolean>} True if update was successful, false otherwise
   */
  async updateUserInfo(userId, { username, avatar, bio }) {
    const fields = [];
    const values = [];

    if (username !== undefined) {
      fields.push("username = ?");
      values.push(username);
    }

    if (avatar !== undefined) {
      fields.push("avatar = ?");
      values.push(avatar);
    }

    if (bio !== undefined) {
      fields.push("bio = ?");
      values.push(bio);
    }

    if (fields.length === 0) return false;

    values.push(userId);

    const [result] = await this.pool.query(
      `
      UPDATE users
      SET ${fields.join(", ")},
          updated_at = NOW()
      WHERE user_id = ?
      `,
      values,
    );

    return result.affectedRows > 0;
  }

  /**
   * Updates the role of a user's linked account
   * @param {number} userId - User's ID
   * @param {string} role   - New role ('USER' | 'ADMIN')
   * @returns {Promise<boolean>} True if update was successful
   */
  async updateUserRole(userId, role) {
    const [result] = await this.pool.query(
      `
      UPDATE accounts a
      JOIN users u ON a.account_id = u.account_id
      SET a.role       = ?,
          a.updated_at = NOW()
      WHERE u.user_id = ?
      `,
      [role, userId],
    );

    return result.affectedRows > 0;
  }

  /**
   * Deletes a user and their linked account from the database
   * Cascades automatically via FK: deleting the account removes the user row
   * @param {number} userId - User's ID
   * @returns {Promise<boolean>} True if deletion was successful
   */
  async deleteUser(userId) {
    const [result] = await this.pool.query(
      `
      DELETE a
      FROM accounts a
      JOIN users u ON a.account_id = u.account_id
      WHERE u.user_id = ?
      `,
      [userId],
    );

    return result.affectedRows > 0;
  }
}

export default UserRepository;
