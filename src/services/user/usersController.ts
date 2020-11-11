import { DbProvider } from '@services/user/providers/dbProvider';
import { User } from '@services/user/user';

class UserController {
    getUserByEmail = async (email: string): Promise<User> => {
        const user = await DbProvider.getUserByEmail(email);
        return user;
    };
}

const userController = new UserController();
export default userController;
