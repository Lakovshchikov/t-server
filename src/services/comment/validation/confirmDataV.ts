import { IsDefined, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TConfirmCommentReqData } from '../types';
import { ConfirmCommentDataV } from './confirmCommentDataV';

export class ConfirmDataV implements TConfirmCommentReqData {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => ConfirmCommentDataV)
    comments: ConfirmCommentDataV[];
}
