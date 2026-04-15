import BaseRepository from "./base.repository.js";

/**
 * Repository for user-related database operations
 * @extends BaseRepository
 */
class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  /**
   * Creates a new user linked to an account
   * @param {number} accountId - Account ID
   * @param {string} name - User's username (maps to DB 'username' column)
   * @param {string} [bio] - Optional bio
   * @param {number} [reputation=0] - Optional reputation score (default 0)
   * @returns {Promise<number>} Inserted user ID
   */
  async createUser(
    accountId,
    name,
    bio = null,
    reputation = 0,
    connection = null,
  ) {
    if (!connection && !this.pool) {
      throw new Error("Database pool not initialized in UserRepository");
    }
    const queryFn = connection
      ? connection.query.bind(connection)
      : this.pool
        ? this.pool.query.bind(this.pool)
        : null;
    if (!queryFn) throw new Error("No valid query function available");
    const [result] = await queryFn(
      `
      INSERT INTO users (account_id, username, bio, reputation)
      VALUES (?, ?, ?, ?)
      `,
      [accountId, name, bio, reputation],
    );
    return result.insertId;
  }

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
        user_id,
        username,
        avatar,
        bio,
        reputation,
        created_at
      FROM users
      ORDER BY created_at DESC
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
        u.reputation,
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
   * @param {Object} data - Fields to update {name/username, avatar, bio, reputation}
   * @returns {Promise<boolean>} True if update was successful
   */
  async updateUserInfo(userId, { username, avatar, bio, reputation }) {
    const fields = [];
    const values = [];

    if (username !== undefined) {
      fields.push("username = ?");
      values.push(name);
    }

    if (avatar !== undefined) {
      fields.push("avatar = ?");
      values.push(avatar);
    }

    if (bio !== undefined) {
      fields.push("bio = ?");
      values.push(bio);
    }

    if (reputation !== undefined) {
      fields.push("reputation = ?");
      values.push(reputation);
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
   * Deletes a user and their linked account from the database
   * Cascades automatically via FK
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
