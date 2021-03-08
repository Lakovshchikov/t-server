import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { IMember, TMemberData, EMemberTypes } from '@services/member/memberTypes';
import { EventDate } from '@services/date/date';
import { classToPlain, Exclude } from 'class-transformer';
import { setDefaultValue } from 'setters/dist';

@Entity({ name: 'member' })
export class Member implements IMember {
    constructor(data: TMemberData) {
        if (data) {
            this.setProperties(data);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id_d: string;

    @PrimaryColumn({ type: 'text' })
    name: string;

    @Column({ type: 'smallint' })
    type: EMemberTypes;

    @ManyToOne(() => EventDate, date => date.members)
    @JoinColumn({ name: 'id_d' })
    @Exclude()
    date: EventDate;

    @Exclude()
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude()
    setProperties(data: TMemberData): void {
        if (!this.id_d) this.id_d = data.id_d;
        this.name = setDefaultValue(data.name, this.name);
        this.type = setDefaultValue(data.type, this.type);
    }
}
