export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Example: parse JSON body (Vercel automatically parses req.body for serverless functions)
    const data = req.body;
    // TODO: handle data (e.g., send email, save to DB)
    res.status(200).json({ message: 'Contact form received!', data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
