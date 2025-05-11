const { query } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null if not found
   */
  static async findById(id) {
    try {
      const result = await query('SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
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
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
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
   * @param {string} [userData.role='user'] - Role (defaults to 'user')
   * @returns {Promise<Object>} Created user object (without password)
   */
  static async create(userData) {
    try {
      // Check if user exists
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Insert user
      const result = await query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at, updated_at',
        [userData.username, userData.email, hashedPassword, userData.role || 'user']
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Authenticate a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object|null>} User object if authenticated, null otherwise
   */
  static async authenticate(email, password) {
    try {
      // Find user
      const user = await this.findByEmail(email);
      if (!user) {
        return null;
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return null;
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user object
   */
  static async update(id, userData) {
    try {
      const updatableFields = [];
      const values = [];
      let paramIndex = 1;

      // Add updatable fields
      if (userData.username) {
        updatableFields.push(`username = $${paramIndex}`);
        values.push(userData.username);
        paramIndex++;
      }

      if (userData.email) {
        updatableFields.push(`email = $${paramIndex}`);
        values.push(userData.email);
        paramIndex++;
      }

      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        updatableFields.push(`password = $${paramIndex}`);
        values.push(hashedPassword);
        paramIndex++;
      }

      if (userData.role) {
        updatableFields.push(`role = $${paramIndex}`);
        values.push(userData.role);
        paramIndex++;
      }

      // Add updated_at
      updatableFields.push(`updated_at = CURRENT_TIMESTAMP`);

      // If no fields to update
      if (updatableFields.length === 1) {
        return await this.findById(id);
      }

      // Update user
      values.push(id); // Add ID as the last parameter
      const result = await query(
        `UPDATE users SET ${updatableFields.join(', ')} WHERE id = $${paramIndex} RETURNING id, username, email, role, created_at, updated_at`,
        values
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  static async delete(id) {
    try {
      const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Create an admin user
   * @returns {Promise<Object>} Created admin user
   */
  static async createAdmin(adminData) {
    // Override role to ensure it's admin
    return this.create({
      ...adminData,
      role: 'admin'
    });
  }
}

module.exports = User;
