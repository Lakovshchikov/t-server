import { validate, ValidationError } from 'class-validator';
import { TUserReqData } from '../userTypes';

export * from './abstractUserDataV';
export * from './newUserDataV';
export * from './userDataV';

export default function (data: TUserReqData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
