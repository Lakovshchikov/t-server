import { TPromoCodeData, EPromoCodeTypes } from '@services/promocode/types';
import {
    IsString, IsDefined, MaxLength, MinLength, IsUUID, IsDateString, IsNumber, Min, Max
} from 'class-validator';
import { IsInEnum } from 'validation/dist';

export abstract class AbstractPCDataV implements TPromoCodeData {
    @IsUUID()
    id:string;

    @IsDefined()
    @IsString()
    @MaxLength(30, {
        message: 'Code is too long. Max length is $constraint1 characters.'
    })
    @MinLength(4, {
        message: 'Code is too short. Min length is $constraint1 characters.'
    })
    code: string;

    @IsUUID()
    id_cat: string;

    @IsDateString()
    date: string;

    @IsNumber()
    @IsInEnum(EPromoCodeTypes)
    type: EPromoCodeTypes;

    @IsNumber()
    @Min(1, {
        message: 'Count is too small. Min value is $constraint1.'
    })
    @Max(100000, {
        message: 'Count is too big. Max value is $constraint1.'
    })
    count: number;

    @IsNumber()
    @Min(1, {
        message: 'discount is too small. Min value is $constraint1.'
    })
    @Max(1000000, {
        message: 'discount is too big. Max value is $constraint1.'
    })
    discount: number;
}
