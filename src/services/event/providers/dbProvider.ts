import { IEvent, TEventData } from '@services/event/eventTypes';
import { getRepository } from 'typeorm';
import { Event } from '@services/event/event';
import createHttpError from 'http-errors';

export abstract class DbProvider {
    static getEventById = async (id: string): Promise<IEvent> => {
        try {
            const eventsRepository = await getRepository(Event);
            const event = await eventsRepository
                .createQueryBuilder('event')
                .where('event.id = :id', { id })
                .leftJoinAndSelect('event.org', 'organization')
                .getOne();

            if (event === undefined) {
                throw createHttpError(404, `Event with id: ${id} not found`);
            }
            return event;
        } catch (e) {
            throw createHttpError(500, 'getEventById event error', e);
        }
    };

    static createEvent = async (data: TEventData): Promise<IEvent> => {
        try {
            const event = new Event(data);
            return DbProvider.saveEvent(event);
        } catch (e) {
            throw createHttpError(500, 'createEvent event error', e);
        }
    };

    static updateEvent = async (event: IEvent): Promise<IEvent> => {
        try {
            return DbProvider.saveEvent(event);
        } catch (e) {
            throw createHttpError(500, 'updateEvent event error', e);
        }
    };

    private static saveEvent = async (event: IEvent): Promise<IEvent> => {
        const eventsRepository = await getRepository(Event);
        await eventsRepository.save(event);

        return event;
    };
}
