import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany
} from 'typeorm';
import { Event } from '@services/event/event';
import { Location } from '@services/location/location';
import { Member } from '@services/member/member';
import { TicketCat } from '@services/ticket_cat/ticketCat';
import { classToPlain, Exclude } from 'class-transformer';
import { IEventDate, TDateData } from '@services/date/dateTypes';
import { v4 as uuidv4 } from 'uuid';
import { setDefaultValue } from 'setters/dist';

@Entity({ name: 'date' })
export class EventDate implements IEventDate {
    constructor(data: TDateData) {
        if (data) {
            this.setProperties(data);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_ev: string;

    @Column({ type: 'uuid', nullable: true })
    id_loc: string | null;

    @Column({ type: 'uuid', nullable: true })
    id_sh: string | null;

    @Column({ type: 'timestamp with time zone' })
    date: string;

    @ManyToOne(() => Event, event => event.dates)
    @JoinColumn({ name: 'id_ev' })
    @Exclude()
    event: Event;

    @OneToOne(() => Location, location => location.date)
    @JoinColumn([
        { name: 'id' },
        { name: 'id_ch' }
    ])
    @Exclude()
    loc: Location;

    @OneToMany(() => Member, event => event.date)
    @JoinColumn({ name: 'id' })
    @Exclude()
    members: Member[];

    @OneToMany(() => TicketCat, ticket_cat => ticket_cat.date)
    @JoinColumn({ name: 'id' })
    @Exclude()
    ticket_categories: TicketCat[];

    @Exclude()
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude()
    getDate = (): Date => new Date();

    @Exclude()
    setProperties = (data: TDateData):void => {
        if (!this.id) this.id = uuidv4();
        if (!this.id_ev) this.id_ev = data.id_ev;
        if (!this.id_loc) this.id_loc = data.id_loc;
        if (!this.id_sh) this.id_loc = data.id_sh;
        this.date = setDefaultValue(data.date, this.date, null);
    };
}
