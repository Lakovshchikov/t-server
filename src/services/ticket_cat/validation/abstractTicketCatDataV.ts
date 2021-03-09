import { TTicketCatData, ETicketCatTypes } from '@services/ticket_cat/types';
import {
    IsNumber, IsString, IsUUID, MaxLength, MinLength
} from 'class-validator';
import { IsInEnum } from 'validation/dist';

export abstract class AbstractTicketCatDataV implements TTicketCatData {
    @IsUUID()
    id: string;

    @IsUUID()
    id_d?: string;

    @IsString()
    @MaxLength(150, {
        message: 'Message is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Message is too short. Min length is $constraint1 characters.'
    })
    description?: string | null;

    @IsNumber()
    price?: number;

    @IsNumber()
    @IsInEnum(ETicketCatTypes)
    type?: ETicketCatTypes;

    @IsNumber()
    count?: number;

    @IsString()
    @MaxLength(100, {
        message: 'Name is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Name is too short. Min length is $constraint1 characters.'
    })
    name?: string;
}
