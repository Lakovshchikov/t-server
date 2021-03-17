import { IPromoCode, TPromoCodeData } from '@services/promocode/types';
import { plainToClass } from 'class-transformer';
import validate, { NewPCsDataV, EditPCsDataV } from '@services/promocode/validation';
import { getValidationErrors } from 'validation/dist';
import { api as TicketCatFacade } from '@services/ticket_cat';
import { api as OrgFacade } from '@services/organization';
import createHttpError from 'http-errors';
import { DbProvider } from './providers/dbProvider';

class PcController {
    createPromoCodes = async (data: TPromoCodeData[]): Promise<IPromoCode[]> => {
        const pcData = plainToClass(NewPCsDataV, { items: data });
        const errors = await validate(pcData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const promoCodes = await DbProvider.createPromoCodes(pcData.items);
        return promoCodes;
    };

    updatePromoCodes = async (data: TPromoCodeData[]): Promise<IPromoCode[]> => {
        const pcData = plainToClass(EditPCsDataV, { items: data });
        const errors = await validate(pcData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const promoCodes = await DbProvider.updatePromoCodes(pcData.items);
        return promoCodes;
    };

    getPromoCodesByCatId = async (id: string): Promise<IPromoCode[]> => {
        const promoCodes = await DbProvider.getPromoCodesByCatId(id);
        return promoCodes;
    };

    deletePromoCode = async (id_cat: string): Promise<boolean> => {
        const result = await DbProvider.deletePromoCode(id_cat);
        return result;
    };

    getPromoCodesById = async (id: string): Promise<IPromoCode[]> => {
        const result = await DbProvider.getPromoCodesById([ id ]);
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

const pcController = new PcController();
export default pcController;
