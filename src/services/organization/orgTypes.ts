export enum EOrgForm {
    OOO = 1,
    IP = 2
}

export enum ETaxSystem {
    common = 1,
    simplified = 2
}

export enum EReason {
    CHARTER = 1,
    POA = 2
}

export enum ECountry {
    RUSSIA = 'Russia'
}

export type TOrgReqData = {
    email: string,
    pass?: string,
    name?: string,
    org_form?: EOrgForm,
    address?: string,
    reg_num?: string,
    taxpayer_id?: string,
    kpp?: string,
    country? :ECountry,
    tax_system?: ETaxSystem,
    vat_ticket?: boolean,
    bank_id?:string,
    checking_acс?: string;
    corresp_acc?: string;
    fio_sign?: string;
    bank_name?: string;
    position?: string;
    reason?: EReason;
};

export interface IOrganization {

    id: string;

    email: string;

    pass: string;

    name: string;

    org_form: EOrgForm;

    address: string;

    reg_num: string;

    taxpayer_id: string;

    kpp: string | null;

    country: ECountry;

    tax_system: ETaxSystem;

    vat_ticket: boolean | null;

    bank_id: string;

    checking_acс: string;

    corresp_acc: string;

    fio_sign: string;

    bank_name: string;

    position: string;

    reason: EReason;
}
