import rateLimit from "express-rate-limit";

/**
 * General API rate limiter
 */
const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests, please try again later",
  },
});

/**
 * Strict limiter for login endpoint
 */
const loginRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts
  message: {
    message: "Too many login attempts, please try again later",
  },
});

export { apiRateLimiter, loginRateLimiter };
