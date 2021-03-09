import { IsDefined, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CommentDataV } from '@services/comment/validation/commentDataV';
import { TReqInfo } from '../types';

export class InfoDataValidation implements TReqInfo {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => CommentDataV)
    comments: CommentDataV[];
}
