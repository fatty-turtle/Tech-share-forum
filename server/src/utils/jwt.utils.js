import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 * Creates a JWT token for a user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
function createToken(user) {
  return jwt.sign(
    {
      user_id: user.user_id,
      roles: user.roles,
    },
    process.env.JWT_SECRET || "VINH",
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
  );
}

export { createToken };
