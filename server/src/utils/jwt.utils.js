import jwt from "jsonwebtoken";

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
  }

  const roles = Array.isArray(user.roles)
    ? user.roles
    : user.role
      ? [user.role]
      : [];

  if (roles.length === 0) {
    throw new Error("User has no roles assigned!");
  }

  return jwt.sign(
    {
      user_id: user.user_id,
      roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
  );
}

export { createToken };
