import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { EventDate } from '@services/date/date';
import { PricePolicy } from '@services/price_policy/price_policy';
import { Promocode } from '@services/promocode/promocode';

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

    @ManyToOne(() => EventDate, date => date.ticket_categories)
    @JoinColumn({ name: 'id' })
    date: Date;

    @OneToMany(() => PricePolicy, price_policy => price_policy.date)
    @JoinColumn({ name: 'id' })
    price_policy: PricePolicy[];

    @ManyToOne(() => Promocode, promocode => promocode.ticket_cat)
    @JoinColumn({ name: 'id' })
    promocodes: Promocode[];
}
