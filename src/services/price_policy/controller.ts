import { IPricePolicy, TPricePolicyData } from '@services/price_policy/types';
import { plainToClass } from 'class-transformer';
import { getValidationErrors } from 'validation/dist';
import createHttpError from 'http-errors';
import { DbProvider } from '@services/price_policy/providers/dbProvider';
import { api as OrgFacade } from '@services/organization';
import { api as TicketCatFacade } from '@services/ticket_cat';
import validate, { NewPPsDataV, EditPPsDataV } from './validation';

class Controller {
    createPricePolices = async (data: TPricePolicyData[]): Promise<IPricePolicy[]> => {
        const pricePolicesData = plainToClass(NewPPsDataV, { items: data });
        const errors = await validate(pricePolicesData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const pricePolices = await DbProvider.createPricePolices(pricePolicesData.items);
        return pricePolices;
    };

    updatePricePolices = async (data: TPricePolicyData[]): Promise<IPricePolicy[]> => {
        const pricePolicesData = plainToClass(EditPPsDataV, { items: data });
        const errors = await validate(pricePolicesData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const pricePolices = await DbProvider.updatePricePolices(pricePolicesData.items);
        return pricePolices;
    };

    getPricePolicesByCatId = async (id: string): Promise<IPricePolicy[]> => {
        const pricePolices = await DbProvider.getPricePolicesByCatId(id);
        return pricePolices;
    };

    deletePricePolicy = async (id: string, days: string): Promise<boolean> => {
        const daysNum = Number(days);
        if (Number.isNaN(daysNum)) throw createHttpError(400, 'Days param must be a number');
        const result = await DbProvider.deletePricePolicy(id, daysNum);
        return result;
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);

    checkPermission = async (id_cat: string, user_id: string): Promise<boolean> => {
        let hasPermission = false;
        let ticketCat = await TicketCatFacade.getTicketCatById(id_cat);
        // @ts-ignore
        if (ticketCat.date.event.id_org === user_id) {
            hasPermission = true;
        }
        return hasPermission;
    };
}

const ppController = new Controller();
export default ppController;
