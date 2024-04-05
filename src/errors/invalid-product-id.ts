import { ApplicationError } from '../models';

export function invalidProductId(id: string): ApplicationError {
  return {
    name: 'invalidProductId',
    message: `Invalid Product ID: ${id}!`,
  };
}
