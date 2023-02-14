import express from 'express';
import transporter from './config/transporter.config.js';
import client from './config/twilio.config.js';
import config from './config/config.js';

const router = express.Router();

router.post('/api/sendMessage', async (req, res) => {
  try {
    const { message, email, phoneNo } = req.body;

    if (!(message && email && phoneNo)) {
      throw new Error('Please enter all the details');
    }

    await transporter.sendMail({
      from: config.SMTP_SENDER_EMAIL,
      to: email,
      subject: 'Email testing',
      html: `<p style='font-size:20px; font-family:Segoe UI'>${message}</p>`,
    });

    await client.messages.create({
      body: message,
      from: '+16283457614',
      to: '+91' + phoneNo,
    });

    res.status(200).json({
      success: true,
      message: 'Email and SMS sent successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
