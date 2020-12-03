import { getRepository } from 'typeorm';
import { Organization } from '../org';

export abstract class DbProvider {
    static async getOrgByEmail(email: string): Promise<Organization> {
        const userRepository = await getRepository(Organization);
        const org = await userRepository
            .createQueryBuilder('organization')
            .where('organization.email = :email', { email: email })
            .getOne();

        return org;
    }
}
