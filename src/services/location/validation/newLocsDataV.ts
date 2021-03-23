import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NewLocDataV } from '@services/location/validation/';

export class NewLocsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => NewLocDataV)
    items: NewLocDataV[];
}
