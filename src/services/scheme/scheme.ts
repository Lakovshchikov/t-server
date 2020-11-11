import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Location } from '@services/location/location';

@Entity({ name: 'scheme' })
export class Scheme {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb' })
    config: {};

    @ManyToOne(() => Location, loc => loc.schemes)
    @JoinColumn({ name: 'id' })
    loc: Location;
}
