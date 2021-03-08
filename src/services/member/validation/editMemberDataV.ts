import { AbstractMemberV } from '@services/member/validation/';
import {
    IsDefined, IsOptional
} from 'class-validator';
import { EMemberTypes } from '@services/member/memberTypes';

export class EditMemberDataV implements AbstractMemberV {
    @IsDefined()
    id_d: string;

    @IsOptional()
    name: string;

    @IsOptional()
    type: EMemberTypes;
}
