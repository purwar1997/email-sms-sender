import express from 'express';
import axios from 'axios';
import transporter from './config/transporter.config.js';
import config from './config/config.js';

const router = express.Router();

router.post('/api/sendData', async (req, res) => {
  try {
    const { name, email, phoneNo } = req.body;
    console.log(789);

    if (!(name && email && phoneNo)) {
      throw new Error('Please enter all the details');
    }

    await transporter.sendMail({
      from: config.SMTP_SENDER_EMAIL,
      to: email,
      subject: 'Email testing',
      text: `Hey ${name}, welcome to our service.`,
    });

    res.status(200).json({
      success: true,
      message: 'Email and SMS successfully sent',
      data: res.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
