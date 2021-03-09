import { NewTicketCatDataV } from '@services/ticket_cat/validation';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NewTicketCatsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => NewTicketCatDataV)
    items:NewTicketCatDataV[];
}
