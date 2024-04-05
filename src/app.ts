import express from 'express';
import dotenv from 'dotenv';
import { loginRouter, categoryRouter, productRouter, signUpRouter } from './routers';
import { connect } from './db/db';

dotenv.config();

const app = express();
app.use(express.json())
    .get('/status', (_req, res) => res.send('OK!'))
    .use('/signUp', signUpRouter)
    .use('/auth', loginRouter)
    .use('/category', categoryRouter)
    .use('/product', productRouter);

connect();

export default app;
