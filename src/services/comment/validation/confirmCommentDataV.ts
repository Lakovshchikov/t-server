import { TConfirmComment } from '@services/comment/commentTypes';
import { IsDefined, IsUUID, IsBoolean } from 'class-validator';

export class ConfirmCommentDataV implements TConfirmComment {
    @IsDefined()
    @IsUUID('all')
    id: string;

    @IsDefined()
    @IsBoolean()
    correct: boolean;
}
