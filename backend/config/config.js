import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 4000,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_SENDER_EMAIL: process.env.SMTP_SENDER_EMAIL,
  INFOBIP_API_KEY: process.env.INFOBIP_API_KEY,
  INFOBIP_API_BASE_URL: process.env.INFOBIP_API_BASE_URL,
};

export default config;
