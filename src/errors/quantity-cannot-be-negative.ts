import { ApplicationError } from '../models';

export function quantityCannotBeNegative(): ApplicationError {
    return {
        name: 'quantityCannotBeNegative',
        message: 'Quantity cannot be negative!',
    };
}
