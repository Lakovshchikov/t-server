import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { Date } from '@services/date/date';
import { PricePolicy } from '@services/price_policy/price_policy';

@Entity({ name: 'member' })
export class TicketCat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_d: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'money' })
    money: string;

    @Column({ type: 'smallint' })
    type: number;

    @Column({ type: 'integer' })
    count: number;

    @ManyToOne(() => Date, date => date.ticket_categories)
    @JoinColumn({ name: 'id' })
    date: Date;

    @OneToMany(() => PricePolicy, price_policy => price_policy.date)
    @JoinColumn({ name: 'id' })
    price_policy: PricePolicy[];
}
