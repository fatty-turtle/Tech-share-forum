import DashBoardService from "../services/dashboard.service.js";

const dashboardService = new DashBoardService();

/**
 * Controller for handling dashboard-related HTTP requests
 */
class DashboardController {
  /**
   * Retrieves dashboard statistics
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with dashboard statistics
   */
  async getDashboardStats(req, res) {
    try {
      const stats = await dashboardService.getDashboardStats();

      return res.status(200).json({
        status_code: 200,
        message: "Dashboard stats retrieved successfully",
        stats,
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        message: err.message || "Failed to retrieve dashboard stats",
      });
    }
  }
}

export default DashboardController;
