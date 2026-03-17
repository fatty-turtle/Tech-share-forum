import express from "express";
import AccountController from "../controllers/account.controller.js";
import { loginRateLimiter } from "../middlewares/rateLimit.middleware.js";
import { loginDTO, registerDTO } from "../dtos/account.dto.js";

const router = express.Router();
const accController = new AccountController();

router.post("/login", loginRateLimiter, loginDTO, accController.login);
router.post("/register", loginRateLimiter, registerDTO, accController.register);
router.get("/verify-email/:token", loginRateLimiter, accController.verifyEmail);

export default router;
