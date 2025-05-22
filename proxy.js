import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Simple CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Create proxy middleware for the API
const apiProxy = createProxyMiddleware({
  target: 'https://api.keshevplus.co.il',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api' // Keep the /api prefix
  },
  // Add production headers to fool the API
  onProxyReq: (proxyReq, req) => {
    // Add origin and referer headers to make it look like the request comes from the production site
    proxyReq.setHeader('Origin', 'https://www.keshevplus.co.il');
    proxyReq.setHeader('Referer', 'https://www.keshevplus.co.il/');
    
    // Forward authentication token if present
    const authToken = req.headers['x-auth-token'] || req.headers['authorization'];
    if (authToken) {
      console.log('Forwarding authentication token');
      proxyReq.setHeader('x-auth-token', authToken);
    }
    
    // Log request details
    console.log(`Proxying ${req.method} ${req.path}`);
    if (req.body) {
      console.log('Request body:', req.body);
    }
  },
  // Log the response status and details
  onProxyRes: (proxyRes, req) => {
    console.log(`${req.method} ${req.path} => ${proxyRes.statusCode}`);
    
    // Log more detailed error information for non-200 responses
    if (proxyRes.statusCode >= 400) {
      console.error(`Error response from API: ${req.method} ${req.path} => ${proxyRes.statusCode}`);
    }
  },
  // Handle errors
  onError: (err, req, res) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).send({ error: 'Proxy error', message: err.message });
  }
});

// Forward all requests to the API
app.use('/api', apiProxy);

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log('Forward requests to http://localhost:3001/api/...');
});
