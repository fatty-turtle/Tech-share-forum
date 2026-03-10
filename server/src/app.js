import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

const server = createServer(app);
app.use(express.urlencoded({ extended: true }));
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    credentials: true,
  }),
);
app.use(express.json());

export default app;
