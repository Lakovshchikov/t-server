import { User } from '@services/user/user';
import { getRepository } from 'typeorm';
import { UserValidator } from '@services/user/userValidator';
import { TResponse } from '@services/user/userTypes';

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

    static async createUser(data: UserValidator): Promise<TResponse> {
        try {
            const userRepository = await getRepository(User);
            const user = new User(data);
            await userRepository.save(user);

            return {
                isSuccess: true,
                data: user
            };
        } catch (e) {
            return {
                isSuccess: false,
                error: {
                    message: 'Database error',
                    data: e
                }
            };
        }
    }
}
