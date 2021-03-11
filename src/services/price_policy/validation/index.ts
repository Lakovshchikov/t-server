import { TPricePolicyData } from '@services/price_policy/types';
import { validate, ValidationError } from 'class-validator';

export * from './abstractPPDataV';
export * from './editPPDataV';
export * from './editPPsDataV';
export * from './newPPDataV';
export * from './newPPsDataV';

export default function (data: {items: TPricePolicyData[]}): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
