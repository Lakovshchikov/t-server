import { IEvent, TEventData } from '@services/event/eventTypes';
import { getRepository } from 'typeorm';
import { Event } from '@services/event/event';

export abstract class DbProvider {
    static getEventById = async (id: string): Promise<gt.TResponse> => {
        const eventsRepository = await getRepository(Event);
        const event = await eventsRepository
            .createQueryBuilder('event')
            .where('event.id = :id', { id })
            .getOne();
        return DbProvider.createResponse(event);
    };

    static createEvent = async (data: TEventData): Promise<gt.TResponse> => {
        try {
            const event = new Event(data);
            return DbProvider.saveEvent(event);
        } catch (e) {
            return DbProvider.sendDBError('createEvent DB error', e);
        }
    };

    static updateEvent = async (event: IEvent): Promise<gt.TResponse> => {
        try {
            return DbProvider.saveEvent(event);
        } catch (e) {
            return DbProvider.sendDBError('createEvent DB error', e);
        }
    };

    private static saveEvent = async (event: IEvent): Promise<gt.TResponse> => {
        const eventsRepository = await getRepository(Event);
        await eventsRepository.save(event);

        return DbProvider.createResponse(event);
    };

    private static sendDBError(message: string, e: any): gt.TResponse {
        return {
            isSuccess: false,
            error: {
                message: message,
                data: e
            }
        };
    }

    private static createResponse(data: any): gt.TResponse {
        return {
            isSuccess: true,
            data: data
        };
    }
}
