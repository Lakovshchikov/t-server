import {
    IsDefined
} from 'class-validator';
import { AbstractUserDataV } from './abstractUserDataV';

export class NewUserDataV extends AbstractUserDataV {
    @IsDefined()
    name: string;

    @IsDefined()
    second_name: string;

    @IsDefined()
    pass: string;
}
