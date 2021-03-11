import ticketCatController from '@services/ticket_cat/controller';
import { ITicketCat } from '@services/ticket_cat/types';

export default class TicketCatFacade {
    static async getTicketCatById(id: string): Promise<ITicketCat> {
        const ticketCat = await ticketCatController.getTicketCatByID(id);
        return ticketCat;
    }
}
