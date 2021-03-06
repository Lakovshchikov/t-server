import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from '@services/user/user';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'character varying', length: 100 })
    email: string;

    @Column({ type: 'money' })
    cost: string;

    @Column({ type: 'text' })
    position: string;

    @Column({ name: 'id_cat', type: 'uuid' })
    id_category: string;

    @ManyToOne(() => User, user => user.tickets)
    @JoinColumn({ name: 'email' })
    user: User;
}
