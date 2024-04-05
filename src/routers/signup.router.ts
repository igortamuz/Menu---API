import express from 'express';
import { UserController } from '../controllers';

const signUpRouter = express.Router();

signUpRouter
    .post('/', UserController.createUser);

export { signUpRouter };
