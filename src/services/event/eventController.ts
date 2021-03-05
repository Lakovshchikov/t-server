import { IEvent, TEventData } from '@services/event/eventTypes';
import { DbProvider } from '@services/event/providers/dbProvider';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { Event } from '@services/event/event';
import OrgFacade from '@services/organization/facade/orgFacade';
import { NewEventDataV, UpdateEventDataV } from './validation';

class EventController {
    createEvent = async (data: TEventData): Promise<gt.TResponse> => {
        try {
            const eventData = plainToClass(NewEventDataV, data);
            const errors:ValidationError[] = await Event.validate(eventData);
            let response: gt.TResponse;
            if (errors.length) {
                response = this.sendValidationError(errors);
            } else {
                response = await DbProvider.createEvent(data);
            }
            return response;
        } catch (e) {
            return {
                isSuccess: false,
                data: e
            };
        }
    };

    updateEvent = async (data: TEventData): Promise<gt.TResponse> => {
        try {
            const eventData = plainToClass(UpdateEventDataV, data);
            const errors:ValidationError[] = await Event.validate(eventData);
            let response: gt.TResponse;
            if (errors.length) {
                response = this.sendValidationError(errors);
            } else {
                response = await DbProvider.getEventById(data.id);
                if (response.isSuccess) {
                    const event = response.data as Event;
                    event.setProperties(data);
                    response = await DbProvider.updateEvent(event);
                }
            }
            return response;
        } catch (e) {
            return {
                isSuccess: false,
                data: e
            };
        }
    };

    private sendValidationError(errors:ValidationError[]) {
        let errorTexts: any[] = [];
        for (const errorItem of errors) {
            errorTexts = errorTexts.concat(errorItem.constraints);
        }
        const response = {
            isSuccess: false,
            error: {
                message: 'Validation error',
                data: errorTexts
            }
        };
        return response;
    }

    checkUser = (data: any): boolean => OrgFacade.checkType(data);
}

const eventController = new EventController();
export default eventController;
