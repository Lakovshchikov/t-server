import {
    Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, OneToOne
} from 'typeorm';
import { Event } from '@services/event/event';
import { AppReg } from '@services/app_reg/app_reg';
import crypto from 'crypto';
import { validate, ValidationError } from 'class-validator';
import { setDefaultValue } from 'setters/dist';
import {
    IOrganization, EOrgForm, ETaxSystem, EReason, ECountry,
    TOrgReqData
} from './orgTypes';

@Entity({ name: 'organization' })
export class Organization implements IOrganization {
    constructor(data: TOrgReqData | null) {
        if (data) this.setProperties(data);
    }

    static getHashPass(pass: string): string {
        return crypto.pbkdf2Sync(pass, process.env.PASS_HASH_KEY,
            1000, 64, 'sha512').toString('hex');
    }

    static validate = function (data: TOrgReqData): Promise<ValidationError[]> {
        return validate(data, { skipMissingProperties: true })
            .then((errors: ValidationError[]) => errors);
    };

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'character varying', length: 100 })
    email: string;

    @Column({ type: 'text' })
    pass: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'smallint' })
    org_form: EOrgForm;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'character varying', length: 15 })
    reg_num: string;

    @Column({ type: 'character varying', length: 15 })
    taxpayer_id: string;

    @Column({ type: 'character varying', length: 50, nullable: true })
    kpp: string | null;

    @Column({ type: 'character varying', length: 50 })
    country: ECountry;

    @Column({ type: 'smallint' })
    tax_system: ETaxSystem;

    @Column({ type: 'boolean', nullable: true })
    vat_ticket: boolean | null;

    @Column({ type: 'character varying', length: 10 })
    bank_id: string;

    @Column({ type: 'character varying', length: 20 })
    checking_acс: string;

    @Column({ type: 'character varying', length: 20 })
    corresp_acc: string;

    @Column({ type: 'text' })
    fio_sign: string;

    @Column({ type: 'text' })
    bank_name: string;

    @Column({ type: 'text' })
    position: string;

    @Column({ type: 'smallint' })
    reason: EReason;

    @OneToMany(() => Event, event => event.org)
    @JoinColumn({ name: 'id' })
    events: Event[];

    @OneToOne(() => AppReg, app_reg => app_reg.org)
    @JoinColumn({ name: 'id', referencedColumnName: 'id_org' })
    app_reg: AppReg;

    validPass = function (pass: string): boolean {
        let hash = Organization.getHashPass(pass);
        return hash === this.pass;
    };

    setProperties = (data: TOrgReqData | null) => {
        this.email = data.email;
        this.pass = data.pass ? Organization.getHashPass(data.pass) : this.pass;
        this.name = setDefaultValue(data.name, this.name);
        this.org_form = setDefaultValue(data.org_form, this.org_form);
        this.address = setDefaultValue(data.address, this.address);
        this.reg_num = setDefaultValue(data.reg_num, this.reg_num);
        this.taxpayer_id = setDefaultValue(data.taxpayer_id, this.taxpayer_id);
        this.kpp = setDefaultValue(data.kpp, this.kpp);
        this.country = ECountry.RUSSIA;
        this.tax_system = setDefaultValue(data.tax_system, this.tax_system);
        this.vat_ticket = setDefaultValue(data.vat_ticket, this.vat_ticket, null);
        this.bank_id = setDefaultValue(data.bank_id, this.bank_id);
        this.checking_acс = setDefaultValue(data.checking_acс, this.checking_acс);
        this.corresp_acc = setDefaultValue(data.corresp_acc, this.corresp_acc);
        this.fio_sign = setDefaultValue(data.fio_sign, this.fio_sign);
        this.bank_name = setDefaultValue(data.bank_name, this.bank_name);
        this.position = setDefaultValue(data.position, this.position);
        this.reason = setDefaultValue(data.reason, this.reason);
    };
}
