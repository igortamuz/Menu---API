import { ApplicationError } from '../models';

export function cannotGetAllProducts(): ApplicationError {
  return {
    name: 'cannotGetAllProducts',
    message: 'Cannot get products!',
  };
}
