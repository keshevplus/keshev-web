require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Pool } = require("pg");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const authMiddleware = require("./middleware/auth");
const path = require("path");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the client directory
app.use(
  express.static(path.join(__dirname, "../client/dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Handle 404 for static files
app.use((req, res, next) => {
  if (req.path.endsWith(".js") || req.path.endsWith(".css")) {
    console.error(`Static file not found: ${req.path}`);
    return res.status(404).send("File not found");
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", authMiddleware, adminRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Catch-all route to serve the main index.html for non-static file requests
app.get("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  } else {
    res.status(404).send("Not found");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
