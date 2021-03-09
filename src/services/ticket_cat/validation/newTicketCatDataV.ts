import { AbstractTicketCatDataV } from '@services/ticket_cat/validation';
import { IsDefined, IsOptional } from 'class-validator';
import { ETicketCatTypes } from '../types';

export class NewTicketCatDataV extends AbstractTicketCatDataV {
    @IsDefined()
    id_d: string;

    @IsDefined()
    count: number;

    @IsOptional()
    description: string | null;

    @IsDefined()
    price: number;

    @IsDefined()
    type: ETicketCatTypes;

    @IsDefined()
    name: string;
}
