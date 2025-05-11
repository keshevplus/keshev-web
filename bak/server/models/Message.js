const nodemailer = require('nodemailer');

const Message = {
  // Properties are defined inside the model
  id: {
    type: Number,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: String,
    allowNull: false
  },
  email: {
    type: String,
    allowNull: false,
    unique: true
  },
  phone: {
    type: String
  },
  subject: {
    type: String
  },
  message: {
    type: String,
    allowNull: false
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendEmail(name, email, phone, subject, message) {
  // create the email options
  const mailOptions = {
    from: `"Keshev Plus" <${process.env.MAIL_FROM}>`,
    to: 'dr@keshevplus.co.il',
    subject,
    text: `${name} ${email} ${phone} ${message}`
  };

  try {
    // send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
}

module.exports = {
  Message,
  sendEmail
};
 