require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const leadsRoutes = require("./routes/leads");
const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity, but consider enabling it in production with proper configuration
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes - Define these BEFORE static file handling
app.use("/api/auth", authRoutes);
app.use("/api/admin", authMiddleware, adminRoutes);
app.use("/api/leads", leadsRoutes);

// Handle contact form submissions by redirecting to leads endpoint
app.post("/api/contact", (req, res) => {
  // Forward the request to our own leads handler internally
  req.url = '/api/leads/';
  app._router.handle(req, res);
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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
  if (req.path.startsWith('/api') && (req.path.endsWith(".js") || req.path.endsWith(".css"))) {
    console.error(`Static file not found: ${req.path}`);
    return res.status(404).send("File not found");
  }
  next();
});

// Catch-all route to serve the main index.html for any non-API requests
// This MUST come after all API routes but before error handling middleware
app.get("*", (req, res, next) => {
  // Skip this middleware for API requests
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // All other routes serve the React app
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error occurred:", {
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    body: req.body,
  });
  res.status(500).json({
    message: "Server error",
    error: err.message,
    route: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
