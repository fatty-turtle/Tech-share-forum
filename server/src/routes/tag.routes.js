import express from "express";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { apiRateLimiter } from "../middlewares/rateLimit.middleware.js";

import TagController from "../controllers/tag.controller.js";

const router = express.Router();
const tagController = new TagController();

router.get("/", tagController.getTags);
router.get("/trend", tagController.getTrendTags);

export default router;
