import { AbstractAppRegDataV } from '@services/app_reg/validation/abstractAppRegDataV';
import { IsDefined, IsOptional } from 'class-validator';

export class EditAppRegDataV implements AbstractAppRegDataV {
    @IsDefined()
    id: string;

    @IsOptional()
    id_org: string;

    @IsOptional()
    doc_id: string;

    @IsOptional()
    desc: string;

    @IsDefined()
    status: number;
}
