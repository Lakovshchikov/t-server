import { AbstractTicketCatDataV } from '@services/ticket_cat/validation';
import { IsDefined, IsOptional } from 'class-validator';
import { ETicketCatTypes } from '../types';

export class EditTicketCatDataV extends AbstractTicketCatDataV {
    @IsDefined()
    id: string;

    @IsDefined()
    id_d: string;

    @IsOptional()
    count: number;

    @IsOptional()
    description: string | null;

    @IsOptional()
    price: number;

    @IsOptional()
    type: ETicketCatTypes;

    @IsOptional()
    name: string;
}
