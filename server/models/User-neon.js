const { neon } = require('@neondatabase/serverless');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Create SQL instance with Neon
const sql = neon(process.env.NEON_DATABASE_URL);

class User {
  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null if not found
   */
  static async findById(id) {
    try {
      const result = await sql`
        SELECT id, username, email, role, created_at 
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
      const role = userData.role || 'user';

      // Insert user
      const result = await sql`
        INSERT INTO users (username, email, password, role) 
        VALUES (${userData.username}, ${userData.email}, ${hashedPassword}, ${role}) 
        RETURNING id, username, email, role, created_at
      `;

      return result[0];
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
      let updateFields = {};
      
      // Add updatable fields
      if (userData.username) updateFields.username = userData.username;
      if (userData.email) updateFields.email = userData.email;
      if (userData.role) updateFields.role = userData.role;
      
      // Handle password separately for hashing
      let hashedPassword;
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(userData.password, salt);
      }

      // If no fields to update
      if (Object.keys(updateFields).length === 0 && !hashedPassword) {
        return await this.findById(id);
      }

      // Create dynamic query with only fields that need updating
      let result;
      if (hashedPassword) {
        result = await sql`
          UPDATE users 
          SET ${sql(updateFields)}, password = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP 
          WHERE id = ${id} 
          RETURNING id, username, email, role, created_at
        `;
      } else {
        result = await sql`
          UPDATE users 
          SET ${sql(updateFields)}, updated_at = CURRENT_TIMESTAMP 
          WHERE id = ${id} 
          RETURNING id, username, email, role, created_at
        `;
      }

      return result[0];
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
