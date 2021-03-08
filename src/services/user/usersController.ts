import { DbProvider } from '@services/user/providers/dbProvider';
import { TUserReqData, IUser } from '@services/user/userTypes';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import createHttpError from 'http-errors';
import { getValidationErrors } from 'validation/dist';
import { UserDataV } from './validation/userDataV';
import { NewUserDataV } from './validation/newUserDataV';
import validate from './validation';

class UserController {
    getUserByEmail = async (email: string): Promise<IUser> => {
        const user = await DbProvider.getUserByEmail(email);
        return user;
    };

    registerUser = async (data: TUserReqData): Promise<IUser> => {
        try {
            const userData = plainToClass(NewUserDataV, data);
            const errors:ValidationError[] = await validate(userData);
            if (errors.length) {
                throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
            }
            let user = await this.getUserByEmail(data.email);
            if (user) {
                throw createHttpError(409, 'This email is already registered');
            } else {
                user = await DbProvider.createUser(userData);
                return user;
            }
        } catch (e) {
            throw createHttpError(500, 'Create Date error', e);
        }
    };

    changeUserInfo = async (data: TUserReqData): Promise<IUser> => {
        try {
            const userData = plainToClass(UserDataV, data);
            const errors:ValidationError[] = await validate(userData);
            if (errors.length) {
                throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
            }
            let user = await this.getUserByEmail(data.email);
            if (user) {
                user = await DbProvider.updateUser(userData);
            } else {
                throw createHttpError(404, 'User with this email was not found');
            }
            return user;
        } catch (e) {
            throw createHttpError(500, 'Create Date error', e);
        }
    };
}

const userController = new UserController();
export default userController;
