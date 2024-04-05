import { ApplicationError } from '../models';

export function categoryNameDoesNotExistInThisID(): ApplicationError {
  return {
    name: 'categoryNameDoesNotExistInThisID',
    message: 'Category Name does not exist in this ID!',
  };
};

