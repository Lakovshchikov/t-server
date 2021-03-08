import eventController from '@services/event/eventController';
import { IEvent } from '@services/event/eventTypes';

class EventFacade {
    static getEventById = async (id: string): Promise<IEvent> => {
        const event = await eventController.getEventById(id);
        return event;
    };
}

export default EventFacade;
