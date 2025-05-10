const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User-neon'); 
const auth = require('../middleware/auth');
require('dotenv').config();

// @route   POST api/auth/register
// @desc    Register admin user
// @access  Public (should be restricted in production)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create admin user using the User model
    const user = await User.createAdmin({ username, email, password });

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message || err);
    if (err.message === 'User already exists') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  // DEV OVERRIDE: Free access in development
  if (process.env.NODE_ENV === 'development' || process.env.FREE_ADMIN === 'true') {
    return res.json({
      id: 1,
      username: 'devadmin',
      email: 'dev@admin',
      role: 'admin',
      token: 'dev-token'
    });
  }

  const { email, password } = req.body;

  try {
    // Authenticate user with User model
    const user = await User.authenticate(email, password);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ ...user, token });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err.message || err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
