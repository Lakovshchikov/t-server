import { Comment } from '@services/comment/comment';
import { TNNComment, TResponse, TConfirmCommentReqData } from '@services/comment/commentTypes';
import { getRepository } from 'typeorm';

export abstract class DbProvider {
    static getCommentsByIds = async (ids: string[]): Promise<TResponse> => {
        try {
            const commentRepository = await getRepository(Comment);
            const comments = await commentRepository
                .createQueryBuilder('comments')
                .where('comments.id IN (:...ids)', { ids: ids })
                .getMany();
            return DbProvider.createResponse(comments);
        } catch (e) {
            return DbProvider.sendDBError('getCommentsByIds DB error', e);
        }
    };

    static getCommentsByEventId = async (event_id: string): Promise<TResponse> => {
        try {
            const commentRepository = await getRepository(Comment);
            const comments = await commentRepository
                .createQueryBuilder('comments')
                .where('comments.id_ev = :id', { id: event_id })
                .getMany();

            return DbProvider.createResponse(comments);
        } catch (e) {
            return DbProvider.sendDBError('getCommentsByEventId DB error', e);
        }
    };

    static saveComments = async (data: TNNComment | TNNComment[], id_ev: string) : Promise<TResponse> => {
        try {
            const commentRepository = await getRepository(Comment);
            const comments: Comment[] = [];
            let dataArr: TNNComment[];
            if (!(data instanceof Array)) {
                dataArr = [ data ];
            } else {
                dataArr = data;
            }
            dataArr.forEach((c: TNNComment) => {
                comments.push(new Comment({
                    id: c.id,
                    id_ev: id_ev,
                    info: {
                        value: c.value.toString()
                    },
                    content: c.content
                }));
            });
            await commentRepository.save(comments);
            return DbProvider.createResponse(comments);
        } catch (e) {
            return DbProvider.sendDBError('Save comment DB error', e);
        }
    };

    static updateComments = async (comments: Comment[]): Promise<TResponse> => {
        const commentRepository = await getRepository(Comment);
        await commentRepository.save(comments);
        return DbProvider.createResponse(comments);
    };

    private static sendDBError(message: string, e: any): TResponse {
        return {
            isSuccess: false,
            error: {
                message: message,
                data: e
            }
        };
    }

    private static createResponse(data: any): TResponse {
        return {
            isSuccess: true,
            data: data
        };
    }
}
