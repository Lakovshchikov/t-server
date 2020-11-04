import usersRoutes from './users/usersRoutes';
import { User } from './users/user';

export default [ ...usersRoutes ];
export const entities = [ User ];
export const migrations: any[] = [];
export const subscribers: any[] = [];
