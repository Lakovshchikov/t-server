import { plainToClass } from 'class-transformer';
import { DbProvider } from '@services/date/providers/dbProvider';
import { ValidationError } from 'class-validator';
import { api as OrgFacade } from '@services/organization';
import createHttpError from 'http-errors';
import { TDateData, IEventDate } from '@services/date/types';
import validate, { NewDateV, EditDateV } from '@services/date/validation/';
import { api as EventFacade } from '@services/event';
import { getValidationErrors } from 'validation/dist';

class Controller {
    createDate = async (data: TDateData): Promise<IEventDate> => {
        try {
            const dateData = plainToClass(NewDateV, data);
            const errors:ValidationError[] = await validate(dateData);
            if (errors.length) {
                throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
            }
            const date = await DbProvider.createDate(dateData);
            return date;
        } catch (e) {
            throw createHttpError(500, 'Create Date error', e);
        }
    };

    updateDate = async (data: TDateData): Promise<IEventDate> => {
        try {
            const dateData = plainToClass(EditDateV, data);
            const errors:ValidationError[] = await validate(dateData);
            if (errors.length) {
                throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
            }
            const date = await DbProvider.getDateById(data.id);
            if (date) {
                date.setProperties(dateData);
                await DbProvider.updateDate(date);
                return date;
            } else {
                throw createHttpError(404, `Date with id: ${date.id} not found`);
            }
        } catch (e) {
            throw createHttpError(500, 'Update Date error', e);
        }
    };

    getDateById = async (id: string): Promise<IEventDate> => {
        try {
            const date = await DbProvider.getDateById(id);
            return date;
        } catch (e) {
            throw createHttpError(500, 'Get Date by id error', e);
        }
    };

    checkPermission = async (id_ev: string, user_id: string): Promise<boolean> => {
        let hasPermission = false;
        const event = await EventFacade.getEventById(id_ev);
        if (event.id_org === user_id) {
            hasPermission = true;
        }
        return hasPermission;
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);
}

const dateController = new Controller();
export default dateController;
