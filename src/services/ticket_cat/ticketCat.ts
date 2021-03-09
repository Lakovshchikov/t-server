import {
    Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { EventDate } from '@services/date/date';
import { PricePolicy } from '@services/price_policy/price_policy';
import { Promocode } from '@services/promocode/promocode';
import { ITicketCat, TTicketCatData, ETicketCatTypes } from '@services/ticket_cat/types';
import { Exclude, classToPlain } from 'class-transformer';
import { setDefaultValue } from 'setters/dist';

@Entity({ name: 'ticket_cat' })
export class TicketCat implements ITicketCat {
    constructor(data: TTicketCatData) {
        if (data) this.setProperties(data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_d: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'money' })
    price: number;

    @Column({ type: 'smallint' })
    type: ETicketCatTypes;

    @Column({ type: 'integer' })
    count: number;

    @Column({ type: 'text' })
    name: string;

    @ManyToOne(() => EventDate, date => date.ticket_categories)
    @JoinColumn({ name: 'id_d' })
    @Exclude()
    date: Date;

    @OneToMany(() => PricePolicy, price_policy => price_policy.ticket_cat)
    @JoinColumn({ referencedColumnName: 'id' })
    @Exclude()
    price_policy: PricePolicy[];

    @ManyToOne(() => Promocode, promocode => promocode.ticket_cat)
    @JoinColumn({ name: 'id', referencedColumnName: 'id_cat' })
    @Exclude()
    promocodes: Promocode[];

    @Exclude()
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude()
    setProperties(data: TTicketCatData): void {
        if (!this.id) this.id = data.id;
        this.id_d = setDefaultValue(data.id_d, this.id_d);
        this.price = setDefaultValue(data.price, this.price);
        this.type = setDefaultValue(data.type, this.type);
        this.count = setDefaultValue(data.count, this.count);
        this.name = setDefaultValue(data.name, this.name);
        this.description = setDefaultValue(data.description, this.description, null);
    }
}
