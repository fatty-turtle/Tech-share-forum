import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import accRoute from "./routes/account.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", accRoute);

app.use(errorMiddleware);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
}); 

export default app;
