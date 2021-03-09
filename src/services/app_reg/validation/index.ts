import { validate, ValidationError } from 'class-validator';
import { TAppRegReqData } from '@services/app_reg/types';

export * from './editAppRegDataV';
export * from './abstractAppRegDataV';
export * from './newAppRegDataV';

export default function (data: TAppRegReqData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
