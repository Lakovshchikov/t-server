import { AbstractMemberV } from '@services/member/validation/abstractMemberV';
import {
    IsDefined
} from 'class-validator';
import { EMemberTypes } from '@services/member/types';

export class NewMemberDataV extends AbstractMemberV {
    @IsDefined()
    id_d: string;

    @IsDefined()
    name: string;

    @IsDefined()
    type: EMemberTypes;
}
