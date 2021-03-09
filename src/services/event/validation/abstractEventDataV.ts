import { TEventData, ETypesEvent } from '@services/event/types';
import {
    IsNumber, IsString, Min, Max, IsUUID, MaxLength, MinLength, IsOptional, IsBoolean
} from 'class-validator';
import { IsInEnum } from 'validation/dist';
import { Transform } from 'class-transformer';

export abstract class AbstractEventDataV implements TEventData {
    @IsUUID()
    id: string;

    @IsString()
    add_restr: string;

    @Min(0)
    @Max(21)
    @Transform((value: string) => Number(value))
    age_restr: number;

    @IsInEnum(ETypesEvent)
    category: number;

    @IsUUID()
    id_org: string;

    @IsString()
    @MaxLength(100, {
        message: 'Second name is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Second name is too short. Min length is $constraint1 characters.'
    })
    name: string;

    @IsBoolean()
    public: boolean;
}
