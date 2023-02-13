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

    // await transporter.sendMail({
    //   from: config.SMTP_SENDER_EMAIL,
    //   to: email,
    //   subject: 'Email testing',
    //   text: `Hey ${name}, welcome to our service.`,
    // });

    const url = `${config.INFOBIP_API_BASE_URL}/sms/2/text/advanced`;

    const body = JSON.stringify({
      messages: [
        {
          from: 'InfoSMS',
          destinations: [
            {
              to: '91' + phoneNo,
            },
          ],
          text: `Hey ${name}, welcome to our service.`,
        },
      ],
    });

    const headers = {
      Authorization: `App ${config.INFOBIP_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(url, body, { headers });
    console.log(response.data.messages);

    res.status(200).json({
      success: true,
      message: 'Email and SMS successfully sent',
      data: res.data,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response?.data?.requestError?.serviceException?.validationErrors);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
