import { validate, ValidationError } from 'class-validator';
import { TCommentReqData, TConfirmCommentReqData } from '@services/comment/types';

export * from './confirmCommentDataV';
export * from './commentDataV';
export * from './confirmDataV';
export * from './infoDataValidation';
export * from './predictDataV';

export default function (data: TCommentReqData | TConfirmCommentReqData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
