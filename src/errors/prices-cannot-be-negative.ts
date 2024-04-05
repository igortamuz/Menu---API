import { ApplicationError } from '../models';

export function pricesCannotBeNegative(): ApplicationError {
    return {
        name: 'pricesCannotBeNegative',
        message: 'Prices cannot be negative!',
    };
}
