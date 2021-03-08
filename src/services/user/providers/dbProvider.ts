import { getRepository } from 'typeorm';
import { User } from '@services/user/user';
import createHttpError from 'http-errors';
import { IUser } from '@services/user/userTypes';
import { AbstractUserDataV } from '../validation/abstractUserDataV';

export abstract class DbProvider {
    static async getUserByEmail(email: string): Promise<IUser> {
        const userRepository = await getRepository(User);
        const user = await userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();

        return user;
    }

    static async createUser(data: AbstractUserDataV): Promise<IUser> {
        try {
            return this.saveUser(data);
        } catch (e) {
            throw createHttpError(500, 'DB create user error', e);
        }
    }

    static async updateUser(data: AbstractUserDataV): Promise<IUser> {
        try {
            return this.saveUser(data);
        } catch (e) {
            throw createHttpError(500, 'DB update user error', e);
        }
    }

    private static async saveUser(data: AbstractUserDataV): Promise<IUser> {
        const userRepository = await getRepository(User);
        const user = new User(data);
        await userRepository.save(user);

        return user;
    }
}
