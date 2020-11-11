import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne, OneToMany
} from 'typeorm';
import { Date } from '@services/date/date';
import { Scheme } from '@services/scheme/scheme';

@Entity({ name: 'location' })
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_sh: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => Scheme, app_edit => app_edit.loc)
    @JoinColumn({ name: 'id' })
    schemes: Scheme[];

    @OneToOne(() => Date, date => date.loc)
    @JoinColumn([
        { name: 'id_loc' },
        { name: 'id_ch' }
    ])
    date: Date;
}
