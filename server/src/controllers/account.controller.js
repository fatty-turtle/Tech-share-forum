import AccountService from "../services/account.service.js";

const accService = new AccountService();

/**
 * Controller for handling authentication-related HTTP requests
 */
class AccountController {
  /**
   * Handles user login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with token and user data
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await accService.login(email, password);

      return res.status(200).json({
        status_code: 200,
        message: "Login successful",
        user: result.user,
        token: result.token,
      });
    } catch (err) {
      return res.status(401).json({
        status_code: 401,
        message: err.message || "Invalid credentials",
      });
    }
  }

  /**
   * Handles user registration
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with registration confirmation
   */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      await accService.register({ username, email, password });

      return res.status(201).json({
        status_code: 201,
        message: "Registration successful. Please verify your email.",
      });
    } catch (err) {
      return res.status(400).json({
        status_code: 400,
        message: err.message,
      });
    }
  }

  /**
   * Handles email verification
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @returns {Promise<Object>} JSON response with verification status
   */
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params || req.query;

      if (!token) {
        return res.status(400).json({
          status_code: 400,
          message: "Token is required",
        });
      }

      await accService.verifyEmail(token);

      return res.status(200).json({
        status_code: 200,
        message: "Email verified successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AccountController;
