import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne
} from 'typeorm';
import { EventDate } from '@services/date/date';

@Entity({ name: 'member' })
export class Member {
    @PrimaryColumn({ type: 'uuid' })
    id_d: string;

    @PrimaryColumn({ type: 'text' })
    fio: string;

    @Column({ type: 'smallint' })
    type: number;

    @ManyToOne(() => EventDate, date => date.members)
    @JoinColumn({ name: 'id' })
    date: Date;
}
