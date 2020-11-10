import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Event } from '@services/event/event';

@Entity({ name: 'app_edit' })
export class AppEdit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_ev: string;

    @Column({ type: 'smallint' })
    type: number;

    @Column({ type: 'text' })
    description: number;

    @ManyToOne(() => Event, event => event.apps_edit)
    @JoinColumn({ name: 'id' })
    event: Event;
}
