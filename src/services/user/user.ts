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

@Entity({ name: 'user' })
export class User implements IUser {
    constructor(data: TUserReqData | null) {
        if (data) this.setProperties(data);
    }

    static getHashPass = function (pass: string): string {
        return crypto.pbkdf2Sync(pass, process.env.PASS_HASH_KEY,
            1000, 64, 'sha512').toString('hex');
    };

    static validate = function (data: TUserReqData): Promise<ValidationError[]> {
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
    part_name: string | null;

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
        let hash = User.getHashPass(pass);
        return hash === this.pass;
    };

    setProperties = (data: TUserReqData | null) => {
        this.email = data.email;
        this.pass = data.pass ? User.getHashPass(data.pass) : this.pass;
        this.name = data.name ? data.name : this.name;
        this.second_name = data.second_name ? data.second_name : this.second_name;
        this.part_name = this.setNull(data.part_name, this.part_name);
        this.phone = this.setNull(data.phone, this.phone);
        this.isAdmin = false;
        this.temp_pass = false;
        this.config_notification = {
            browser: this.setBool(data.n_browser, this.config_notification?.browser),
            email: this.setBool(data.n_email, this.config_notification?.email),
            phone: this.setBool(data.n_phone, this.config_notification?.phone),
            tg: this.setBool(data.n_tg, this.config_notification?.tg)
        };
        this.config_permission = {
            email: this.setBool(data.p_email, this.config_permission?.email),
            phone: this.setBool(data.p_phone, this.config_permission?.phone)
        };
    };

    private setNull = (value: any, currentVal: any | null) => {
        let result;
        if (value) {
            result = value;
        } else {
            result = currentVal !== undefined ? currentVal : null;
        }
        return result;
    };

    private setBool = (value: any, currentVal: any | null) => {
        let result;
        if (value) {
            result = value;
        } else {
            result = currentVal !== undefined ? currentVal : false;
        }
        return result;
    };
}
