import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EditLocDataV } from '@services/location/validation/';

export class EditLocsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => EditLocDataV)
    items: EditLocDataV[];
}
