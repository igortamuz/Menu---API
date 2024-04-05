import { ApplicationError } from '../models';

export function categoryIdDoesNotExist(id: string): ApplicationError {
  return {
    name: 'CategoryIdDoesNotExist',
    message: 'Category id does not exist!',
  };
};

