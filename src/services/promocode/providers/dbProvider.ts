import { getRepository } from 'typeorm';
import { IPromoCode, TPromoCodeData } from '@services/promocode/types';
import createHttpError from 'http-errors';
import { PromoCode } from '@services/promocode';

export abstract class DbProvider {
    static async createPromoCodes(data: TPromoCodeData[]): Promise<IPromoCode[]> {
        try {
            const pcRepository = await getRepository(PromoCode);
            let promoCodes: IPromoCode[] = [];
            data.forEach((item: IPromoCode) => {
                promoCodes.push(new PromoCode(item));
            });
            promoCodes = await pcRepository.save(promoCodes);
            return promoCodes;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError createPromoCodes', e);
        }
    }

    static async updatePromoCodes(data: TPromoCodeData[]): Promise<IPromoCode[]> {
        try {
            const pcRepository = await getRepository(PromoCode);
            let promoCodes: IPromoCode[] = [];
            data.forEach((item: IPromoCode) => {
                promoCodes.push(new PromoCode(item));
            });
            promoCodes = await pcRepository.save(promoCodes);
            if (promoCodes.length) {
                const ids = promoCodes.map(item => item.id);
                return DbProvider.getPromoCodesById(ids);
            }
            throw createHttpError(404, 'Promo code with such IDs were not found');
        } catch (e) {
            throw createHttpError(500, 'InternalServerError updatePromoCodes', e);
        }
    }

    static async getPromoCodesByCatId(id: string): Promise<IPromoCode[]> {
        try {
            const pcRepository = await getRepository(PromoCode);
            const promoCodes = await pcRepository
                .createQueryBuilder('promocode')
                .where('promocode.id_cat = :id', { id })
                .getMany();

            return promoCodes;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getPromoCodesByCatId', e);
        }
    }

    static async deletePromoCode(id: string): Promise<boolean> {
        try {
            const pcRepository = await getRepository(PromoCode);
            const promoCodes = await pcRepository
                .createQueryBuilder('promocode')
                .delete()
                .where('promocode.id = :id', { id })
                .execute();

            return true;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError deletePromoCode', e);
        }
    }

    static async getPromoCodesById(ids: string[]): Promise<IPromoCode[]> {
        try {
            const pcRepository = await getRepository(PromoCode);
            const promoCodes = await pcRepository
                .createQueryBuilder('promocode')
                .where('promocode.id IN (:...ids)', { ids })
                .getMany();

            return promoCodes;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getPromoCodesByCatId', e);
        }
    }
}
