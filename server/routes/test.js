const express = require('express');
const router = express.Router();

// Health check/test endpoint
router.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!', time: new Date().toISOString() });
});

module.exports = router;
