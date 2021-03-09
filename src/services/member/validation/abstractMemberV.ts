import { EMemberTypes, TMemberData } from '@services/member/types';
import {
    IsNumber, IsString, IsUUID, MaxLength, MinLength
} from 'class-validator';
import { IsInEnum } from 'validation/dist';

export class AbstractMemberV implements TMemberData {
    @IsUUID()
    id_d: string;

    @IsString()
    @MaxLength(150, {
        message: 'Address is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Address is too short. Min length is $constraint1 characters.'
    })
    name: string;

    @IsNumber()
    @IsInEnum(EMemberTypes)
    type: EMemberTypes;
}
