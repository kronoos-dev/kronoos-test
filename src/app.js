import 'dotenv/config.js';
import express from 'express';

const app = express();

app.listen(process.env.APP_PORT || 3000, () =>
  console.log('SERVER IS RUNNING'),
);
