import { TPricePolicyData } from '@services/price_policy/types';
import {
    IsNumber, IsUUID, IsPositive, Min, Max
} from 'class-validator';

export abstract class AbstractPPDataV implements TPricePolicyData {
    @IsUUID()
    id_cat: string;

    @IsNumber()
    @Min(1, {
        message: 'Days is too small. Min value is $constraint1.'
    })
    @Max(180, {
        message: 'Days is too big. Max value is $constraint1.'
    })
    days: number;

    @IsNumber()
    @Min(0, {
        message: 'Percent is too small. Min value is $constraint1.'
    })
    @Max(100, {
        message: 'Percent is too big. Max value is $constraint1.'
    })
    percent: number;
}
