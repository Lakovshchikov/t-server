import { EditTicketCatDataV } from '@services/ticket_cat/validation';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EditTicketCatsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => EditTicketCatDataV)
    items:EditTicketCatDataV[];
}
