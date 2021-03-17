import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NewPCDataV } from './index';

export class NewPCsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => NewPCDataV)
    items: NewPCDataV[];
}
