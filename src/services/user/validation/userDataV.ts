import {
    IsOptional
} from 'class-validator';
import { AbstractUserDataV } from './abstractUserDataV';

export class UserDataV extends AbstractUserDataV {
    @IsOptional()
    name: string;

    @IsOptional()
    second_name: string;

    @IsOptional()
    pass: string;
}
