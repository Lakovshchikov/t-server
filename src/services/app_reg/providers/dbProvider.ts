import { AppReg } from '@services/app_reg/app_reg';
import { TResponse } from '@services/app_reg/arTypes';
import { getConnection, getRepository } from 'typeorm';

import { AbstractAppRegDataV } from '@services/app_reg/validation/abstractAppRegDataV';

export abstract class DbProvider {
    static async createAppReg(data: AbstractAppRegDataV): Promise<TResponse> {
        try {
            return this.saveAppReg(data);
        } catch (e) {
            return this.sendDBError('Create AppReg error. Database error', e);
        }
    }

    static async editAppReg(data: AbstractAppRegDataV) :Promise<TResponse> {
        try {
            const appReg = await this.getAppRegById(data.id);
            if (appReg.isSuccess) {
                const appRepository = await getRepository(AppReg);
                const currentAr = appReg.data as AppReg;
                currentAr.setProperties(data);
                appRepository.save(currentAr);

                return {
                    isSuccess: true,
                    data: currentAr
                };
            } else {
                return appReg;
            }
        } catch (e) {
            return this.sendDBError('Edit AppReg error. Database error', e);
        }
    }

    static async getAppRegByOrgId(id: string): Promise<TResponse> {
        try {
            const appRepository = await getRepository(AppReg);
            const appReg = await appRepository
                .createQueryBuilder('app_reg')
                .where('app_reg.id_org = :org_id', { org_id: id })
                .getOne();

            return {
                isSuccess: true,
                data: appReg
            };
        } catch (e) {
            return this.sendDBError('Query param error', e);
        }
    }

    static async getAppRegById(id: string): Promise<TResponse> {
        try {
            const appRepository = await getRepository(AppReg);
            const appReg = await appRepository
                .createQueryBuilder('app_reg')
                .where('app_reg.id = :id', { id: id })
                .getOne();

            return {
                isSuccess: true,
                data: appReg
            };
        } catch (e) {
            return this.sendDBError('Query param error', e);
        }
    }

    private static sendDBError(message: string, e: any): TResponse {
        return {
            isSuccess: false,
            error: {
                message: message,
                data: e
            }
        };
    }

    private static async saveAppReg(data: AbstractAppRegDataV) :Promise<TResponse> {
        const appRepository = await getRepository(AppReg);
        const appReg = new AppReg(data);
        await appRepository.save(appReg);

        return {
            isSuccess: true,
            data: appReg
        };
    }
}
