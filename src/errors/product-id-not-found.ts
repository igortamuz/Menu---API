import { ApplicationError } from '../models';

export function productIdNotFound(id: string): ApplicationError {
  return {
    name: 'productIdNotFound',
    message: `Product id not found: ${id}!`,
  };
}
