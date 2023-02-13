import express from 'express';
import cors from 'cors';
import router from './controller.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(router);

export default app;
