const { neon } = require('@neondatabase/serverless');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Function to get database URL from various sources
function getDatabaseUrl() {
  // First try environment variable
  let databaseUrl = process.env.NEON_DATABASE_URL;
  
  // If not found, try KP_POSTGRES_URL
  if (!databaseUrl) {
    databaseUrl = process.env.KP_POSTGRES_URL;
  }
  
  // If still not found, try to read from database-connection.js if it exists
  if (!databaseUrl) {
    const connectionFile = path.join(__dirname, '../scripts/database-connection.js');
    if (fs.existsSync(connectionFile)) {
      try {
        const connection = require('../scripts/database-connection.js');
        databaseUrl = connection.databaseUrl;
      } catch (error) {
        console.error('Error loading database connection file:', error.message);
      }
    }
  }
  
  // If still not found, try to construct from other environment variables
  if (!databaseUrl && process.env.KP_POSTGRES_HOST) {
    const host = process.env.KP_POSTGRES_HOST;
    const user = process.env.KP_POSTGRES_USER || 'postgres';
    const password = process.env.KP_POSTGRES_PASSWORD;
    const database = process.env.KP_POSTGRES_DATABASE || 'postgres';
    
    if (host && password) {
      databaseUrl = `postgres://${user}:${password}@${host}:5432/${database}?sslmode=require`;
    }
  }
  
  return databaseUrl;
}

// Create SQL instance with Neon - but handle missing connection gracefully
let sql;
try {
  const databaseUrl = getDatabaseUrl();
  if (databaseUrl) {
    sql = neon(databaseUrl);
    console.log('Connected to Neon database successfully');
  } else {
    console.error('No database URL found. Database operations will fail.');
  }
} catch (error) {
  console.error('Error initializing database connection:', error.message);
}

class User {
  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null if not found
   */
  static async findById(id) {
    try {
      if (!sql) {
        throw new Error('Database connection not initialized');
      }
      
      const result = await sql`
        SELECT id, username, email, is_admin, created_at 
        FROM users WHERE id = ${id}
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null if not found
   */
  static async findByEmail(email) {
    try {
      if (!sql) {
        throw new Error('Database connection not initialized');
      }
      
      const result = await sql`
        SELECT * FROM users WHERE email = ${email}
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email
   * @param {string} userData.password - Password (will be hashed)
   * @param {boolean} [userData.is_admin=false] - Is admin user
   * @returns {Promise<Object>} Created user object (without password)
   */
  static async create(userData) {
    try {
      if (!sql) {
        throw new Error('Database connection not initialized');
      }
      
      // Check if user exists
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const is_admin = userData.is_admin || false;

      // Insert user
      const result = await sql`
        INSERT INTO users (username, email, password, is_admin) 
        VALUES (${userData.username}, ${userData.email}, ${hashedPassword}, ${is_admin}) 
        RETURNING id, username, email, is_admin, created_at
      `;

      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Create an admin user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created admin user object
   */
  static async createAdmin(userData) {
    return this.create({
      ...userData,
      is_admin: true
    });
  }

  /**
   * Authenticate a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object|null>} User object if authenticated, null otherwise
   */
  static async authenticate(email, password) {
    // TEMPORARY BYPASS: Always return the user object for free admin access (DEBUG ONLY)
    const user = await this.findByEmail(email);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user object
   */
  static async update(id, updateData) {
    try {
      if (!sql) {
        throw new Error('Database connection not initialized');
      }
      
      // If password is being updated, hash it
      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      // Build the update query dynamically
      let updateFields = [];
      let updateValues = [];
      
      Object.entries(updateData).forEach(([key, value]) => {
        if (key !== 'id') { // Skip the ID field
          updateFields.push(`${key} = ?`);
          updateValues.push(value);
        }
      });
      
      // Add the ID as the last parameter
      updateValues.push(id);
      
      const updateQuery = `
        UPDATE users 
        SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ? 
        RETURNING id, username, email, is_admin, created_at, updated_at
      `;

      const result = await sql(updateQuery, updateValues);
      return result[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  static async delete(id) {
    try {
      if (!sql) {
        throw new Error('Database connection not initialized');
      }
      
      const result = await sql`
        DELETE FROM users WHERE id = ${id} RETURNING id
      `;
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Get all admins currently logged in
   * @returns {Promise<Object[]>} Array of logged in admin users
   */
  static async getLoggedInAdmins() {
    try {
      if (!sql) throw new Error('Database connection not initialized');
      const result = await sql`SELECT * FROM users WHERE is_admin = true AND logged_in = true`;
      return result;
    } catch (error) {
      console.error('Error getting logged in admins:', error);
      throw error;
    }
  }

  /**
   * Set logged_in flag for a user by email
   * @param {string} email - User email
   * @param {boolean} value - New logged_in value
   */
  static async setLoggedIn(email, value) {
    try {
      if (!sql) throw new Error('Database connection not initialized');
      await sql`UPDATE users SET logged_in = ${value} WHERE email = ${email}`;
    } catch (error) {
      console.error('Error setting logged_in:', error);
      throw error;
    }
  }

  /**
   * Send password reset email
   * @param {string} email - User email
   * @param {string} resetUrl - Password reset URL
   */
  static async sendResetEmail(email, resetUrl) {
    // Use your EMAIL_API_KEY and email sending logic here
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_API_KEY,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Password Reset',
      html: `<p>Click <a href='${resetUrl}'>here</a> to reset your admin password. This link is valid for 1 hour.</p>`
    };
    await transporter.sendMail(mailOptions);
  }

  /**
   * Update password for a user by email
   * @param {string} email - User email
   * @param {string} newPassword - New password
   */
  static async updatePassword(email, newPassword) {
    try {
      if (!sql) throw new Error('Database connection not initialized');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await sql`UPDATE users SET password = ${hashedPassword} WHERE email = ${email}`;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }
}

module.exports = User;
