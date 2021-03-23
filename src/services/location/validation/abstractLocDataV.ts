import { TLocationData } from '@services/location/types';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export abstract class AbstractLocDataV implements TLocationData {
    @IsUUID()
    id: string;

    @IsUUID()
    id_sh: string;

    @IsString()
    @MaxLength(50, {
        message: 'Name is too long. Max length is $constraint1 characters.'
    })
    @MinLength(4, {
        message: 'Name is too short. Min length is $constraint1 characters.'
    })
    name: string;

    @IsString()
    @MaxLength(200, {
        message: 'Description is too long. Max length is $constraint1 characters.'
    })
    @MinLength(4, {
        message: 'Description is too short. Min length is $constraint1 characters.'
    })
    description: string;

    @IsString()
    @MaxLength(500, {
        message: 'Address is too long. Max length is $constraint1 characters.'
    })
    @MinLength(4, {
        message: 'Address is too short. Min length is $constraint1 characters.'
    })
    address: string;
}
