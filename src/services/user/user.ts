import {
    Entity, PrimaryColumn, Column, OneToMany, JoinColumn
} from 'typeorm';
import { Ticket } from '@services/ticket/ticket';
import { TConfigNotification, TConfigPermission, TNewUserReqBody, IUser } from '@services/user/userTypes';
import { validate, ValidationError } from 'class-validator';
import { UserValidator } from '@services/user/userValidator';

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
    constructor(data: UserValidator | null) {
        if (data) {
            this.email = data.email;
            this.pass = User.getHashPass(data.pass);
            this.name = data.name;
            this.second_name = data.second_name;
            this.patr_name = data.part_name ? data.part_name : null;
            this.phone = data.phone ? data.phone : null;
            this.isAdmin = false;
            this.temp_pass = false;
            this.config_notification = {
                browser: data.n_browser || false,
                email: data.n_email || false,
                phone: data.n_phone || false,
                tg: data.n_tg || false
            };
            this.config_permission = {
                email: data.p_email || false,
                phone: data.p_phone || false
            };
        }
    }

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

    static getHashPass(pass: string): string {
        return crypto.pbkdf2Sync(pass, process.env.PASS_HASH_KEY,
            1000, 64, 'sha512').toString('hex');
    }

    static validUser = function (data: TNewUserReqBody): Promise<ValidationError[]> {
        return validate(data, { skipMissingProperties: true })
            .then((errors: ValidationError[]) => errors);
    };
}
