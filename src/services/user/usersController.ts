import { DbProvider } from '@services/user/providers/dbProvider';
import { User } from '@services/user/user';
import { TUserReqData, TResponse } from '@services/user/userTypes';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { UserDataV } from './validation/userDataV';
import { NewUserDataV } from './validation/newUserDataV';

class UserController {
    getUserByEmail = async (email: string): Promise<User> => {
        const user = await DbProvider.getUserByEmail(email);
        return user;
    };

    registerUser = async (data: TUserReqData): Promise<TResponse> => {
        const userData = plainToClass(NewUserDataV, data);
        const errors:ValidationError[] = await User.validate(userData);
        let response: TResponse;
        if (errors.length) {
            response = this.sendValidationError(errors);
        } else {
            const user = await this.getUserByEmail(data.email);
            if (user) {
                response = {
                    isSuccess: false,
                    error: {
                        message: 'User with this email is already registered'
                    }
                };
            } else {
                response = await DbProvider.createUser(userData);
            }
        }
        return response;
    };

    changeUserInfo = async (data: TUserReqData): Promise<TResponse> => {
        const userData = plainToClass(UserDataV, data);
        const errors:ValidationError[] = await User.validate(userData);
        let response: TResponse;
        if (errors.length) {
            response = this.sendValidationError(errors);
        } else {
            const user = await this.getUserByEmail(data.email);
            if (user) {
                response = await DbProvider.updateUser(userData);
            } else {
                response = {
                    isSuccess: false,
                    error: {
                        message: 'User with this email does not exist'
                    }
                };
            }
        }
        return response;
    };

    private sendValidationError(errors:ValidationError[]) {
        let errorTexts: any[] = [];
        for (const errorItem of errors) {
            errorTexts = errorTexts.concat(errorItem.constraints);
        }
        const response = {
            isSuccess: false,
            error: {
                message: 'Validation error',
                data: errorTexts
            }
        };
        return response;
    }
}

const userController = new UserController();
export default userController;
