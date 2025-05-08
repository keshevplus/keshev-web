import axios from 'axios';
import express from 'express';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Contact API is available', success: true });
  }

  if (req.method === 'POST') {
    console.log('Contact form data received:', req.body);
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: [
          { field: 'name', message: !req.body.name ? 'Name is required' : '' },
          { field: 'email', message: !req.body.email ? 'Email is required' : '' },
          { field: 'message', message: !req.body.message ? 'Message is required' : '' },
        ].filter(e => e.message),
      });
    }
    try {
      const protocol = process.env.VERCEL_ENV === 'development' ? 'http://' : 'https://';
      const baseUrl = process.env.VERCEL_URL ? `${protocol}${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/api/neon/leads`,
        data: req.body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.status(200).json({
        success: true,
        message: 'Form submitted successfully',
        data: response.data,
      });
    } catch (error) {
      console.error('Error forwarding to neon leads:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to submit form',
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
