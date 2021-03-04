import { AbstractAppRegDataV } from '@services/app_reg/validation/abstractAppRegDataV';
import {
    IsEmpty, isEmpty, ValidateIf
} from 'class-validator';

export class NewAppRegDataV implements AbstractAppRegDataV {
    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    id: string;

    id_org: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    doc_id: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    desc: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    status: number;
}
