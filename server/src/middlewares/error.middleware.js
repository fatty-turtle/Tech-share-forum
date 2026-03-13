/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export default function (err, req, res, next) {
  console.error(err);
  res.status(err.status || err.statusCode || 500).json({
    status_code: err.status || err.statusCode || 500,
    message: err.message || "Internal server error",
  });
}
