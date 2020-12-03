export enum EOrgForm {
    OOO = 1,
    IP = 2
}

export enum ETaxSystem {
    common = 1,
    simplified= 2
}

export interface IOrganization {

    id: string;

    email: string;

    pass: string;

    org_form: number;

    address: string;

    reg_num: string;

    taxpayer_id: string;

    kpp: string;

    country: string;

    tax_system: number;

    vat_ticket: boolean;

    bank_id: string;

    checking_acс: string;

    corresp_acc: string;

    fio_sign: string;

    bank_name: string;

    position: string;

    reason: string;
}
