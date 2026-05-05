import express from "express";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { apiRateLimiter } from "../middlewares/rateLimit.middleware.js";

import PostController from "../controllers/post.controller.js";

const router = express.Router();
const postController = new PostController();

// Public
router.get("/", apiRateLimiter, postController.getPosts);
router.get("/trend", apiRateLimiter, postController.getTrendPosts);

// Protected (requires authentication) - authors or admins can delete
// router.delete(
//   "/:id",
//   authenticate,
//   authorize("ADMIN", "USER"),
//   postController.deletePost,
// );

export default router;
