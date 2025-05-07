const { default: axios } = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // For GET requests (health check)
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Contact API is available', success: true });
  }

  // Handle POST requests
  if (req.method === 'POST') {
    console.log('Contact form data received:', req.body);
    
    // Check for required fields
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: [
          { field: 'name', message: !req.body.name ? 'Name is required' : '' },
          { field: 'email', message: !req.body.email ? 'Email is required' : '' },
          { field: 'message', message: !req.body.message ? 'Message is required' : '' }
        ].filter(e => e.message)
      });
    }
    
    try {
      // Forward to the neon leads endpoint directly
      const protocol = process.env.VERCEL_ENV === 'development' ? 'http://' : 'https://';
      const baseUrl = process.env.VERCEL_URL ? `${protocol}${process.env.VERCEL_URL}` : 'http://localhost:3000';
      
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/neon/leads`,
        data: req.body,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Successfully forwarded to neon leads endpoint');
      return res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
        data: response.data
      });
    } catch (error) {
      console.error('Error forwarding to neon leads:', error.message);
      
      return res.status(500).json({
        success: false,
        message: 'Error processing form submission',
        error: error.message || 'Unknown error'
      });
    }
  }

  // If it's not a GET, OPTIONS, or POST request
  return res.status(405).json({ error: 'Method not allowed' });
};
