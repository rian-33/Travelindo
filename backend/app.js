const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const apiRoutes = require("./routes/api");

const app = express();

// Security headers
app.use(helmet());

// CORS: allow specific origin(s) from env, fallback to localhost dev ports
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Tidak diizinkan oleh kebijakan CORS"));
      }
    },
  }),
);

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.message === "Tidak diizinkan oleh kebijakan CORS") {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

module.exports = app;