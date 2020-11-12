import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany
} from 'typeorm';
import { Event } from '@services/event/event';
import { Location } from '@services/location/location';
import { Member } from '@services/member/member';
import { TicketCat } from '@services/ticket_cat/ticketCat';

@Entity({ name: 'date' })
export class Date {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_ev: string;

    @Column({ type: 'uuid' })
    id_loc: string;

    @Column({ type: 'uuid' })
    id_sh: string;

    @Column({ type: 'timestamp with time zone' })
    date: string;

    @ManyToOne(() => Event, event => event.comments)
    @JoinColumn({ name: 'id' })
    event: Event;

    @OneToOne(() => Location, location => location.date)
    @JoinColumn([
        { name: 'id_loc' },
        { name: 'id_ch' }
    ])
    loc: Location;

    @OneToMany(() => Member, event => event.date)
    @JoinColumn({ name: 'id' })
    members: Member[];

    @OneToMany(() => TicketCat, ticket_cat => ticket_cat.date)
    @JoinColumn({ name: 'id' })
    ticket_categories: TicketCat[];
}
