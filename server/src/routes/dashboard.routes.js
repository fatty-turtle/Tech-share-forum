import express from "express";
import DashboardController from "../controllers/dashboard.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";

const router = express.Router();
const dashboardController = new DashboardController();

router.get(
  "",
  authenticate,
  authorize("ADMIN"),
  dashboardController.getDashboardStats,
);

export default router;
