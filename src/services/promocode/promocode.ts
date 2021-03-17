import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { TicketCat } from '@services/ticket_cat/ticketCat';
import { classToPlain, Exclude } from 'class-transformer';
import { setDefaultValue } from 'setters/dist';
import { IPromoCode, TPromoCodeData, EPromoCodeTypes } from '@services/promocode/types';

@Entity({ name: 'promocode' })
export class PromoCode implements IPromoCode {
    constructor(data: TPromoCodeData) {
        if (data) this.setProperties(data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    id_cat: string;

    @Column('text')
    code: string;

    @Column({ type: 'timestamp with time zone' })
    date: string;

    @Column({ type: 'integer' })
    count: number;

    @Column({ type: 'integer' })
    discount: number;

    @Column({ type: 'smallint' })
    type: EPromoCodeTypes;

    @ManyToOne(() => TicketCat, ticket_cat => ticket_cat.promocodes)
    @JoinColumn({ name: 'id_cat' })
    @Exclude()
    ticket_cat: TicketCat;

    @Exclude()
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude()
    setProperties(data: TPromoCodeData): void {
        if (!this.id_cat) this.id_cat = data.id_cat;
        if (!this.code) this.code = data.code;
        this.id = setDefaultValue(data.id, this.id);
        this.date = setDefaultValue(data.date, this.date);
        this.count = setDefaultValue(data.count, this.count);
        this.discount = setDefaultValue(data.discount, this.discount);
        this.type = setDefaultValue(data.type, this.type);
    }
}
