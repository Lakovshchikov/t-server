import { DbProvider } from '@services/user/providers/dbProvider';
import { User } from '@services/user/user';
import { TNewUserReqBody, TResponse } from '@services/user/userTypes';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { UserValidator } from '@services/user/userValidator';

class UserController {
    getUserByEmail = async (email: string): Promise<User> => {
        const user = await DbProvider.getUserByEmail(email);
        return user;
    };

    registerUser = async (data: TNewUserReqBody): Promise<TResponse> => {
        const userData = plainToClass(UserValidator, data);
        const errors:ValidationError[] = await User.validUser(userData);
        let response: TResponse;
        if (errors.length > 0) {
            let errorTexts: any[] = [];
            for (const errorItem of errors) {
                errorTexts = errorTexts.concat(errorItem.constraints);
                response = {
                    isSuccess: false,
                    error: {
                        message: 'Validation error',
                        data: errorTexts
                    }
                };
            }
        } else {
            let user = await this.getUserByEmail(data.email);
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
}

const userController = new UserController();
export default userController;
