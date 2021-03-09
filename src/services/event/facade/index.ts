import eventController from '@services/event/controller';
import { IEvent } from '@services/event/types';

class EventFacade {
    static getEventById = async (id: string): Promise<IEvent> => {
        const event = await eventController.getEventById(id);
        return event;
    };
}

export default EventFacade;
