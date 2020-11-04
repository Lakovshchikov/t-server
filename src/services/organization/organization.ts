import {
    Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'organization' })
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'character varying', length: 100 })
    email: string;

    @Column({ type: 'text' })
    pass: string;

    @Column({ type: 'smallint' }) // TO DO
    org_form: number;

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

    @Column({ type: 'smallint' }) // TO DO
    tax_system: number;

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
}
