import { Request, Response } from 'express';
import { UserService } from '../services';
import httpStatus from 'http-status';

async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await UserService.createUserService(email, password);
    res.status(httpStatus.CREATED).json({ user });
  } catch (error) {
    if (error.name === 'emailIsAlReadyRegistered') {
      return res.status(httpStatus.CONFLICT).send(error.message);
    };
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  };
};

async function createLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await UserService.createLoginService(email, password);
    res.status(httpStatus.CREATED).json({ token });
  } catch (error) {
    if (error.name === 'emailIsNotRegistered') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    };
    if (error.name === 'incorrectEmailOrPassword') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    };
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  };
};

export const UserController = {
  createUser, createLogin
};
