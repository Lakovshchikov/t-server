import { IPricePolicy, TPricePolicyData } from '@services/price_policy/types';
import { getRepository } from 'typeorm';
import createHttpError from 'http-errors';
import { PricePolicy } from '@services/price_policy';

export abstract class DbProvider {
    static async createPricePolices(data: TPricePolicyData[]): Promise<IPricePolicy[]> {
        try {
            const pricePolicyRepository = await getRepository(PricePolicy);
            let pricePolices: IPricePolicy[] = [];
            data.forEach((item: TPricePolicyData) => {
                pricePolices.push(new PricePolicy(item));
            });
            pricePolices = await pricePolicyRepository.save(pricePolices);
            return pricePolices;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError createPricePolices', e);
        }
    }

    static async updatePricePolices(data: TPricePolicyData[]): Promise<IPricePolicy[]> {
        try {
            const pricePolicyRepository = await getRepository(PricePolicy);
            let pricePolices: IPricePolicy[] = [];
            data.forEach((item: TPricePolicyData) => {
                pricePolices.push(new PricePolicy(item));
            });
            pricePolices = await pricePolicyRepository.save(pricePolices);
            if (pricePolices.length) {
                const ids = pricePolices.map(item => item.id_cat);
                const days = pricePolices.map(item => item.days);
                return DbProvider.getPricePolices(ids, days);
            }
            throw createHttpError(404, 'Ticket categories with such IDs were not found');
        } catch (e) {
            throw createHttpError(500, 'InternalServerError updatePricePolices', e);
        }
    }

    static async getPricePolicesByCatId(id: string): Promise<IPricePolicy[]> {
        try {
            const pricePolicyRepository = await getRepository(PricePolicy);
            const pricePolices = await pricePolicyRepository
                .createQueryBuilder('price_policy')
                .where('price_policy.id_cat = :id', { id })
                .getMany();

            return pricePolices;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getPricePolices', e);
        }
    }

    static async deletePricePolicy(id: string, days: number): Promise<boolean> {
        try {
            const pricePolicyRepository = await getRepository(PricePolicy);
            await pricePolicyRepository
                .createQueryBuilder('price_policy')
                .delete()
                .where('price_policy.id_cat = :id', { id })
                .andWhere('price_policy.days = :days', { days })
                .execute();

            return true;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError deletePricePolicy', e);
        }
    }

    static async getPricePolices(ids: string[], days: number[]): Promise<IPricePolicy[]> {
        try {
            const pricePolicyRepository = await getRepository(PricePolicy);
            const pricePolices = await pricePolicyRepository
                .createQueryBuilder('price_policy')
                .where('price_policy.id_cat IN (:...ids)', { ids })
                .andWhere('price_policy.days IN (:...days)', { days })
                .getMany();

            return pricePolices;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getPricePolices', e);
        }
    }
}
