import { IsDefined, IsString } from 'class-validator';
import { TComment } from '../types';

export class CommentDataV implements TComment {
    @IsDefined()
    @IsString()
    content: string;
}
