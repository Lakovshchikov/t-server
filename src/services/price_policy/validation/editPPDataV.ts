import { AbstractPPDataV } from '@services/price_policy/validation/';
import { IsDefined, IsOptional } from 'class-validator';

export class EditPPDataV extends AbstractPPDataV {
    @IsDefined()
    id_cat: string;

    @IsDefined()
    days: number;

    @IsOptional()
    percent: number;
}
