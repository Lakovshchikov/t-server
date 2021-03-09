import { validate, ValidationError } from 'class-validator';
import { TTicketCatData } from '@services/ticket_cat/types';

export * from './abstractTicketCatDataV';
export * from './editTicketCatDataV';
export * from './editTicketCatsDataV';
export * from './newTicketCatDataV';
export * from './newTicketCatsDataV';

export default function (data: {items: TTicketCatData[]}): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
