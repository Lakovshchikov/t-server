import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Event } from '@services/event/event';

@Entity({ name: 'comment' })
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_ev: string;

    @Column({ type: 'jsonb' })
    info: {};

    @Column({ type: 'text' })
    content: number;

    @ManyToOne(() => Event, event => event.comments)
    @JoinColumn({ name: 'id' })
    event: Event;
}
