import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Log proxy requests
app.use((req, res, next) => {
  console.log(`[PROXY] ${req.method} ${req.path}`);
  next();
});

// Forward all /api/* requests to the target API
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.keshevplus.co.il',
    changeOrigin: true,
    secure: false
  })
);

// Test endpoint
app.get('/', (req, res) => {
  res.send('Proxy server is running. Use /api/* to access the API.');
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
