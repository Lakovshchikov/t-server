import { User } from '@services/user/user';
import { getRepository } from 'typeorm';

export class DbProvider {
    static async getUserByEmail(email: string): Promise<User> {
        const userRepository = await getRepository(User);
        const user = await userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.tickets', 'ticket')
            .where('user.email = :email', { email: email })
            .getOne();

        return user;
    }
}
