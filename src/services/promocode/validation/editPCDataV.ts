import { AbstractPCDataV } from '@services/promocode/validation/abstractPCDataV';
import {
    IsDefined,
    IsOptional
} from 'class-validator';
import { EPromoCodeTypes } from '@services/promocode/types';

export class EditPCDataV extends AbstractPCDataV {
    @IsDefined()
    id: string;

    @IsOptional()
    code: string;

    @IsOptional()
    id_cat: string;

    @IsOptional()
    date: string;

    @IsOptional()
    type: EPromoCodeTypes;

    @IsOptional()
    count: number;

    @IsOptional()
    discount: number;
}
