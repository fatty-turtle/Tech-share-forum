import express from "express";
import UserController from "../controllers/user.controller.js";
import createUserDTO from "../dtos/createUser.dto.js";
import updatePasswordDTO from "../dtos/updatePassword.dto.js";
import updateUserInfoDTO from "../dtos/updateUserInfo.dto.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { apiRateLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();
const userController = new UserController();

router.get(
  "/users",
  apiRateLimiter,
  authenticate,
  authorize("ADMIN"),
  userController.getUserList,
);
router.post(
  "/create",
  apiRateLimiter,
  authenticate,
  authorize("ADMIN"),
  createUserDTO,
  userController.createUser,
);

router.get("", apiRateLimiter, authenticate, userController.getUserInfo);
router.patch(
  "/update_info",
  apiRateLimiter,
  authenticate,
  authorize("USER"),
  updateUserInfoDTO,
  userController.updateUserInfo,
);
router.patch(
  "/update_password",
  apiRateLimiter,
  authenticate,
  authorize("USER"),
  updatePasswordDTO,
  userController.updatePassword,
);

router.post(
  "/create_seller",
  apiRateLimiter,
  authenticate,
  authorize("USER"),
  userController.createSeller,
);

router.delete(
  "/delete_user",
  apiRateLimiter,
  authenticate,
  authorize("ADMIN"),
  userController.deleteUser,
);

export default router;
