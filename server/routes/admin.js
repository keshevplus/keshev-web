const express = require("express");
const router = express.Router();
const { query } = require("../config/db");
const auth = require("../middleware/auth"); // Import authentication middleware

// Apply authentication middleware to all routes
router.use(auth);

// @route   GET api/admin/content
// @desc    Get all content with pagination and filtering
// @access  Private
router.get("/content", async (req, res) => {
  const { page = 1, limit = 10, filter = "" } = req.query; // Extract query parameters for pagination and filtering
  const offset = (page - 1) * limit; // Calculate offset for pagination

  try {
    const result = await query(
      `SELECT * FROM content WHERE title ILIKE $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [`%${filter}%`, limit, offset] // Use ILIKE for case-insensitive filtering
    );
    res.json(result.rows); // Return the filtered and paginated content
  } catch (err) {
    console.error(err.message); // Log server error
    res.status(500).json({ error: "Server error" }); // Return server error response
  }
});

// @route   GET api/admin/content/:id
// @desc    Get content by ID
// @access  Private
router.get("/content/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM content WHERE id = $1", [
      req.params.id, // Extract content ID from request parameters
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Content not found" }); // Return 404 if content not found
    }

    res.json(result.rows[0]); // Return the content data
  } catch (err) {
    console.error(err.message); // Log server error
    res.status(500).send("Server error"); // Return server error response
  }
});

// @route   POST api/admin/content
// @desc    Create new content
// @access  Private
router.post("/content", async (req, res) => {
  const { title, content_type, content_data, status } = req.body; // Extract content details from request body

  if (!title || !content_type || !content_data) {
    return res.status(400).json({ error: "Missing required fields" }); // Validate required fields
  }

  try {
    const result = await query(
      "INSERT INTO content (title, content_type, content_data, status, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, content_type, content_data, status || "draft", req.user.id] // Insert content into database
    );

    res.json(result.rows[0]); // Return the created content
  } catch (err) {
    console.error(err.message); // Log server error
    res.status(500).json({ error: "Server error" }); // Return server error response
  }
});

// @route   PUT api/admin/content/:id
// @desc    Update content by ID
// @access  Private
router.put("/content/:id", async (req, res) => {
  const { title, content_type, content_data, status } = req.body; // Extract updated content details from request body

  if (!title || !content_type || !content_data) {
    return res.status(400).json({ error: "Missing required fields" }); // Validate required fields
  }

  try {
    // Check if content exists
    const contentCheck = await query("SELECT * FROM content WHERE id = $1", [
      req.params.id, // Extract content ID from request parameters
    ]);

    if (contentCheck.rows.length === 0) {
      return res.status(404).json({ error: "Content not found" }); // Return 404 if content not found
    }

    const result = await query(
      "UPDATE content SET title = $1, content_type = $2, content_data = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING *",
      [title, content_type, content_data, status, req.params.id] // Update content in database
    );

    res.json(result.rows[0]); // Return the updated content
  } catch (err) {
    console.error(err.message); // Log server error
    res.status(500).json({ error: "Server error" }); // Return server error response
  }
});

// @route   DELETE api/admin/content/:id
// @desc    Delete content by ID
// @access  Private
router.delete("/content/:id", async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM content WHERE id = $1 RETURNING *",
      [req.params.id] // Extract content ID from request parameters
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Content not found" }); // Return 404 if content not found
    }

    res.json({ message: "Content removed" }); // Return success message
  } catch (err) {
    console.error(err.message); // Log server error
    res.status(500).send("Server error"); // Return server error response
  }
});

// @route   GET api/admin/pages
// @desc    Get all pages
// @access  Private
router.get("/pages", async (req, res) => {
  const { page = 1, limit = 10, filter = "" } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await query(
      `SELECT * FROM pages WHERE title ILIKE $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
      [`%${filter}%`, limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET api/admin/pages/:slug
// @desc    Get page by slug
// @access  Private
router.get("/pages/:slug", async (req, res) => {
  try {
    // Get page data
    const pageResult = await query("SELECT * FROM pages WHERE slug = $1", [
      req.params.slug,
    ]);

    if (pageResult.rows.length === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    const page = pageResult.rows[0];

    // Get page sections
    const sectionsResult = await query(
      "SELECT * FROM page_sections WHERE page_id = $1 ORDER BY display_order",
      [page.id]
    );

    // Return combined data
    res.json({
      ...page,
      sections: sectionsResult.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/admin/pages
// @desc    Create new page
// @access  Private
router.post("/pages", async (req, res) => {
  const { slug, title, status = "published" } = req.body;

  try {
    // Check if slug already exists
    const slugCheck = await query("SELECT id FROM pages WHERE slug = $1", [
      slug,
    ]);
    if (slugCheck.rows.length > 0) {
      return res.status(400).json({ message: "Page slug already exists" });
    }

    const result = await query(
      "INSERT INTO pages (slug, title, status, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [slug, title, status, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/admin/pages/:id
// @desc    Update page
// @access  Private
router.put("/pages/:id", async (req, res) => {
  const { title, status } = req.body;

  try {
    const result = await query(
      "UPDATE pages SET title = $1, status = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [title, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Page Sections Routes

// @route   POST api/admin/pages/:pageId/sections
// @desc    Add section to page
// @access  Private
router.post("/pages/:pageId/sections", async (req, res) => {
  const { section_type, title, content, content_json, display_order } =
    req.body;

  try {
    // Check if page exists
    const pageCheck = await query("SELECT id FROM pages WHERE id = $1", [
      req.params.pageId,
    ]);
    if (pageCheck.rows.length === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    const result = await query(
      "INSERT INTO page_sections (page_id, section_type, title, content, content_json, display_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.params.pageId,
        section_type,
        title,
        content,
        content_json,
        display_order,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/admin/sections/:id
// @desc    Update page section
// @access  Private
router.put("/sections/:id", async (req, res) => {
  const { title, content, content_json, display_order } = req.body;

  try {
    const result = await query(
      "UPDATE page_sections SET title = $1, content = $2, content_json = $3, display_order = $4, updated_at = NOW() WHERE id = $5 RETURNING *",
      [title, content, content_json, display_order, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/admin/sections/:id
// @desc    Delete page section
// @access  Private
router.delete("/sections/:id", async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM page_sections WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ message: "Section removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Services Routes

// @route   GET api/admin/services
// @desc    Get all services
// @access  Private
router.get("/services", async (req, res) => {
  try {
    const result = await query("SELECT * FROM services ORDER BY display_order");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/admin/services
// @desc    Create new service
// @access  Private
router.post("/services", async (req, res) => {
  const { title, description, icon, image_url, display_order } = req.body;

  try {
    const result = await query(
      "INSERT INTO services (title, description, icon, image_url, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, icon, image_url, display_order || 0]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/admin/services/:id
// @desc    Update service
// @access  Private
router.put("/services/:id", async (req, res) => {
  const { title, description, icon, image_url, display_order } = req.body;

  try {
    const result = await query(
      "UPDATE services SET title = $1, description = $2, icon = $3, image_url = $4, display_order = $5, updated_at = NOW() WHERE id = $6 RETURNING *",
      [title, description, icon, image_url, display_order, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/admin/services/:id
// @desc    Delete service
// @access  Private
router.delete("/services/:id", async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Forms Routes

// @route   GET api/admin/forms
// @desc    Get all forms
// @access  Private
router.get("/forms", async (req, res) => {
  try {
    const result = await query("SELECT * FROM forms ORDER BY display_order");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/admin/forms
// @desc    Create new form
// @access  Private
router.post("/forms", async (req, res) => {
  const { title, subtitle, description, file_url, image_url, display_order } =
    req.body;

  try {
    const result = await query(
      "INSERT INTO forms (title, subtitle, description, file_url, image_url, display_order) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, subtitle, description, file_url, image_url, display_order || 0]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/admin/forms/:id
// @desc    Update form
// @access  Private
router.put("/forms/:id", async (req, res) => {
  const { title, subtitle, description, file_url, image_url, display_order } =
    req.body;

  try {
    const result = await query(
      "UPDATE forms SET title = $1, subtitle = $2, description = $3, file_url = $4, image_url = $5, display_order = $6, updated_at = NOW() WHERE id = $7 RETURNING *",
      [
        title,
        subtitle,
        description,
        file_url,
        image_url,
        display_order,
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/admin/forms/:id
// @desc    Delete form
// @access  Private
router.delete("/forms/:id", async (req, res) => {
  try {
    const result = await query("DELETE FROM forms WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({ message: "Form removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
