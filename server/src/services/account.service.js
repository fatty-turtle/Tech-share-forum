import AccountRepository from "../repositories/account.repository.js";
import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.utils.js";
import { sendVerificationEmail } from "../utils/mail.utils.js";
import crypto from "crypto";

/**
 * Service for handling authentication operations
 */
class AccountService {
  constructor() {
    this.accountRepository = new AccountRepository();
    this.userRepository = new UserRepository();
  }

  /**
   * Authenticates a user and returns a JWT token
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<{token: string, user: Object}>} Object containing JWT token and user data
   * @throws {Error} If credentials are invalid or account is not activated
   */
  async login(email, password) {
    const user = await this.accountRepository.getAccountByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    if (!user.is_active) {
      throw new Error("Account is not activated");
    }

    const token = createToken({
      user_id: user.user_id,
      role: user.role,
    });

    return {
      token,
    };
  }

  /**
   * Registers a new user and sends a verification email
   * @param {Object} userData - User registration data
   * @param {string} userData.username - User's username
   * @param {string} userData.email    - User's email
   * @param {string} userData.password - User's password
   * @returns {Promise<void>}
   * @throws {Error} If email already exists
   */
  async register({ username, email, password }) {
    const existingUser = await this.accountRepository.getAccountByEmail(email);
    console.log("1. email check passed");
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const accountId =
      await this.accountRepository.createAccountWithVerification(
        email,
        passwordHash,
        token,
        expires,
      );

    // console.log("2. account created:", accountId);

    await this.userRepository.createUser(accountId, username);

    // console.log("3. user created");

    // Note: Email verification will activate account and role assigned later
    await sendVerificationEmail(email, token);

    // console.log("4. email sent");
  }

  /**
   * Verifies a user's email using a verification token
   * @param {string} token - Verification token
   * @returns {Promise<void>}
   * @throws {Error} If token is invalid or expired
   */
  async verifyEmail(token) {
    const user =
      await this.accountRepository.getAccountByVerificationToken(token);

    if (!user) {
      throw new Error("Invalid verification token");
    }

    if (new Date(user.verification_expire) < new Date()) {
      throw new Error("Verification token expired");
    }

    await this.accountRepository.activateAccount(user.account_id);
  }
}

export default AccountService;
