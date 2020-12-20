import { getRepository } from 'typeorm';
import { TResponse } from '../orgTypes';
import { Organization } from '../org';
import { AbstractOrgDataV } from '../validation/abstractOrgDataV';

export abstract class DbProvider {
    static async getOrgByEmail(email: string): Promise<Organization> {
        const orgRepository = await getRepository(Organization);
        const org = await orgRepository
            .createQueryBuilder('organization')
            .where('organization.email = :email', { email: email })
            .leftJoinAndSelect('organization.app_reg', 'app_reg')
            .getOne();

        return org;
    }

    static async createUser(data: AbstractOrgDataV): Promise<TResponse> {
        try {
            return this.saveUser(data);
        } catch (e) {
            return this.sendDBError('Create Organization error. Database error', e);
        }
    }

    static async updateUser(data: AbstractOrgDataV): Promise<TResponse> {
        try {
            return this.saveUser(data);
        } catch (e) {
            return this.sendDBError('Update Organization error. Database error', e);
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

    private static async saveUser(data: AbstractOrgDataV): Promise<TResponse> {
        const orgRepository = await getRepository(Organization);
        const user = new Organization(data);
        await orgRepository.save(user);

        return {
            isSuccess: true,
            data: user
        };
    }
}
