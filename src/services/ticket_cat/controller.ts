import { TTicketCatData, ITicketCat } from '@services/ticket_cat/types';
import { plainToClass } from 'class-transformer';
import validate, { NewTicketCatsDataV, EditTicketCatsDataV } from '@services/ticket_cat/validation';
import { getValidationErrors } from 'validation/dist';
import { api as DateFacade } from '@services/date';
import { api as OrgFacade } from '@services/organization';
import { DbProvider } from '@services/ticket_cat/providers/dbProvider';
import createHttpError from 'http-errors';

class Controller {
    createTicketCat = async (data: TTicketCatData[]): Promise<ITicketCat[]> => {
        const ticketCatsData = plainToClass(NewTicketCatsDataV, { items: data });
        const errors = await validate(ticketCatsData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const ticketCats = await DbProvider.createTicketCats(ticketCatsData.items);
        return ticketCats;
    };

    updateTicketCat = async (data: TTicketCatData[]): Promise<ITicketCat[]> => {
        const ticketCatsData = plainToClass(EditTicketCatsDataV, { items: data });
        const errors = await validate(ticketCatsData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const ticketCats = await DbProvider.updateTicketCats(ticketCatsData.items);
        return ticketCats;
    };

    getTicketCatsByDateId = async (id: string): Promise<ITicketCat[]> => {
        const ticketCats = await DbProvider.getTicketCatsByDateId(id);
        return ticketCats;
    };

    deleteTicketCat = async (id: string): Promise<boolean> => {
        const result = await DbProvider.deleteTicketCat(id);
        return result;
    };

    getTicketCatByID = async (id: string): Promise<ITicketCat> => {
        const ticketCat = await DbProvider.getTicketCategoriesByIds([ id ]);
        return ticketCat[0];
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);

    checkPermission = async (date_id: string, user_id: string) :Promise<boolean> => {
        let hasPermission = false;
        const date = await DateFacade.getDateById(date_id);
        // @ts-ignore
        if (date.event.org.id === user_id) {
            hasPermission = true;
        }
        return hasPermission;
    };
}

const ticketCatController = new Controller();
export default ticketCatController;
