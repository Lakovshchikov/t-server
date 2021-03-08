import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import createHttpError from 'http-errors';
import { getValidationErrors } from 'validation/dist';
import { DbProvider } from './providers/dbProvider';
import { TOrgReqData, IOrganization } from './orgTypes';
import { NewOrgDataV } from './validation/newOrgDataV';
import { EditOrgDataV } from './validation/editOrgDataV';
import OrgFacade from './facade/orgFacade';
import validate from './validation';

class OrgController {
    getUserByEmail = async (email: string): Promise<IOrganization> => {
        try {
            const user = await DbProvider.getOrgByEmail(email);
            return user;
        } catch (e) {
            throw createHttpError(500, 'Get Date by id error', e);
        }
    };

    registerOrg = async (data: TOrgReqData): Promise<IOrganization> => {
        const userData = plainToClass(NewOrgDataV, data);
        const errors:ValidationError[] = await validate(userData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        let org = await this.getUserByEmail(data.email);
        if (org) {
            throw createHttpError(409, 'This email is already registered');
        } else {
            org = await DbProvider.createUser(userData);
            const appReg = await OrgFacade.createAppReg({
                id_org: org.id
            });
            return org;
        }
    };

    changeOrgInfo = async (data: TOrgReqData): Promise<IOrganization> => {
        const userData = plainToClass(EditOrgDataV, data);
        const errors:ValidationError[] = await validate(userData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        let org = await this.getUserByEmail(data.email);
        if (org) {
            org = await DbProvider.updateUser(userData);
            return org;
        } else {
            throw createHttpError(404, 'User with this email was not found');
        }
    };
}

const orgController = new OrgController();
export default orgController;
