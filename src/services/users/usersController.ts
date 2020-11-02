import { getExampleUser } from "./providers/usersDAL";

export const getUserById = (id: string) => {
    if (id === '3')
        return getExampleUser();
};
