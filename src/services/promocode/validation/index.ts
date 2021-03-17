import { TPromoCodeData } from '@services/promocode/types';
import { validate, ValidationError } from 'class-validator';

export * from './abstractPCDataV';
export * from './editPCDataV';
export * from './editPCsDataV';
export * from './newPCDataV';
export * from './newPCsDataV';

export default function (data: {items: TPromoCodeData[]}): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
