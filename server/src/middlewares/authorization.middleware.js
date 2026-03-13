import jwt from "jsonwebtoken";

/**
 * Middleware to authorize users based on required roles
 * @param {...string} requiredRoles - Required role(s) for access
 * @returns {Function} Express middleware function
 */
const authorize = (...requiredRoles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let userRoles = [];

      if (Array.isArray(decoded.roles)) {
        userRoles = decoded.roles.map((r) =>
          typeof r === "string"
            ? r.toUpperCase()
            : (r.name || r.role || "").toUpperCase(),
        );
      }

      if (userRoles.length === 0) {
        return res.status(403).json({
          message: "Unauthorized (roles not found in token)",
        });
      }

      const required = requiredRoles.map((r) => r.toUpperCase());

      const hasPermission = required.some((role) => userRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      req.user = {
        ...decoded,
        roles: userRoles,
      };

      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
        error: err.message,
      });
    }
  };
};

export { authorize };
