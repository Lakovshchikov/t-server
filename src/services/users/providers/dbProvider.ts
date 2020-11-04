import { User } from '@services/users/user';
import { getRepository } from 'typeorm';

export class DbProvider {
    static async getUserByEmail(email: string): Promise<User> {
        const user = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email: email })
            .getOne();
        return user;
    }
}
