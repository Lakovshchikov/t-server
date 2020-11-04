import { DbProvider } from '@services/users/providers/dbProvider';
import { User } from '@services/users/user';

class UserController {
    getUserByEmail = async (email: string): Promise<User> => {
        const user = await DbProvider.getUserByEmail(email);
        return user;
    };
}

const userController = new UserController();
export default userController;
