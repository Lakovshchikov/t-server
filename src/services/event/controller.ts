import { IEvent, TEventData } from '@services/event/types';
import { DbProvider } from '@services/event/providers/dbProvider';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { api as OrgFacade } from '@services/organization';
import createHttpError from 'http-errors';
import { getValidationErrors } from 'validation/dist';
import validate, { NewEventDataV, UpdateEventDataV } from './validation';

class Controller {
    createEvent = async (data: TEventData): Promise<IEvent> => {
        const eventData = plainToClass(NewEventDataV, data);
        const errors:ValidationError[] = await validate(eventData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const event = await DbProvider.createEvent(data);
        return event;
    };

    updateEvent = async (data: TEventData): Promise<IEvent> => {
        const eventData = plainToClass(UpdateEventDataV, data);
        const errors:ValidationError[] = await validate(eventData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        let event = await DbProvider.getEventById(data.id);
        if (event) {
            event.setProperties(data);
            event = await DbProvider.updateEvent(event);
            return event;
        } else {
            throw createHttpError(404, `Event with id: ${data.id} not found`);
        }
    };

    getEventById = async (id: string): Promise<IEvent> => {
        const event = await DbProvider.getEventById(id);
        return event;
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);
}

const eventController = new Controller();
export default eventController;
