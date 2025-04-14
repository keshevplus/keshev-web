const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Proxy contact form submissions to Django backend
app.post("/api/contact", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/leads/",
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .send(error.response?.data || "Error connecting to backend");
  }
});

// Proxy admin leads fetch to Django backend
app.get("/api/leads", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/api/leads/");
    res.status(response.status).send(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .send(error.response?.data || "Error connecting to backend");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
