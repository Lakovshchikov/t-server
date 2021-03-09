import { TTicketCatData, ITicketCat } from '@services/ticket_cat/types';
import { getRepository } from 'typeorm';
import createHttpError from 'http-errors';
import { TicketCat } from '@services/ticket_cat';

export abstract class DbProvider {
    static async createTicketCats(data: TTicketCatData[]): Promise<ITicketCat[]> {
        try {
            const ticketCatRepository = await getRepository(TicketCat);
            let ticketCats: ITicketCat[] = [];
            data.forEach((item: TTicketCatData) => {
                ticketCats.push(new TicketCat(item));
            });
            ticketCats = await ticketCatRepository.save(ticketCats);
            return ticketCats;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError createTicketCats', e);
        }
    }

    static async updateTicketCats(data: TTicketCatData[]): Promise<ITicketCat[]> {
        try {
            const ticketCatRepository = await getRepository(TicketCat);
            let ticketCats: ITicketCat[] = [];
            data.forEach((item: TTicketCatData) => {
                ticketCats.push(new TicketCat(item));
            });
            ticketCats = await ticketCatRepository.save(ticketCats);
            if (ticketCats.length) {
                const ids = ticketCats.map(c => c.id);
                return DbProvider.getTicketCategoriesByIds(ids);
            }
            throw createHttpError(404, 'Ticket categories with such IDs were not found');
        } catch (e) {
            throw createHttpError(500, 'InternalServerError updateTicketCats', e);
        }
    }

    static async getTicketCatsByDateId(id:string): Promise<ITicketCat[]> {
        try {
            const ticketCatRepository = await getRepository(TicketCat);
            const ticketCats = await ticketCatRepository
                .createQueryBuilder('ticket_cat')
                .where('ticket_cat.id_d = :id', { id })
                .getMany();

            return ticketCats;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getTicketCatsByDateId', e);
        }
    }

    static async deleteTicketCat(id: string): Promise<boolean> {
        try {
            const ticketCatRepository = await getRepository(TicketCat);
            await ticketCatRepository
                .createQueryBuilder('ticket_cat')
                .delete()
                .where('ticket_cat.id = :id', { id })
                .execute();

            return true;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError deleteTicketCat', e);
        }
    }

    static async getTicketCategoriesByIds(ids: string[]): Promise<ITicketCat[]> {
        try {
            const ticketCatRepository = await getRepository(TicketCat);
            const ticketCats = await ticketCatRepository
                .createQueryBuilder('ticket_cat')
                .where('ticket_cat.id IN (:...ids)', { ids })
                .getMany();

            return ticketCats;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError deleteTicketCat', e);
        }
    }
}
