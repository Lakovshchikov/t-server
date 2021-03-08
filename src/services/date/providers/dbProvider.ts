import { IEventDate, TDateData } from '@services/date/dateTypes';
import { getRepository } from 'typeorm';
import { EventDate } from '@services/date/date';
import createHttpError from 'http-errors';

export abstract class DbProvider {
    static getDateById = async (id: string):Promise<IEventDate> => {
        const dateRepository = await getRepository(EventDate);
        const date = await dateRepository
            .createQueryBuilder('date')
            .where('date.id = :id', { id })
            .getOne();

        return date;
    };

    static createDate = async (data: TDateData): Promise<IEventDate> => {
        try {
            const date = new EventDate(data);
            return DbProvider.saveDate(date);
        } catch (e) {
            throw createHttpError(500, 'DB create date error', e);
        }
    };

    static updateDate = async (data: IEventDate): Promise<IEventDate> => {
        try {
            return DbProvider.saveDate(data);
        } catch (e) {
            throw createHttpError(500, 'DB create date error', e);
        }
    };

    private static saveDate = async (date: IEventDate): Promise<IEventDate> => {
        const dateRepository = await getRepository(EventDate);
        await dateRepository.save(date);
        return date;
    };
}
