import {
    Matches, MaxLength, MinLength, IsEmail, IsDefined, IsString, IsOptional, IsPhoneNumber, IsBoolean, IsNotEmpty
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TUserReqData } from '../userTypes';

export abstract class AbstractUserDataV implements TUserReqData {
    @IsDefined()
    @IsEmail()
    @MaxLength(100, {
        message: 'Email is too long. Max length is $constraint1 characters.'
    })
    @MinLength(8, {
        message: 'Email is too short. Min length is $constraint1 characters.'
    })
    email: string;

    @IsString()
    @MaxLength(50, {
        message: 'Name is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Name is too short. Min length is $constraint1 characters.'
    })
    name: string;

    @IsString()
    @MaxLength(50, {
        message: 'Second name is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Second name is too short. Min length is $constraint1 characters.'
    })
    second_name: string;

    @IsOptional()
    patr_name: string | null;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('RU')
    phone: string | null;

    // @IsDefined()
    @IsString()
    @MaxLength(50, {
        message: 'Pass is too long. Max length is $constraint1 characters.'
    })
    @MinLength(8, {
        message: 'Pass is too short. Min length is $constraint1 characters.'
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: 'Password is incorrect'
    })
    pass: string;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    @IsBoolean()
    n_browser: boolean | null;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    n_email: boolean | null;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    n_phone: boolean | null;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    n_tg: boolean | null;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    p_email: boolean | null;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    p_phone: boolean | null;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    part_name: string | null;
}
