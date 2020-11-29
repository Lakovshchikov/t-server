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
            const user = new User();

            user.email = data.email;
            user.pass = User.getHashPass(data.pass);
            user.name = data.name;
            user.second_name = data.second_name;
            user.patr_name = data.part_name ? data.part_name : null;
            user.phone = data.phone ? data.phone : null;
            user.isAdmin = false;
            user.temp_pass = false;
            user.config_notification = {
                browser: data.n_browser || false,
                email: data.n_email || false,
                phone: data.n_phone || false,
                tg: data.n_tg || false
            };
            user.config_permission = {
                email: data.p_email || false,
                phone: data.p_phone || false
            };

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
