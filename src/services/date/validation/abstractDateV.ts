import { TDateData } from '@services/date/types';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export abstract class AbstractDateV implements TDateData {
    @IsDateString()
    date: string;

    @IsUUID()
    id: string;

    @IsUUID()
    id_ev: string;

    @IsUUID()
    id_loc: string | null;

    @IsUUID()
    id_sh: string | null;
}
