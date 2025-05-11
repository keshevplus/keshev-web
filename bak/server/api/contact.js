import axios from 'axios';
import express from 'express';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}

function getMissingFieldErrors(body) {
  return [
    { field: 'name', message: !body.name ? 'Name is required' : '' },
    { field: 'email', message: !body.email ? 'Email is required' : '' },
    { field: 'message', message: !body.message ? 'Message is required' : '' },
  ].filter(e => e.message);
}

function getBaseUrl() {
  const protocol = process.env.VERCEL_ENV === 'development' ? 'http://' : 'https://';
  return process.env.VERCEL_URL ? `${protocol}${process.env.VERCEL_URL}` : 'http://localhost:5000';
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Contact API is available', success: true });
  }

  if (req.method === 'POST') {
    console.log('Contact form data received:', req.body);
    const errors = getMissingFieldErrors(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors,
      });
    }
    try {
      const baseUrl = getBaseUrl();
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/neon/leads`,
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
        error: error.message,
      });
    }
  }

  res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
