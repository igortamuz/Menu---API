import express from 'express';
import { UserController } from '../controllers';

const loginRouter = express.Router();

loginRouter
    .post('/login', UserController.createLogin);

export { loginRouter };
