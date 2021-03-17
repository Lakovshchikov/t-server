import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EditPCDataV } from './index';

export class EditPCsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => EditPCDataV)
    items: EditPCDataV[];
}
