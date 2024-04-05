import { ApplicationError } from '../models';

export function categoryNameDoesNotExist(): ApplicationError {
  return {
    name: 'categoryNameDoesNotExist',
    message: 'Category Name does not exist!',
  };
};

