import { validate, ValidationError } from 'class-validator';
import { TDateData } from '@services/date/dateTypes';

export * from './abstractDateV';
export * from './newDateV';
export * from './editDateV';

export default function (data: TDateData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
