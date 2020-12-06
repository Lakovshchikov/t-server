import { Organization } from '@services/organization/org';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { DbProvider } from './providers/dbProvider';
import { TOrgReqData, TResponse } from './orgTypes';
import { NewOrgDataV } from './validation/newOrgDataV';
import { EditOrgDataV } from './validation/editOrgDataV';

class OrgController {
    getUserByEmail = async (email: string): Promise<Organization> => {
        const user = await DbProvider.getOrgByEmail(email);
        return user;
    };

    registerOrg = async (data: TOrgReqData): Promise<TResponse> => {
        const userData = plainToClass(NewOrgDataV, data);
        const errors:ValidationError[] = await Organization.validOrg(userData);
        let response: TResponse;
        if (errors.length > 0) {
            response = this.sendValidationError(errors);
        } else {
            const org = await this.getUserByEmail(data.email);
            if (org) {
                response = {
                    isSuccess: false,
                    error: {
                        message: 'Organization with this email is already registered'
                    }
                };
            } else {
                response = await DbProvider.createUser(userData);
            }
        }
        return response;
    };

    changeOrgInfo = async (data: TOrgReqData): Promise<TResponse> => {
        const userData = plainToClass(EditOrgDataV, data);
        const errors:ValidationError[] = await Organization.validOrg(userData);
        let response: TResponse;
        if (errors.length > 0) {
            response = this.sendValidationError(errors);
        } else {
            const org = await this.getUserByEmail(data.email);
            if (org) {
                response = await DbProvider.updateUser(userData);
            } else {
                response = {
                    isSuccess: false,
                    error: {
                        message: 'Organization with this email does not exist'
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

const orgController = new OrgController();
export default orgController;
