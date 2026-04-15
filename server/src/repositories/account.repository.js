import BaseRepository from "./base.repository.js";

/**
 * Repository for accounts table - authentication, roles, verification.
 * @extends BaseRepository
 */
class AccountRepository extends BaseRepository {
  constructor() {
    super("accounts");
  }

  /**
   * Get account + linked user by email.
   * @param {string} email - Email address
   * @returns {Promise<Object|null>} Account + user data or null
   */
  async getAccountByEmail(email) {
    const [rows] = await this.pool.query(
      `
      SELECT
        a.account_id,
        a.email,
        a.password AS password_hash,
        a.role,
        a.is_active,
        u.user_id,
        u.username,
        u.avatar
      FROM accounts a
      LEFT JOIN users u ON a.account_id = u.account_id
      WHERE a.email = ?
      LIMIT 1
      `,
      [email],
    );

    return rows[0] || null;
  }

  /**
   * Create account with verification token (role defaults to USER).
   * @param {string} email
   * @param {string} passwordHash - BCrypt hash
   * @param {string} token - Verification token
   * @param {Date} expires - Token expiry
   * @param {object|null} connection - Transaction connection
   * @returns {Promise<number>} account_id
   */
  async createAccountWithVerification(
    email,
    passwordHash,
    token,
    expires,
    connection = null,
  ) {
    if (!connection && !this.pool) {
      throw new Error("Database pool not initialized in AccountRepository");
    }
    const queryFn = connection
      ? connection.query.bind(connection)
      : this.pool.query.bind(this.pool);
    const [result] = await queryFn(
      `
      INSERT INTO accounts
        (email, password, verification_token, verification_expire)
      VALUES (?, ?, ?, ?)
      `,
      [email, passwordHash, token, expires],
    );
    return result.insertId;
  }

  /**
   * Get account + linked user by verification token.
   * @param {string} token
   * @returns {Promise<Object|null>}
   */
  async getAccountByVerificationToken(token) {
    const [rows] = await this.pool.query(
      `
      SELECT a.account_id, a.verification_expire, u.user_id
      FROM accounts a
      LEFT JOIN users u ON a.account_id = u.account_id
      WHERE a.verification_token = ?
      LIMIT 1
      `,
      [token],
    );

    return rows[0] || null;
  }

  /**
   * Activate account (set is_active=true, clear token).
   * @param {number} accountId
   * @returns {Promise<boolean>} Success
   */
  async activateAccount(accountId) {
    const [result] = await this.pool.query(
      `
      UPDATE accounts
      SET
        is_active = true,
        verification_token = NULL,
        verification_expire = NULL
      WHERE account_id = ?
      `,
      [accountId],
    );

    return result.affectedRows > 0;
  }

  /**
   * Get password hash by user_id.
   * @param {number} userId
   * @returns {Promise<string|null>} password_hash
   */
  async getPasswordHashByUserId(userId) {
    const [rows] = await this.pool.query(
      `
      SELECT a.password AS password_hash
      FROM users u
      JOIN accounts a ON u.account_id = a.account_id
      WHERE u.user_id = ?
      LIMIT 1
      `,
      [userId],
    );

    return rows[0]?.password_hash || null;
  }

  /**
   * Update password by user_id.
   * @param {number} userId
   * @param {string} newPasswordHash
   * @returns {Promise<boolean>} Success
   */
  async updatePasswordByUserId(userId, newPasswordHash) {
    const [result] = await this.pool.query(
      `
      UPDATE accounts a
      JOIN users u ON a.account_id = u.account_id
      SET a.password = ?,
          a.updated_at = NOW()
      WHERE u.user_id = ?
      `,
      [newPasswordHash, userId],
    );

    return result.affectedRows > 0;
  }

  /**
   * Assign role to user (updates accounts.role).
   * @param {number} userId - Target user_id
   * @param {'USER' | 'MOD' | 'ADMIN'} role - New role
   * @returns {Promise<boolean>} Success
   */
  async assignRoleToUser(userId, role) {
    const [result] = await this.pool.query(
      `
      UPDATE accounts a
      JOIN users u ON a.account_id = u.account_id
      SET a.role = ?
      WHERE u.user_id = ?
      `,
      [role, userId],
    );

    return result.affectedRows > 0;
  }
}

export default AccountRepository;
