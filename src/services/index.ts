import usersRoutes from './users/usersRoutes';
import { User } from './users/user';
import { Ticket } from './ticket/ticket';
import { Organization } from './organization/organization';

export default [ ...usersRoutes ];
export const entities = [ User, Ticket, Organization ];
export const migrations: any[] = [];
export const subscribers: any[] = [];
