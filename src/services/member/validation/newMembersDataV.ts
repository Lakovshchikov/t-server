import { NewMemberDataV } from '@services/member/validation/';
import {
    IsArray,
    IsDefined, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class NewMembersDataV {
    @IsDefined()
    @ValidateNested()
    @IsArray()
    @Type(() => NewMemberDataV)
    members: NewMemberDataV[];
}
