import express from "express";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { apiRateLimiter } from "../middlewares/rateLimit.middleware.js";

import PostController from "../controllers/post.controller.js";

const router = express.Router();
const postController = new PostController();

// Public
router.get("/", apiRateLimiter, postController.getPosts);
router.get("/trend", apiRateLimiter, postController.getTrendPosts);

export default router;
