import { NewPPDataV } from '@services/price_policy/validation/';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NewPPsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => NewPPDataV)
    items: NewPPDataV[];
}
