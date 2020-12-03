import { User } from '@services/user/user';
import { getRepository } from 'typeorm';
import { TResponse } from '@services/user/userTypes';
import { AbstractUserDataV } from '../validation/abstractUserDataV';

export abstract class DbProvider {
    static async getUserByEmail(email: string): Promise<User> {
        const userRepository = await getRepository(User);
        const user = await userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email: email })
            .getOne();

        return user;
    }

    static async createUser(data: AbstractUserDataV): Promise<TResponse> {
        try {
            return this.saveUser(data);
        } catch (e) {
            return this.sendDBError('Create User error. Database error', e);
        }
    }

    static async updateUser(data: AbstractUserDataV): Promise<TResponse> {
        try {
            return this.saveUser(data);
        } catch (e) {
            return this.sendDBError('Update User error. Database error', e);
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

    private static async saveUser(data: AbstractUserDataV): Promise<TResponse> {
        const userRepository = await getRepository(User);
        const user = new User(data);
        await userRepository.save(user);

        return {
            isSuccess: true,
            data: user
        };
    }
}
