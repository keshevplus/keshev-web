require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const fs = require("fs"); // Add this line to import the fs module
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const leadsRoutes = require("./routes/leads");
const neonLeadsRoutes = require("./routes/neon-leads");
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
app.use("/api/neon/leads", neonLeadsRoutes);

// Handle contact form submissions by redirecting to leads endpoint
app.post("/api/contact", (req, res) => {
  // Create a new request to the neon leads endpoint
  axios({
    method: 'post',
    url: `http://localhost:${PORT}/api/neon/leads`,
    data: req.body,
    headers: req.headers
  })
  .then(response => {
    res.status(response.status).json(response.data);
  })
  .catch(error => {
    console.error('Error forwarding contact request:', error);
    res.status(error.response?.status || 500).json({
      message: 'Error processing contact form',
      error: error.message
    });
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Serve static assets and the React app ONLY in production
if (process.env.NODE_ENV === 'production') {
  console.log("Running in production mode - serving static files from client/dist");

  // Serve static assets from the React build directory
  app.use(express.static(path.join(__dirname, "../client/dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  }));

  // THIS IS CRITICAL: The catch-all route that serves the React app
  app.get("*", (req, res) => {
    // Explicitly resolve the absolute path to index.html
    const indexPath = path.resolve(__dirname, "../client/dist/index.html");
    
    // Check if the file exists
    if (fs.existsSync(indexPath)) {
      // Set no-cache headers to ensure fresh content on refresh
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.sendFile(indexPath);
    } else {
      // Log an error if the index.html file doesn't exist at the expected path
      console.error(`Error: index.html not found at ${indexPath}`);
      res.status(500).send('Server Error: index.html not found');
    }
  });
}

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
