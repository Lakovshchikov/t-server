import { AbstractLocDataV } from '@services/location/validation';
import { IsDefined, IsOptional } from 'class-validator';

export class EditLocDataV implements AbstractLocDataV {
    @IsDefined()
    id: string;

    @IsDefined()
    id_sh: string;

    @IsOptional()
    name: string;

    @IsOptional()
    address: string;

    @IsOptional()
    description: string;
}
