import { EditPPDataV } from '@services/price_policy/validation/';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EditPPsDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => EditPPDataV)
    items: EditPPDataV[];
}
