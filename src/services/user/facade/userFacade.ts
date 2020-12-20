import { User } from '@services/user/user';

class UserFacade {
    static checkType(object: any): boolean {
        return object instanceof User;
    }

    static checkAdminPermission(object: any) :boolean {
        let result = false;
        if (object instanceof User) if (object.isAdmin) result = true;

        return result;
    }
}

export default UserFacade;
