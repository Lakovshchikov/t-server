import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Event } from '@services/event/event';

@Entity({ name: 'component' })
export class Component {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_ev: string;

    @Column({ type: 'jsonb' })
    settings: {};

    @Column({ type: 'jsonb' })
    content: {};

    @ManyToOne(() => Event, event => event.comments)
    @JoinColumn({ name: 'id' })
    event: Event;
}
