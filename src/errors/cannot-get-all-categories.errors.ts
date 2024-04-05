import { ApplicationError } from '../models';

export function cannotGetAllCategories(): ApplicationError {
  return {
    name: 'cannotGetAllCategories',
    message: 'Cannot get categories!',
  };
}
