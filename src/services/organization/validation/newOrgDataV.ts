import { IsDefined } from 'class-validator';
import { EOrgForm, EReason, ETaxSystem } from '../types';
import { AbstractOrgDataV } from './abstractOrgDataV';

export class NewOrgDataV extends AbstractOrgDataV {
    @IsDefined()
    pass: string;

    @IsDefined()
    name: string;

    @IsDefined()
    org_form: EOrgForm;

    @IsDefined()
    address: string;

    @IsDefined()
    reg_num: string;

    @IsDefined()
    taxpayer_id: string;

    @IsDefined()
    tax_system: ETaxSystem;

    @IsDefined()
    bank_id: string;

    @IsDefined()
    checking_acс: string;

    @IsDefined()
    corresp_acc: string;

    @IsDefined()
    fio_sign: string;

    @IsDefined()
    bank_name: string;

    @IsDefined()
    position: string;

    @IsDefined()
    reason: EReason;
}
