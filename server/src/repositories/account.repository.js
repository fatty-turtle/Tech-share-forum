import BaseRepository from "./base.repository.js";

/**
 * Repository for authentication-related database operations
 * @extends BaseRepository
 */
class AccountRepository extends BaseRepository {
  constructor() {
    super("accounts");
  }

  /**
   * Retrieves an account and linked user profile by email
   * @param {string} email - User's email address
   * @returns {Promise<Object|null>} User object or null if not found
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
   * Creates a new account with a verification token, then links a user profile
   * @param {string} username - User's username
   * @param {string} email - User's email
   * @param {string} passwordHash - Hashed password
   * @param {string} token - Verification token
   * @param {Date} expires - Token expiration date
   * @returns {Promise<number>} Inserted user ID
   */
  async createAccountWithVerification(
    username,
    email,
    passwordHash,
    token,
    expires,
  ) {
    const connection = await this.pool.getConnection();

    try {
      await connection.beginTransaction();

      const [accountResult] = await connection.query(
        `
        INSERT INTO accounts
          (email, password, verification_token, verification_expire)
        VALUES (?, ?, ?, ?)
        `,
        [email, passwordHash, token, expires],
      );

      const accountId = accountResult.insertId;

      const [userResult] = await connection.query(
        `
        INSERT INTO users
          (account_id, username)
        VALUES (?, ?)
        `,
        [accountId, username],
      );

      await connection.commit();
      return userResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Retrieves an account by verification token
   * @param {string} token - Verification token
   * @returns {Promise<Object|null>} Account with linked user or null if not found
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
   * Activates a user account and clears the verification token
   * @param {number} accountId - Account's ID
   * @returns {Promise<boolean>} True if activation was successful
   */
  async activateAccount(accountId) {
    const [result] = await this.pool.query(
      `
      UPDATE accounts
      SET
        is_active          = true,
        verification_token  = NULL,
        verification_expire = NULL
      WHERE account_id = ?
      `,
      [accountId],
    );

    return result.affectedRows > 0;
  }

  /**
   * Retrieves the password hash for a user
   * @param {number} userId - User's ID
   * @returns {Promise<string|null>} Password hash or null if not found
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
   * Updates the password for a user's account
   * @param {number} userId - User's ID
   * @param {string} newPasswordHash - New hashed password
   * @returns {Promise<boolean>} True if password was updated successfully
   */
  async updatePasswordByUserId(userId, newPasswordHash) {
    const [result] = await this.pool.query(
      `
      UPDATE accounts a
      JOIN users u ON a.account_id = u.account_id
      SET a.password   = ?,
          a.updated_at = NOW()
      WHERE u.user_id = ?
      `,
      [newPasswordHash, userId],
    );

    return result.affectedRows > 0;
  }
}

export default AccountRepository;
