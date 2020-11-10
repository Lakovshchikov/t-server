import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Event } from '@services/event/event';

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

    @ManyToOne(() => Event, event => event.comments)
    @JoinColumn({ name: 'id' })
    event: Event;
}
