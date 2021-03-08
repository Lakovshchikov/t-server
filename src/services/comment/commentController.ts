import {
    TCommentReqData, TComment, TReqComment, TNNComment, TConfirmCommentReqData, TConfirmComment, IComment
} from '@services/comment/commentTypes';
import { DbProvider } from '@services/comment/providers/dbProvider';
import OrgFacade from '@services/organization/facade/orgFacade';
import NNProvider from '@services/comment/providers/nnProvider';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { PredictDataV } from '@services/comment/validation/predictDataV';
import { ConfirmDataV } from '@services/comment/validation/confirmDataV';
import { v4 as uuidv4 } from 'uuid';
import createHttpError from 'http-errors';
import validate from './validation';

type UComments = {
    unique: TComment[],
    notUnique: IComment[]
};

class CommentController {
    getCommentsByEventId = async (event_id: string): Promise<IComment[]> => {
        const comments = await DbProvider.getCommentsByEventId(event_id);
        return comments;
    };

    predictComments = async (data: TCommentReqData): Promise<IComment[]> => {
        const commentsData = plainToClass(PredictDataV, data);
        const errors:ValidationError[] = await validate(commentsData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', errors);
        }
        const uComments: UComments = await this.getUniqueComments(data);
        let prediction: IComment[] = uComments.notUnique;

        if (prediction.length !== data.info.comments.length) {
            const nnReqData: TReqComment[] = uComments.unique.map((c: TComment) => ({
                id: uuidv4(),
                content: c.content
            }));
            const newComments = await NNProvider.predictComments(nnReqData);
            newComments.forEach((c: TNNComment) => {
                c.content = nnReqData.find((val:TReqComment) => val.id === c.id).content;
            });
            const comments = await DbProvider.saveComments(newComments, data.id_ev);
            prediction = prediction.concat(comments);
        }

        return prediction;
    };

    confirmPrediction = async (data: TConfirmCommentReqData): Promise<IComment[]> => {
        const commentsData = plainToClass(ConfirmDataV, data);
        const errors:ValidationError[] = await validate(commentsData);
        if (errors.length > 0) {
            throw createHttpError(400, 'Validation errors', errors);
        }
        const ids = data.comments.map((c: TConfirmComment) => c.id);
        let comments = await DbProvider.getCommentsByIds(ids);

        comments.forEach((c: IComment) => {
            c.correct = data.comments.find((value => value.id === c.id)).correct;
        });
        comments = await DbProvider.updateComments(comments);

        return comments;
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);

    private getUniqueComments = async (data: TCommentReqData): Promise<UComments> => {
        try {
            const comments = await this.getCommentsByEventId(data.id_ev);
            let unique: TComment[] = [];
            let notUnique: IComment[] = [];
            const storage = new Map();
            comments.forEach((c:IComment) => {
                storage.set(c.content, c);
            });
            data.info.comments.forEach((c:TComment) => {
                if (storage.has(c.content)) {
                    notUnique.push(storage.get(c.content));
                } else {
                    unique.push(c);
                }
            });
            return {
                unique: unique,
                notUnique: notUnique
            };
        } catch (e) {
            throw createHttpError(500, 'getUniqueComments error', e);
        }
    };

    private getValidationErrors = (errors:ValidationError[], _errorTexts: any[]): any => {
        let errorTexts = [].concat(_errorTexts);
        for (const errorItem of errors) {
            if (errorItem.children.length) {
                errorTexts = this.getValidationErrors(errorItem.children, errorTexts);
            } else {
                errorTexts = errorTexts.concat(errorItem.constraints);
            }
        }
        return errorTexts;
    };
}

const commentController = new CommentController();
export default commentController;
