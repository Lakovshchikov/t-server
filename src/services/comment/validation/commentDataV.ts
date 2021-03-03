import { IsDefined, IsString } from 'class-validator';
import { TComment } from '../commentTypes';

export class CommentDataV implements TComment {
    @IsDefined()
    @IsString()
    content: string;
}
