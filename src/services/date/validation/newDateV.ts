import { AbstractDateV } from '@services/date/validation/abstractDateV';
import { IsDefined, IsOptional } from 'class-validator';

export class NewDateV implements AbstractDateV {
    @IsDefined()
    date: string;

    @IsOptional()
    id: string;

    @IsDefined()
    id_ev: string;

    @IsOptional()
    id_loc: string | null;

    @IsOptional()
    id_sh: string | null;
}
