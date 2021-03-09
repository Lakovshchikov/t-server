import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne, OneToMany
} from 'typeorm';
import { TicketCat } from '@services/ticket_cat/ticketCat';

@Entity({ name: 'promocode' })
export class Promocode {
    @PrimaryColumn({ type: 'character varying', length: 20 })
    code: string;

    @PrimaryColumn({ type: 'uuid' })
    id_cat: string;

    @Column({ type: 'timestamp with time zone' })
    date: string;

    @Column({ type: 'integer' })
    count: number;

    @Column({ type: 'integer' })
    discount: number;

    @Column({ type: 'smallint' })
    type: number;

    @ManyToOne(() => TicketCat, ticket_cat => ticket_cat.promocodes)
    @JoinColumn({ name: 'id_cat' })
    ticket_cat: TicketCat;
}
