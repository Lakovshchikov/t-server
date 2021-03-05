import { AbstractEventDataV } from '@services/event/validation/abstractEventDataV';
import {
    IsDefined, IsOptional
} from 'class-validator';

export class NewEventDataV extends AbstractEventDataV {
    @IsOptional()
    add_restr: string;

    @IsDefined()
    age_restr: number;

    @IsDefined()
    category: number;

    @IsDefined()
    id_org: string;

    @IsDefined()
    name: string;

    @IsOptional()
    public:boolean;
}
