import { AppReg } from '@services/app_reg/app_reg';
import { getRepository } from 'typeorm';
import { IAppOrg } from '@services/app_reg/types';

import { AbstractAppRegDataV } from '@services/app_reg/validation/abstractAppRegDataV';
import createHttpError from 'http-errors';

export abstract class DbProvider {
    static async createAppReg(data: AbstractAppRegDataV): Promise<IAppOrg> {
        try {
            return this.saveAppReg(data);
        } catch (e) {
            throw createHttpError(500, 'Create AppReg error. Database error', e);
        }
    }

    static async editAppReg(data: AbstractAppRegDataV) :Promise<IAppOrg> {
        try {
            const appReg = await this.getAppRegById(data.id);
            if (appReg) {
                const appRepository = await getRepository(AppReg);
                appReg.setProperties(data);
                appRepository.save(appReg);

                return appReg;
            } else {
                return appReg;
            }
        } catch (e) {
            throw createHttpError(500, 'Edit AppReg error. Database error', e);
        }
    }

    static async getAppRegByOrgId(id: string): Promise<IAppOrg> {
        try {
            const appRepository = await getRepository(AppReg);
            const appReg = await appRepository
                .createQueryBuilder('app_reg')
                .where('app_reg.id_org = :org_id', { org_id: id })
                .getOne();

            return appReg;
        } catch (e) {
            throw createHttpError(500, 'Query param error', e);
        }
    }

    static async getAppRegById(id: string): Promise<IAppOrg> {
        try {
            const appRepository = await getRepository(AppReg);
            const appReg = await appRepository
                .createQueryBuilder('app_reg')
                .where('app_reg.id = :id', { id: id })
                .getOne();

            return appReg;
        } catch (e) {
            throw createHttpError(500, 'Query param error', e);
        }
    }

    private static async saveAppReg(data: AbstractAppRegDataV) :Promise<IAppOrg> {
        const appRepository = await getRepository(AppReg);
        const appReg = new AppReg(data);
        await appRepository.save(appReg);

        return appReg;
    }
}
