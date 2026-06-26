import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/projects", projectRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working 🚀",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "HackFlow Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 4000;

console.log(
  "Groq Key Loaded:",
  process.env.GROQ_API_KEY ? "YES ✅" : "NO ❌"
);

import http from "http";
import { initializeSocket } from "./socket/socket.js";

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});