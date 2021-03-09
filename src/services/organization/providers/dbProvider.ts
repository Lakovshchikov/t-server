import { getRepository } from 'typeorm';
import { IOrganization } from '@services/organization/types';
import createHttpError from 'http-errors';
import { Organization } from '../org';
import { AbstractOrgDataV } from '../validation/abstractOrgDataV';

export abstract class DbProvider {
    static async getOrgByEmail(email: string): Promise<IOrganization> {
        const orgRepository = await getRepository(Organization);
        const org = await orgRepository
            .createQueryBuilder('organization')
            .where('organization.email = :email', { email: email })
            .leftJoinAndSelect('organization.app_reg', 'app_reg')
            .getOne();

        return org;
    }

    static async createUser(data: AbstractOrgDataV): Promise<IOrganization> {
        try {
            return this.saveUser(data);
        } catch (e) {
            throw createHttpError(500, 'Create Organization error. Database error', e);
        }
    }

    static async updateUser(data: AbstractOrgDataV): Promise<IOrganization> {
        try {
            return this.saveUser(data);
        } catch (e) {
            throw createHttpError(500, 'Update Organization error. Database error', e);
        }
    }

    private static async saveUser(data: AbstractOrgDataV): Promise<IOrganization> {
        const orgRepository = await getRepository(Organization);
        const user = new Organization(data);
        await orgRepository.save(user);

        return user;
    }
}
