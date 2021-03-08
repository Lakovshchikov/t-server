import { EditMemberDataV } from '@services/member/validation/';
import {
    IsArray,
    IsDefined, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class EditMembersDataV {
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => EditMemberDataV)
    members: EditMemberDataV[];
}
