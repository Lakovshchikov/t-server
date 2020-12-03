import {
    Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, OneToOne
} from 'typeorm';
import { Event } from '@services/event/event';
import { AppReg } from '@services/app_reg/app_reg';
import crypto from 'crypto';
import { IOrganization, EOrgForm, ETaxSystem } from './orgTypes';

@Entity({ name: 'organization' })
export class Organization implements IOrganization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'character varying', length: 100 })
    email: string;

    @Column({ type: 'text' })
    pass: string;

    @Column({ type: 'smallint' })
    org_form: ETaxSystem;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'character varying', length: 15 })
    reg_num: string;

    @Column({ type: 'character varying', length: 15 })
    taxpayer_id: string;

    @Column({ type: 'character varying', length: 50 })
    kpp: string;

    @Column({ type: 'character varying', length: 50 })
    country: string;

    @Column({ type: 'smallint' })
    tax_system: EOrgForm;

    @Column({ type: 'boolean' })
    vat_ticket: boolean;

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

    @Column({ type: 'text' })
    reason: string;

    @OneToMany(() => Event, event => event.org)
    @JoinColumn({ name: 'id' })
    events: Event[];

    @OneToOne(() => AppReg, app_reg => app_reg.org)
    @JoinColumn({ name: 'id' })
    app_reg: AppReg;

    validPass = function (pass: string): boolean {
        let hash = crypto.pbkdf2Sync(pass, process.env.PASS_HASH_KEY,
            1000, 64, 'sha512').toString('hex');
        return hash === this.pass;
    };
}
