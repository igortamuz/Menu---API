import { ApplicationError } from '../models';

export function invalidId(id: string): ApplicationError {
  return {
    name: 'invalidId',
    message: `Invalid ID: ${id}!`,
  };
}
