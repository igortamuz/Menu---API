import { ApplicationError } from '../models';

export function emailIsAlReadyRegistered(): ApplicationError {
  return {
    name: 'emailIsAlReadyRegistered',
    message: 'Email is already registered!',
  };
};

