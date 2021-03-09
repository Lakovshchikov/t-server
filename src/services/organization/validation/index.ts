import { validate, ValidationError } from 'class-validator';
import { TOrgReqData } from '../types';

export * from './abstractOrgDataV';
export * from './editOrgDataV';
export * from './newOrgDataV';
export * from './validation';

export default function (data: TOrgReqData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
