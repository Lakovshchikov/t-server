import { AbstractPPDataV } from '@services/price_policy/validation/abstractPPDataV';
import { IsDefined } from 'class-validator';

export class NewPPDataV extends AbstractPPDataV {
    @IsDefined()
    id_cat: string;

    @IsDefined()
    days:number;

    @IsDefined()
    percent: number;
}
