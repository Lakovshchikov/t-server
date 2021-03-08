import { Comment } from '@services/comment/comment';
import { TNNComment, IComment } from '@services/comment/commentTypes';
import { getRepository } from 'typeorm';
import createHttpError from 'http-errors';

export abstract class DbProvider {
    static getCommentsByIds = async (ids: string[]): Promise<IComment[]> => {
        try {
            const commentRepository = await getRepository(Comment);
            const comments = await commentRepository
                .createQueryBuilder('comments')
                .where('comments.id IN (:...ids)', { ids: ids })
                .getMany();

            return comments;
        } catch (e) {
            throw createHttpError(500, 'getCommentsByIds error. Database error', e);
        }
    };

    static getCommentsByEventId = async (event_id: string): Promise<IComment[]> => {
        try {
            const commentRepository = await getRepository(Comment);
            const comments = await commentRepository
                .createQueryBuilder('comments')
                .where('comments.id_ev = :id', { id: event_id })
                .getMany();

            return comments;
        } catch (e) {
            throw createHttpError(500, 'getCommentsByEventId error. Database error', e);
        }
    };

    static saveComments = async (data: TNNComment | TNNComment[], id_ev: string) : Promise<IComment[]> => {
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
            return comments;
        } catch (e) {
            throw createHttpError(500, 'saveComments error. Database error', e);
        }
    };

    static updateComments = async (comments: IComment[]): Promise<IComment[]> => {
        const commentRepository = await getRepository(Comment);
        await commentRepository.save(comments);

        return comments;
    };
}
