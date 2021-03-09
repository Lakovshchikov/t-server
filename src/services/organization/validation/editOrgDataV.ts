import { AbstractOrgDataV } from '@services/organization/validation/abstractOrgDataV';
import { IsOptional, ValidateIf, isEmpty, IsEmpty } from 'class-validator';
import { EOrgForm, EReason, ETaxSystem } from '@services/organization/types';

export class EditOrgDataV extends AbstractOrgDataV {
    @IsOptional()
    pass: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    name: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    org_form: EOrgForm;

    @IsOptional()
    address: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    reg_num: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    taxpayer_id: string;

    @ValidateIf(value => !isEmpty(value))
    @IsEmpty()
    tax_system: ETaxSystem;

    @IsOptional()
    bank_id: string;

    @IsOptional()
    checking_acс: string;

    @IsOptional()
    corresp_acc: string;

    @IsOptional()
    fio_sign: string;

    @IsOptional()
    bank_name: string;

    @IsOptional()
    position: string;

    @IsOptional()
    reason: EReason;
}
