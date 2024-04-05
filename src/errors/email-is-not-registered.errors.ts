import { ApplicationError } from '../models';

export function emailIsNotRegistered(): ApplicationError {
  return {
    name: 'emailIsNotRegistered',
    message: 'Email is not registered!',
  };
}
