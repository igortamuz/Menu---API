import { ApplicationError } from '../models';

export function invalidCategory(): ApplicationError {
  return {
    name: 'invalidCategory',
    message: 'Invalid category(ies)!',
  };
}
