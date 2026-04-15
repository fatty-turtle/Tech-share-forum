import UserRepository from "../repositories/user.repository.js";
import AccountRepository from "../repositories/account.repository.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * Service for handling user-related business logic
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AccountRepository();
  }

  /**
   * Retrieves a paginated list of users
   * @param {number} limit - Maximum number of users to return
   * @param {number} offset - Number of users to skip
   * @returns {Promise<{total: number, limit: number, offset: number, users: Array}>} Paginated user list
   */
  async getUserList(limit, offset) {
    const result = await this.userRepository.getUserList(limit, offset);
    return { total: result.total, users: result.rows };
  }

  /**
   * Retrieves detailed information for a specific user
   * @param {number} userId - User's ID
   * @returns {Promise<{user: Object}>} Object containing user information
   * @throws {Error} If user does not exist
   */
  async getUserInfo(userId) {
    const user = await this.userRepository.getUserInfo(userId);

    if (!user) {
      throw new Error("Non-exist user or fail to connect to server");
    }

    return { user };
  }

  /**
   * Creates a new user with hashed password and USER role
   * This creates both account and user records
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} password - User's password (will be hashed)
   * @returns {Promise<Object>} Created user object with assigned role
   * @throws {Error} If default USER role is not found
   */
  async createUser(name, email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate a temporary token (not for email verification, just for the createUserWithVerification method)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user with account (auto-verified for admin-created users)
    const accountId = await this.authRepository.createAccountWithVerification(
      email,
      passwordHash,
      token,
      expires,
    );
    const userId = await this.userRepository.createUser(accountId, name);

    // Auto-activate the account
    const user = await this.authRepository.getAccountByVerificationToken(token);
    if (user) {
      await this.authRepository.activateAccount(user.account_id);
    }

    // Assign EMPLOYEE role (matching the registration flow)
    const roleAssigned = await this.authRepository.assignRoleToUser(
      userId,
      "USER",
    );

    if (!roleAssigned) {
      throw new Error("Default role USER not found");
    }

    return {
      user_id: userId,
      name,
      email,
      is_active: true,
      roles: ["EMPLOYEE"],
    };
  }

  /**
   * @param {number} userId - User's ID
   * @returns {Promise<boolean>} True if role was assigned successfully, false otherwise
   */
  async createSeller(userId) {
    return await this.authRepository.assignRoleToUser(userId, "MOD");
  }

  /**
   * Updates user information
   * Note: Email cannot be updated here as it's stored in accounts table
   * @param {number} userId - User's ID
   * @param {Object} data - User data to update
   * @param {string} [data.name] - New name
   * @param {string} [data.avatar] - New avatar URL
   * @param {string} [data.phone_num] - New phone number
   * @param {string} [data.private_mail] - New private mail
   * @param {string} [data.address] - New address
   * @param {string} [data.marital_status] - New marital status
   * @returns {Promise<boolean>} True if update was successful, false otherwise
   */
  async updateUserInfo(userId, data) {
    return await this.userRepository.updateUserInfo(userId, data);
  }

  /**
   * Updates a user's password after verifying the old password
   * @param {number} userId - User's ID
   * @param {string} oldPassword - Current password for verification
   * @param {string} newPassword - New password to set (will be hashed)
   * @returns {Promise<boolean>} True if password was updated successfully, false otherwise
   * @throws {Error} If old password is incorrect
   */
  async updatePassword(userId, oldPassword, newPassword) {
    const currentPasswordHash =
      await this.authRepository.getPasswordHashByUserId(userId);

    if (!currentPasswordHash) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, currentPasswordHash);

    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    return await this.authRepository.updatePasswordByUserId(
      userId,
      newPasswordHash,
    );
  }

  /**
   * Deletes a user from the system
   * @param {number} userId - User's ID
   * @returns {Promise<boolean>} True if user was deleted successfully, false otherwise
   */
  async deleteUser(userId) {
    return await this.userRepository.deleteUser(userId);
  }

  /**
   * Removes SELLER role from a user
   * @param {number} userID - User's ID
   * @returns {Promise<boolean>} True if seller role was removed successfully, false otherwise
   */
  async deleteSeller(userID) {
    return await this.authRepository.assignRoleToUser(userID, "USER");
  }
}

export default UserService;
