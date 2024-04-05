import { ApplicationError } from '../models';

export function categoryParentDoesNotExistInThisID(): ApplicationError {
  return {
    name: 'categoryParentDoesNotExistInThisID',
    message: 'Category parent does not exist in this id!',
  };
};

