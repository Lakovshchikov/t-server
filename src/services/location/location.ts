import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne, OneToMany
} from 'typeorm';
import { EventDate } from '@services/date/';
import { Scheme } from '@services/scheme/';
import { TLocationData, ILocation } from '@services/location/types';
import { classToPlain, Exclude } from 'class-transformer';
import { setDefaultValue } from 'setters/dist';

@Entity({ name: 'location' })
export class Location implements ILocation {
    constructor(data: TLocationData) {
        if (data) this.setProperties(data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_sh: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @OneToMany(() => Scheme, app_edit => app_edit.loc)
    @JoinColumn({ name: 'id_sh', referencedColumnName: 'id' })
    @Exclude()
    schemes: Scheme[];

    @OneToOne(() => EventDate, date => date.loc)
    @JoinColumn([
        { name: 'id', referencedColumnName: 'id_loc' },
        { name: 'id_sh', referencedColumnName: 'id_sh' }
    ])
    @Exclude()
    date: Date;

    @Exclude()
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude()
    setProperties(data: TLocationData): void {
        this.id = setDefaultValue(data.id, this.id);
        this.id_sh = setDefaultValue(data.id_sh, this.id_sh);
        this.name = setDefaultValue(data.name, this.name);
        this.address = setDefaultValue(data.address, this.address);
        this.description = setDefaultValue(data.description, this.description);
    }
}
