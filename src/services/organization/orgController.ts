import { Organization } from '@services/organization/org';
import { DbProvider } from './providers/dbProvider';

class OrgController {
    getUserByEmail = async (email: string): Promise<Organization> => {
        const user = await DbProvider.getOrgByEmail(email);
        return user;
    };
}

const orgController = new OrgController();
export default orgController;
