const newLocal = 'nodemailer';
const nodemailer = require(newLocal);
require('dotenv').config();

// Check for required environment variables
const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`Missing email configuration variables: ${missingEnvVars.join(', ')}. Email notifications will be disabled.`);
}

// Set default email addresses
const EMAIL_FROM = process.env.EMAIL_FROM || 'dr@keshevplus.co.il';
const EMAIL_TO = process.env.EMAIL_TO || 'pluskeshev@gmail.com';

// Create reusable transporter object using SMTP transport
let transporter = null;

if (missingEnvVars.length === 0) {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log('Email transporter configured successfully');
  } catch (error) {
    console.error('Failed to create email transporter:', error.message);
  }
}

/**
 * Send an email notification for a new lead
 * @param {Object} lead - The lead data
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
async function sendLeadNotification(lead) {
  if (!transporter) {
    console.warn('Email transporter not configured. Skipping email notification.');
    return false;
  }

  try {
    // Format the lead data for the email
    const formattedDate = new Date(lead.date_received || new Date()).toLocaleString('he-IL', {
      timeZone: 'Asia/Jerusalem'
    });

    // Create the email content with both Hebrew and English
    const mailOptions = {
      from: `"Keshev Plus" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: `פנייה חדשה באתר קשב פלוס - ${lead.name} | New Contact Form Submission - ${lead.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>פנייה חדשה התקבלה באתר קשב פלוס</h2>
          <p><strong>שם:</strong> ${lead.name}</p>
          <p><strong>אימייל:</strong> ${lead.email || 'לא צוין'}</p>
          <p><strong>טלפון:</strong> ${lead.phone}</p>
          <p><strong>נושא:</strong> ${lead.subject || 'לא צוין'}</p>
          <p><strong>הודעה:</strong></p>
          <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${lead.message}</p>
          <p><strong>התקבל בתאריך:</strong> ${formattedDate}</p>
        </div>
        <hr style="margin: 20px 0;" />
        <div dir="ltr" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Subject:</strong> ${lead.subject || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${lead.message}</p>
          <p><strong>Received at:</strong> ${formattedDate}</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Lead notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending lead notification email:', error);
    return false;
  }
}

/**
 * Send an acknowledgment email to the lead
 * @param {Object} lead - The lead data
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
async function sendLeadAcknowledgment(lead) {
  if (!transporter || !lead.email) {
    console.warn('Email transporter not configured or lead has no email. Skipping acknowledgment email.');
    return false;
  }

  try {
    // Create the email content with both Hebrew and English
    const mailOptions = {
      from: `"Keshev Plus" <${EMAIL_FROM}>`,
      to: lead.email,
      subject: `תודה על פנייתך לקשב פלוס | Thank you for contacting Keshev Plus`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>תודה על פנייתך לקשב פלוס</h2>
          <p>שלום ${lead.name},</p>
          <p>תודה על פנייתך. קיבלנו את הודעתך וניצור איתך קשר בהקדם האפשרי.</p>
          <p>להלן פרטי הפנייה שלך:</p>
          <ul>
            <li><strong>נושא:</strong> ${lead.subject || 'לא צוין'}</li>
            <li><strong>הודעה:</strong> ${lead.message}</li>
          </ul>
          <p>בברכה,<br>צוות קשב פלוס</p>
        </div>
        <hr style="margin: 20px 0;" />
        <div dir="ltr" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank you for contacting Keshev Plus</h2>
          <p>Hello ${lead.name},</p>
          <p>Thank you for your message. We have received your inquiry and will contact you as soon as possible.</p>
          <p>Here are the details of your submission:</p>
          <ul>
            <li><strong>Subject:</strong> ${lead.subject || 'Not provided'}</li>
            <li><strong>Message:</strong> ${lead.message}</li>
          </ul>
          <p>Best regards,<br>The Keshev Plus Team</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Lead acknowledgment email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending lead acknowledgment email:', error);
    return false;
  }
}

module.exports = {
  sendLeadNotification,
  sendLeadAcknowledgment
};
