import { IEvent, TEventData } from '@services/event/eventTypes';
import { DbProvider } from '@services/event/providers/dbProvider';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { Event } from '@services/event/event';
import OrgFacade from '@services/organization/facade/orgFacade';
import createHttpError from 'http-errors';
import { NewEventDataV, UpdateEventDataV } from './validation';

class EventController {
    createEvent = async (data: TEventData): Promise<gt.TResponse> => {
        try {
            const eventData = plainToClass(NewEventDataV, data);
            const errors:ValidationError[] = await Event.validate(eventData);
            let response: gt.TResponse;
            if (errors.length) {
                response = EventController.sendValidationError(errors);
            } else {
                response = await DbProvider.createEvent(data);
            }
            return response;
        } catch (e) {
            return EventController.sendError(e);
        }
    };

    updateEvent = async (data: TEventData): Promise<gt.TResponse> => {
        try {
            const eventData = plainToClass(UpdateEventDataV, data);
            const errors:ValidationError[] = await Event.validate(eventData);
            let response: gt.TResponse;
            if (errors.length) {
                response = EventController.sendValidationError(errors);
            } else {
                response = await DbProvider.getEventById(data.id);
                if (response.isSuccess) {
                    const event = response.data as IEvent;
                    event.setProperties(data);
                    response = await DbProvider.updateEvent(event);
                }
            }
            return response;
        } catch (e) {
            return EventController.sendError(e);
        }
    };

    getEventById = async (id: string): Promise<IEvent> => {
        try {
            const response = await DbProvider.getEventById(id);
            return response.data;
        } catch (e) {
            throw createHttpError(500, 'Get Date by id error', e);
        }
    };

    private static sendValidationError(errors:ValidationError[]) {
        let errorTexts: any[] = [];
        for (const errorItem of errors) {
            errorTexts = errorTexts.concat(errorItem.constraints);
        }
        return EventController.sendError({
            message: 'Validation error',
            data: errorTexts
        });
    }

    private static sendError(error: any) {
        return {
            isSuccess: false,
            error: error
        };
    }

    checkUser = (data: any): boolean => OrgFacade.checkType(data);
}

const eventController = new EventController();
export default eventController;
