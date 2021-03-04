import { TAppRegReqData, EStatus } from '@services/app_reg/arTypes';
import { IsDefined, IsString } from 'class-validator';
import { IsInEnum } from 'validation/dist';

export abstract class AbstractAppRegDataV implements TAppRegReqData {
    @IsString()
    id?: string;

    @IsDefined()
    @IsString()
    id_org: string;

    @IsString()
    doc_id?: string;

    @IsString()
    @IsInEnum(EStatus)
    status?: number;

    @IsString()
    desc?: string;
}
