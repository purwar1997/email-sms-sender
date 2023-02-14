import twilio from 'twilio';
import config from './config.js';

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

export default client;
