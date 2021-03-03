import { IsUUID, IsDefined, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InfoDataValidation } from '@services/comment/validation/infoDataValidation';
import { TCommentReqData } from '../commentTypes';

export class PredictDataV implements TCommentReqData {
    @IsDefined()
    @IsUUID('all')
    @IsString()
    id_ev: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => InfoDataValidation)
    info: InfoDataValidation;
}
