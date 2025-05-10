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
      token: 'dev-token',
      user: {
        id: 1,
        username: 'devadmin',
        email: 'dev@admin',
        role: 'admin'
      }
    });
  }

  const { email, password } = req.body;

  try {
    // Only allow one admin login at a time
    const adminsLoggedIn = await User.getLoggedInAdmins();
    if (adminsLoggedIn.length > 0) {
      return res.status(403).json({ message: 'An admin is already logged in elsewhere.' });
    }

    // Authenticate user with User model
    const user = await User.authenticate(email, password);
    if (!user || !user.is_admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Set logged_in true for this admin
    await User.setLoggedIn(user.email, true);

    // Create JWT token
    const payload = {
      user: {
        id: user.id || user.user_id,
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

// @route   POST api/auth/request-reset
// @desc    Request password reset for admin
// @access  Public
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user || !user.is_admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/reset-password?token=${resetToken}`;
    // Send email (use your email sending logic)
    await User.sendResetEmail(email, resetUrl);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/reset-password
// @desc    Reset admin password
// @access  Public
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.findByEmail(email);
    if (!user || !user.is_admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    await User.updatePassword(email, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

// @route   POST api/auth/logout
// @desc    Logout admin user
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.is_admin) {
      await User.setLoggedIn(user.email, false);
    }
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Logout error' });
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
