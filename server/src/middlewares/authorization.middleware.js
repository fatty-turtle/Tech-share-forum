const authorize = (...requiredRoles) => {
  return (req, res, next) => {
    if (!req.user?.roles) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const userRoles = req.user.roles.map((r) =>
      typeof r === "string"
        ? r.toUpperCase()
        : (r.name || r.role || "").toUpperCase(),
    );

    const required = requiredRoles.map((r) => r.toUpperCase());

    const hasPermission = required.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    next();
  };
};

export { authorize };
