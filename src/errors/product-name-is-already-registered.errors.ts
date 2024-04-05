import { ApplicationError } from '../models';

export function productNameIsAlReadyRegistered(): ApplicationError {
  return {
    name: 'productNameIsAlReadyRegistered',
    message: 'Product name is already registered!',
  };
};

