const express = require("express");
const router = express.Router();
const { query } = require("../config/db");
const { body, validationResult } = require("express-validator");

// @route   POST /api/leads
// @desc    Save lead data to the database
// @access  Public
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Valid email is required")
      .normalizeEmail(),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone is required")
      .matches(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/)
      .withMessage("Invalid phone number"),
    body("subject")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Subject must be 255 characters or less"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    try {
      // Input Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation errors:", {
          errors: errors.array(),
          requestBody: req.body,
          timestamp: new Date().toISOString(),
        });
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: errors.array().map(err => ({
            field: err.param,
            message: err.msg
          }))
        });
      }

      const { name, email, phone, subject, message } = req.body;

      // Input Sanitization
      const sanitizedData = {
        name: name.trim(),
        email: email ? email.trim().toLowerCase() : null,
        phone: phone.trim(),
        subject: subject ? subject.trim() : null,
        message: message.trim()
      };

      // Database Operation
      let result;
      try {
        result = await query(
          "INSERT INTO leads (name, email, phone, subject, message, date_received) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING id",
          [sanitizedData.name, sanitizedData.email, sanitizedData.phone, sanitizedData.subject, sanitizedData.message]
        );
      } catch (dbError) {
        console.error("Database error during lead insertion:", {
          error: dbError.stack,
          requestBody: sanitizedData,
          timestamp: new Date().toISOString(),
          code: dbError.code
        });

        // Handle specific database errors
        if (dbError.code === '23505') { // Unique violation
          return res.status(409).json({
            status: "error",
            message: "This lead already exists in our system"
          });
        }

        throw dbError; // Re-throw for general error handling
      }

      // Success Response
      console.log("Lead saved successfully:", {
        leadId: result.rows[0].id
      });

      return res.status(201).json({
        status: "success",
        message: "Lead saved successfully",
        data: {
          leadId: result.rows[0].id
        }
      });

    } catch (error) {
      // Global Error Handler
      console.error("Unexpected error in lead submission:", {
        error: error.stack,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });

      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred while processing your request",
        errorId: new Date().getTime()
      });
    }
  }
);

module.exports = router;
