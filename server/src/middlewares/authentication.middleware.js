import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 * Middleware to authenticate users via JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|void} JSON response or calls next middleware
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthenticated",
      });
    }

    // Authorization: Bearer <token>
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "VINH");

    // Attach user info to request
    req.user = {
      user_id: decoded.user_id,
      roles: decoded.roles,
      email: decoded.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export { authenticate };
