import {
    Entity, PrimaryColumn, Column, OneToMany, JoinColumn
} from 'typeorm';
import { Ticket } from '@services/ticket/ticket';
import { TConfigNotification, TConfigPermission, TUserReqData, IUser } from '@services/user/userTypes';
import { validate, ValidationError } from 'class-validator';

import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const defaultConfigNotification : TConfigNotification = {
    browser: false,
    email: false,
    phone: false,
    tg: false
};

const defaultConfigPermission: TConfigPermission = {
    email: false,
    phone: false
};

const setNull = function (v: any, currentVal: any | null) {
    let r;
    if (v) {
        r = v;
    } else {
        r = currentVal !== undefined ? currentVal : null;
    }
    return r;
};

const setBool = function (v: any, currentVal: any | null) {
    let r;
    if (v) {
        r = v;
    } else {
        r = currentVal !== undefined ? currentVal : false;
    }
    return r;
};

@Entity({ name: 'user' })
export class User implements IUser {
    constructor(data: TUserReqData | null) {
        if (data) this.setUserProperties(data);
    }

    static getHashPass(pass: string): string {
        return crypto.pbkdf2Sync(pass, process.env.PASS_HASH_KEY,
            1000, 64, 'sha512').toString('hex');
    }

    static validUser = function (data: TUserReqData): Promise<ValidationError[]> {
        return validate(data, { skipMissingProperties: true })
            .then((errors: ValidationError[]) => errors);
    };

    @PrimaryColumn({ type: 'character varying', length: 100 })
    email: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ name: 's_name', type: 'text' })
    second_name: string;

    @Column({ name: 'p_name', type: 'text', nullable: true })
    patr_name: string | null;

    @Column({ type: 'text' })
    pass: string;

    @Column({ name: 'admin', type: 'boolean' })
    isAdmin: boolean;

    @Column({ type: 'character varying', length: 30, nullable: true })
    phone: string | null;

    @Column({ type: 'boolean' })
    temp_pass: boolean;

    @Column({ type: 'jsonb' })
    config_notification: TConfigNotification = defaultConfigNotification;

    @Column({ type: 'jsonb' })
    config_permission: TConfigPermission = defaultConfigPermission;

    @OneToMany(() => Ticket, ticket => ticket.user)
    @JoinColumn({ name: 'id' })
    tickets: Ticket[];

    validPass = function (pass: string): boolean {
        let hash = crypto.pbkdf2Sync(pass, process.env.PASS_HASH_KEY,
            1000, 64, 'sha512').toString('hex');
        return hash === this.pass;
    };

    setUserProperties = function (data: TUserReqData | null) {
        this.email = data.email;
        this.pass = data.pass ? User.getHashPass(data.pass) : this.pass;
        this.name = data.name ? data.name : this.name;
        this.second_name = data.second_name ? data.second_name : this.second_name;
        this.patr_name = setNull(data.part_name, this.part_name);
        this.phone = setNull(data.phone, this.phone);
        this.isAdmin = false;
        this.temp_pass = false;
        this.config_notification = {
            browser: setBool(data.n_browser, this.browser),
            email: setBool(data.n_email, this.email),
            phone: setBool(data.n_phone, this.phone),
            tg: setBool(data.n_tg, this.tg)
        };
        this.config_permission = {
            email: setBool(data.p_email, this.email),
            phone: setBool(data.p_phone, this.phone)
        };
    };
}
