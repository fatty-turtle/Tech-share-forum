import rateLimit from "express-rate-limit";

/**
 * General API rate limiter
 */
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
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
  windowMs: 2 * 60 * 1000,
  max: 10, // 5 login attempts
  message: {
    message: "Too many login attempts, please try again later",
  },
});

export { apiRateLimiter, loginRateLimiter };
