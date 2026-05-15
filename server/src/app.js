import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import accRoute from "./routes/account.routes.js";
import postRoute from "./routes/post.routes.js";
import tagRoute from "./routes/tag.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
const allowedClientOrigins = new Set([
  // Client web app
  `http://localhost:${process.env.CLIENT_PORT}`,
  `http://127.0.0.1:${process.env.CLIENT_PORT}`,

  // Desktop renderer (Electron dev uses VITE default 5173)
  `http://localhost:${process.env.APP_PORT}`,
  `http://127.0.0.1:${process.env.APP_PORT}`,
]);

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header (same-origin, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedClientOrigins.has(origin)) return callback(null, true);

      // Keep error-free fallback
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", accRoute);
app.use("/post", postRoute);
app.use("/tag", tagRoute);
app.use("/dashboard", dashboardRoute);

app.use(errorMiddleware);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: Array.from(allowedClientOrigins),
    methods: ["GET", "POST", "CREATE", "DELETE"],
    credentials: true,
  },
});

export default app;
