import { AbstractEventDataV } from '@services/event/validation/abstractEventDataV';
import {
    IsDefined, IsOptional
} from 'class-validator';

export class UpdateEventDataV extends AbstractEventDataV {
    @IsOptional()
    add_restr: string;

    @IsOptional()
    age_restr: number;

    @IsOptional()
    category: number;

    @IsDefined()
    id_org: string;

    @IsOptional()
    name: string;

    @IsOptional()
    public: boolean;

    @IsDefined()
    id: string;
}
