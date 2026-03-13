import UserService from "../services/user.service.js";
import { getPagination, getPagingMeta } from "../utils/pagination.utils.js";

const userService = new UserService();

/**
 * Controller for handling user-related HTTP requests
 */
class UserController {
  /**
   * Retrieves a paginated list of users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with users list and pagination metadata
   */
  async getUserList(req, res) {
    try {
      const { page, limit, offset } = getPagination(req.query);

      const result = await userService.getUserList(limit, offset);

      const meta = getPagingMeta({ page, limit, total: result.total });

      return res.status(200).json({
        status_code: 200,
        message: "Users retrieved successfully",
        data: result.users,
        meta,
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to retrieve users",
      });
    }
  }

  /**
   * Retrieves information for the authenticated user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with user information
   */
  async getUserInfo(req, res) {
    try {
      const userId = req.user.user_id;

      const result = await userService.getUserInfo(userId);

      return res.status(200).json({
        status_code: 200,
        message: "User info retrieved successfully",
        user: result.user,
      });
    } catch (err) {
      return res.status(404).json({
        status_code: 404,
        message: err.message || "User not found",
      });
    }
  }

  /**
   * Creates a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with created user data
   */
  async createUser(req, res) {
    try {
      // Data already validated by DTO middleware
      const { name, email, password } = req.body;

      const user = await userService.createUser(name, email, password);

      return res.status(201).json({
        status_code: 201,
        message: "User created successfully",
        user,
      });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          status_code: 409,
          message: "Email already exists",
        });
      }

      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to create user",
      });
    }
  }

  /**
   * Upgrades the authenticated user to seller role
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with operation status
   */
  async createSeller(req, res) {
    try {
      const userId = req.user.user_id;

      const success = await userService.createSeller(userId);

      if (!success) {
        return res.status(400).json({
          status_code: 400,
          message: "Failed to update user to seller",
        });
      }

      return res.status(200).json({
        status_code: 200,
        message: "User updated to seller successfully",
      });
    } catch (err) {
      return res.status(400).json({
        status_code: 400,
        message: err.message || "Failed to update user to seller",
      });
    }
  }

  /**
   * Updates user information for the authenticated user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with operation status
   */
  async updateUserInfo(req, res) {
    try {
      const userId = req.user.user_id;
      const { name, avatar, phone_num, private_mail, address, marital_status } =
        req.body;

      const success = await userService.updateUserInfo(userId, {
        name,
        avatar,
        phone_num,
        private_mail,
        address,
        marital_status,
      });

      if (!success) {
        return res.status(400).json({
          status_code: 400,
          message: "No changes made or user not found",
        });
      }

      return res.status(200).json({
        status_code: 200,
        message: "User info updated successfully",
      });
    } catch (err) {
      return res.status(400).json({
        status_code: 400,
        message: err.message || "Failed to update user info",
      });
    }
  }

  /**
   * Updates password for the authenticated user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with operation status
   */
  async updatePassword(req, res) {
    try {
      const userId = req.user.user_id;
      const { oldPassword, newPassword } = req.body;

      const success = await userService.updatePassword(
        userId,
        oldPassword,
        newPassword,
      );

      if (!success) {
        return res.status(400).json({
          status_code: 400,
          message: "Failed to update password",
        });
      }

      return res.status(200).json({
        status_code: 200,
        message: "Password updated successfully",
      });
    } catch (err) {
      return res.status(400).json({
        status_code: 400,
        message: err.message || "Failed to update password",
      });
    }
  }

  /**
   * Deletes the authenticated user account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with operation status
   */
  async deleteUser(req, res) {
    try {
      const userId = req.user.user_id;

      const success = await userService.deleteUser(userId);

      if (!success) {
        return res.status(404).json({
          status_code: 404,
          message: "User not found or already deleted",
        });
      }

      return res.status(200).json({
        status_code: 200,
        message: "User deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to delete user",
      });
    }
  }
}

export default UserController;
