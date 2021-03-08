import { TEventData } from '@services/event/eventTypes';
import { validate, ValidationError } from 'class-validator';

export * from './newEventDataV';
export * from './updateEventDataV';

export default function (data: TEventData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
