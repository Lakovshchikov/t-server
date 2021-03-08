import { AbstractDateV } from '@services/date/validation/abstractDateV';
import { IsDefined, IsOptional } from 'class-validator';

export class EditDateV implements AbstractDateV {
    @IsOptional()
    date: string;

    @IsDefined()
    id: string;

    @IsOptional()
    id_ev: string;

    @IsOptional()
    id_loc: string | null;

    @IsOptional()
    id_sh: string | null;
}
