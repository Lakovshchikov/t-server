import {
    TResponse, TCommentReqData, TComment, TReqComment, TNNComment, TConfirmCommentReqData, TConfirmComment
} from '@services/comment/commentTypes';
import { DbProvider } from '@services/comment/providers/dbProvider';
import OrgFacade from '@services/organization/facade/orgFacade';
import { Comment } from '@services/comment/comment';
import NNProvider from '@services/comment/providers/nnProvider';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { PredictDataV } from '@services/comment/validation/predictDataV';
import { ConfirmDataV } from '@services/comment/validation/confirmDataV';
import { v4 as uuidv4 } from 'uuid';
import { Db } from 'typeorm';

class CommentController {
    getCommentsByEventId = async (event_id: string): Promise<TResponse> => {
        const response = await DbProvider.getCommentsByEventId(event_id);
        return response;
    };

    predictComments = async (data: TCommentReqData): Promise<TResponse> => {
        try {
            const commentsData = plainToClass(PredictDataV, data);
            const errors:ValidationError[] = await Comment.validate(commentsData);
            let response;
            if (errors.length) {
                response = this.sendValidationError(errors);
            } else {
                response = await this.getUniqueComments(data);
                if (response.isSuccess) {
                    let prediction: Comment[] = response.data.notUnique;
                    if (prediction.length === data.info.comments.length) {
                        response = {
                            isSuccess: true,
                            data: prediction
                        };
                    } else {
                        const nnReqData: TReqComment[] = response.data.unique.map((c: TComment) => ({
                            id: uuidv4(),
                            content: c.content
                        }));
                        response = await NNProvider.predictComments(nnReqData);
                        if (response.isSuccess) {
                            const comments = response.data as TNNComment[];
                            comments.forEach((c: TNNComment) => {
                                c.content = nnReqData.find((val:TReqComment) => val.id === c.id).content;
                            });
                            response = await DbProvider.saveComments(comments, data.id_ev);
                            if (response.isSuccess) {
                                prediction = prediction.concat(response.data);
                                response = {
                                    isSuccess: true,
                                    data: prediction
                                };
                            }
                        }
                    }
                }
            }
            return response;
        } catch (e) {
            return {
                isSuccess: false,
                error: e
            };
        }
    };

    confirmPrediction = async (data: TConfirmCommentReqData): Promise<TResponse> => {
        try {
            let response;
            const commentsData = plainToClass(ConfirmDataV, data);
            const errors:ValidationError[] = await Comment.validate(commentsData);
            if (errors.length > 0) {
                response = this.sendValidationError(errors);
            } else {
                const ids = data.comments.map((c: TConfirmComment) => c.id);
                response = await DbProvider.getCommentsByIds(ids);
                if (response.isSuccess) {
                    const comments = response.data;
                    comments.forEach((c: Comment) => {
                        c.correct = data.comments.find((value => value.id === c.id)).correct;
                    });
                    response = await DbProvider.updateComments(comments);
                }
            }
            return response;
        } catch (e) {
            return {
                isSuccess: false,
                error: e
            };
        }
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);

    private getUniqueComments = async (data: TCommentReqData): Promise<TResponse> => {
        const response = await this.getCommentsByEventId(data.id_ev);
        if (response.isSuccess) {
            let unique: TComment[] = [];
            let notUnique: Comment[] = [];
            const storage = new Map();
            response.data.forEach((c:Comment) => {
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
                isSuccess: true,
                data: {
                    unique: unique,
                    notUnique: notUnique
                }
            };
        } else {
            return response;
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

    private sendValidationError(errors:ValidationError[]) {
        let errorTexts: any[] = [];
        errorTexts = this.getValidationErrors(errors, errorTexts);
        const response = {
            isSuccess: false,
            error: {
                message: 'Validation error',
                data: errorTexts
            }
        };
        return response;
    }
}

const commentController = new CommentController();
export default commentController;
