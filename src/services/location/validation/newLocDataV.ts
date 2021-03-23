import { AbstractLocDataV } from '@services/location/validation';
import { IsDefined, IsOptional } from 'class-validator';

export class NewLocDataV implements AbstractLocDataV {
    @IsOptional()
    id: string;

    @IsDefined()
    id_sh: string;

    @IsDefined()
    name: string;

    @IsDefined()
    address: string;

    @IsOptional()
    description: string;
}
