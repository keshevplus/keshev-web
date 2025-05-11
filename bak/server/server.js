import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(path.dirname(new URL(process.url).pathname), '.env.email') });
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import fs from "fs";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import leadsRoutes from "./routes/leads.js";
import neonLeadsRoutes from "./routes/neon-leads.js";
import testRoute from "./routes/test.js";
import authMiddleware from "./middleware/auth.js";

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity, but consider enabling it in production with proper configuration
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the base URL for API requests
const getBaseUrl = (req) => {
  // In production (Vercel), use https
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return `https://${req.headers.host}`;
  }
  // In development, use the protocol from request or default to http
  return `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;
};



// API Routes - Define these BEFORE static file handling
app.use(API_BASE_URL + '/auth/login', authRoutes);
app.use(API_BASE_URL + '/admin', authMiddleware, adminRoutes);
app.use(API_BASE_URL + '/leads', leadsRoutes);
app.use(API_BASE_URL + '/neon/leads', neonLeadsRoutes);
app.use(API_BASE_URL + '/test', testRoute);

app.use('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Modified API endpoint handling for contact forms
app.all(
  API_BASE_URL + '/contact', (req, res) => {
  console.log(`[${new Date().toISOString()}] Received ${req.method} request to /api/contact`);
  
  // For OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).header('Access-Control-Allow-Methods', 'GET, POST').send();
  }
  
  // For GET requests (health check)
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Contact API is available', success: true });
  }
  
  // For POST requests (form submissions)
  if (req.method === 'POST') {
    // Log form data for debugging
    console.log('Contact form data received:', req.body);
    
    // Check for required fields
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: [
          { field: 'name', message: !req.body.name ? 'Name is required' : '' },
          { field: 'email', message: !req.body.email ? 'Email is required' : '' },
          { field: 'phone', message: !req.body.phone ? 'Phone is required' : '' },
          { field: 'message', message: !req.body.message ? 'Message is required' : '' }
        ].filter(e => e.message)
      });
    }
    
    // Forward to the neon leads endpoint directly using proper protocol
    axios({
      method: 'post',
      url: `${getBaseUrl(req)}${API_BASE_URL}/neon/leads`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Successfully forwarded to neon leads endpoint');
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
        data: response.data
      });
    })
    .catch(error => {
      console.error('Error forwarding to neon leads:', error.message);
      
      // Provide detailed error information
      res.status(500).json({
        success: false,
        message: 'Error processing form submission',
        error: error.message,
        // Only include stack trace in development
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
      });
    });
  } else {
    // For other methods (PUT, DELETE, etc.)
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
      allowedMethods: ['GET', 'POST', 'OPTIONS']
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Serve static assets and the React app
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

  // Fallback: serve index.html for any route not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

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
} else {
  // In development mode, redirect all non-API routes to the development server
  app.get("*", (req, res) => {
    // Only handle non-API routes
    if (!req.path.startsWith('/api')) {
      console.log(`Redirecting ${req.path} to development server`);
      res.redirect(`http://localhost:5173${req.path}`);
    } else {
      res.status(404).send('API endpoint not found');
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

// In local development, start server on port
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  console.log('Server configured for serverless environment');
}

// Export the Express app for serverless environments (Vercel)
export default app;
