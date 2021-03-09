import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne
} from 'typeorm';
import { TicketCat } from '@services/ticket_cat/ticketCat';

@Entity({ name: 'member' })
export class PricePolicy {
    @PrimaryColumn({ type: 'uuid' })
    id_cat: string;

    @PrimaryColumn({ type: 'smallint' })
    days: number;

    @Column({ type: 'smallint' })
    percent: number;

    @ManyToOne(() => TicketCat, ticket_cat => ticket_cat.price_policy)
    @JoinColumn({ referencedColumnName: 'id', name: '' })
    ticket_cat: TicketCat;
}
