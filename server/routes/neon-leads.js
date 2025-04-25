const express = require("express");
const router = express.Router();
const { neon } = require('@neondatabase/serverless');
const { body, validationResult } = require("express-validator");
require('dotenv').config();

// Create SQL instance with Neon
const sql = neon(process.env.NEON_DATABASE_URL);

// @route   POST /api/leads
// @desc    Save lead data to Neon database
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

      // Database Operation using Neon's tagged template literals
      let result;
      try {
        result = await sql`
          INSERT INTO leads (name, email, phone, subject, message, date_received) 
          VALUES (
            ${sanitizedData.name}, 
            ${sanitizedData.email}, 
            ${sanitizedData.phone}, 
            ${sanitizedData.subject}, 
            ${sanitizedData.message}, 
            CURRENT_TIMESTAMP
          ) 
          RETURNING id
        `;
        
        // Also save to localStorage for easy retrieval
        // First get existing submissions
        let existingSubmissions = await sql`
          SELECT * FROM leads ORDER BY date_received DESC LIMIT 100
        `;
        
        // Log for debugging
        console.log(`Successfully saved submission with ID: ${result[0].id}`);        
        console.log(`Total submissions in database: ${existingSubmissions.length}`);
      } catch (dbError) {
        console.error("Database error during lead insertion:", {
          error: dbError.stack || dbError.message,
          requestBody: sanitizedData,
          timestamp: new Date().toISOString(),
        });

        throw dbError; // Re-throw for general error handling
      }

      // Success Response
      console.log("Lead saved successfully to Neon database:", {
        leadId: result?.[0]?.id
      });

      return res.status(201).json({
        status: "success",
        message: "Lead saved successfully",
        data: {
          leadId: result?.[0]?.id
        }
      });

    } catch (error) {
      // Global Error Handler
      console.error("Unexpected error in lead submission:", {
        error: error.stack || error.message,
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

// @route   GET /api/leads
// @desc    Get all leads from Neon database (for administrative use)
// @access  Should be protected in production
router.get("/", async (req, res) => {
  try {
    const leads = await sql`
      SELECT * FROM leads ORDER BY date_received DESC
    `;
    
    return res.status(200).json({
      status: "success",
      count: leads.length,
      data: leads
    });
  } catch (error) {
    console.error("Error retrieving leads:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve leads"
    });
  }
});

module.exports = router;
