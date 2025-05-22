const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Log proxy requests
app.use((req, res, next) => {
  console.log(`[PROXY] ${req.method} ${req.path}`);
  next();
});

// Create the proxy
const apiProxy = createProxyMiddleware({
  target: process.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il/api',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add headers to make the API think the request is coming from the production site
    proxyReq.setHeader('Origin', 'https://www.keshevplus.co.il');
    proxyReq.setHeader('Referer', 'https://www.keshevplus.co.il/');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log the response status
    console.log(`[PROXY] Response: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('[PROXY] Error:', err);
    res.status(500).send({ error: 'Proxy error', message: err.message });
  }
});

// Forward all /api/* requests to the target API
app.use('/api', apiProxy);

// Test endpoint
app.get('/', (req, res) => {
  res.send('Proxy server is running. Use /api/* to access the API.');
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log(`Forwarding requests to ${process.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il/api'}`);
  console.log('Use http://localhost:3001/api/... for your API requests');
});
