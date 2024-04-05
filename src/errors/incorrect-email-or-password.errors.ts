import { ApplicationError } from '../models';

export function incorrectEmailOrPassword(): ApplicationError {
  return {
    name: 'incorrectEmailOrPassword',
    message: 'Incorrect email or password!',
  };
}
