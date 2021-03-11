import {
    Entity, Column, JoinColumn, PrimaryColumn, ManyToOne
} from 'typeorm';
import { TicketCat } from '@services/ticket_cat/ticketCat';
import { IPricePolicy, TPricePolicyData } from '@services/price_policy/types';
import { Exclude, classToPlain } from 'class-transformer';
import { setDefaultValue } from 'setters/dist';

@Entity({ name: 'price_policy' })
export class PricePolicy implements IPricePolicy {
    constructor(data: TPricePolicyData) {
        if (data) this.setProperties(data);
    }

    @PrimaryColumn({ type: 'uuid' })
    id_cat: string;

    @PrimaryColumn({ type: 'smallint' })
    days: number;

    @Column({ type: 'smallint' })
    percent: number;

    @ManyToOne(() => TicketCat, ticket_cat => ticket_cat.price_policy)
    @JoinColumn({ referencedColumnName: 'id', name: 'id_cat' })
    @Exclude()
    ticket_cat: TicketCat;

    @Exclude()
    serialize = ():Record<string, any> => classToPlain(this);

    @Exclude()
    setProperties(data: TPricePolicyData): void {
        this.id_cat = setDefaultValue(data.id_cat, this.id_cat);
        this.days = setDefaultValue(data.days, this.days);
        this.percent = setDefaultValue(data.percent, this.percent);
    }
}
