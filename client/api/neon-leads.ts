import { neon } from '@neondatabase/serverless';
import { sendLeadNotification, sendLeadAcknowledgment } from '../../server/utils/mailer';
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
      if (!databaseUrl) {
        return res.status(500).json({ message: 'Database configuration error', status: 'error' });
      }
      const sql = neon(databaseUrl + '?sslmode=require');
      const leads = await sql`SELECT * FROM leads ORDER BY date_received DESC`;
      return res.status(200).json({ status: 'success', count: leads.length, data: leads });
    } catch (error: any) {
      console.error('Error retrieving leads:', error);
      return res.status(500).json({ status: 'error', message: 'Failed to retrieve leads' });
    }
  }

  if (req.method === 'POST') {
    try {
      const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
      if (!databaseUrl) {
        console.error('No database URL found in environment variables');
        return res.status(500).json({ message: 'Database configuration error', status: 'error' });
      }
      const sql = neon(databaseUrl + '?sslmode=require');
      // ... (rest of your logic for inserting a lead, sending notifications, etc.)
      res.status(200).json({ status: 'success', message: 'Lead saved successfully' });
    } catch (error: any) {
      console.error('Error saving lead:', error);
      res.status(500).json({ status: 'error', message: 'Failed to save lead' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
