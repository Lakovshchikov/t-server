import {
    Matches, MaxLength, MinLength, IsEmail, IsDefined, IsString, IsOptional, IsNumber, IsBoolean, IsNotEmpty, IsIn,
    registerDecorator, ValidationOptions, ValidationArguments
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
    EOrgForm, EReason, ETaxSystem, TOrgReqData, ECountry
} from '@services/organization/orgTypes';
import {
    IsInEnum, IsOGRN, IsCheckingAccount, IsCorrespondentAccount, IsINN
} from './validation';

export abstract class AbstractOrgDataV implements TOrgReqData {
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
        message: 'Pass is too long. Max length is $constraint1 characters.'
    })
    @MinLength(8, {
        message: 'Pass is too short. Min length is $constraint1 characters.'
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: 'Password is incorrect'
    })
    pass: string;

    @IsString()
    @MaxLength(50, {
        message: 'Name is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Name is too short. Min length is $constraint1 characters.'
    })
    name: string;

    @Transform(value => parseInt(value, 10))
    @IsNumber()
    @IsInEnum(EOrgForm)
    org_form: EOrgForm;

    @IsString()
    @MaxLength(150, {
        message: 'Address is too long. Max length is $constraint1 characters.'
    })
    @MinLength(2, {
        message: 'Address is too short. Min length is $constraint1 characters.'
    })
    address: string;

    @IsString()
    @MaxLength(15, {
        message: 'Primary state registration number is too long. Max length is $constraint1 characters.'
    })
    @MinLength(13, {
        message: 'Primary state registration number is too short. Min length is $constraint1 characters.'
    })
    @IsOGRN({
        message: 'Primary state registration number (OGRN) value is incorrect'
    })
    reg_num: string;

    @IsString()
    @MaxLength(12, {
        message: 'Taxpayer identification number is too long. Max length is $constraint1 characters.'
    })
    @MinLength(10, {
        message: 'Taxpayer identification number is too short. Min length is $constraint1 characters.'
    })
    @IsINN({
        message: 'Taxpayer id (INN) value is incorrect'
    })
    taxpayer_id: string;

    // TO DO обязательность для новых пользователей с org_form=ООО
    @IsOptional()
    @IsString()
    @Matches(/\d{4}[\dA-Z][\dA-Z]\d{3}/, {
        message: 'Registration reason code is incorrect'
    })
    kpp: string | null;

    @IsOptional()
    @IsString()
    @IsInEnum(ECountry, {
        message: 'Country value is incorrect'
    })
    country: ECountry;

    @Transform(value => parseInt(value, 10))
    @IsNumber()
    @IsInEnum(ETaxSystem, {
        message: 'Tax system value is incorrect'
    })
    tax_system: ETaxSystem;

    @IsOptional()
    @Transform((value: string) => value.toLowerCase() === 'true')
    @IsBoolean()
    vat_ticket: boolean | null;

    @IsString()
    @Matches(/^[0-9]{9}$/, {
        message: 'Bank identification code (BIC) is incorrect'
    })
    bank_id: string;

    @IsString()
    @IsCheckingAccount({
        message: 'Checking account is incorrect'
    })
    checking_acс: string;

    @IsString()
    @IsCorrespondentAccount({
        message: 'Correspondent account is incorrect'
    })
    corresp_acc: string;

    @IsString()
    fio_sign: string;

    @IsString()
    bank_name: string;

    @IsString()
    position: string;

    @Transform(value => parseInt(value, 10))
    @IsNumber()
    @IsInEnum(EReason, {
        message: 'Reason value is incorrect'
    })
    reason: EReason;
}
