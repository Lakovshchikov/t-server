import { DbProvider } from '@services/app_reg/providers/dbProvider';
import { plainToClass } from 'class-transformer';
import { NewAppRegDataV } from '@services/app_reg/validation/newAppRegDataV';
import { ValidationError } from 'class-validator';
import { api as UserFacade } from '@services/user';
import { api as OrgFacade } from '@services/organization';
import { EditAppRegDataV } from '@services/app_reg/validation/editAppRegDataV';
import { AbstractAppRegDataV } from '@services/app_reg/validation/abstractAppRegDataV';
import validate from '@services/app_reg/validation';
import { IAppOrg } from '@services/app_reg/types';
import createHttpError from 'http-errors';
import { getValidationErrors } from 'validation/dist';

class Controller {
    createAppReg = async (data: AbstractAppRegDataV): Promise<IAppOrg> => {
        const arData = plainToClass(NewAppRegDataV, data);
        const errors:ValidationError[] = await validate(arData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const appReg = await DbProvider.createAppReg(data);
        return appReg;
    };

    editAppReg = async (data: AbstractAppRegDataV) : Promise<IAppOrg> => {
        const arData = plainToClass(EditAppRegDataV, data);
        const errors:ValidationError[] = await validate(arData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const appReg = await DbProvider.editAppReg(data);
        return appReg;
    };

    getAppRegByOrgId = async (id: string) :Promise<IAppOrg> => {
        const appReg = await DbProvider.getAppRegByOrgId(id);
        return appReg;
    };

    checkUser = (data: any): boolean => UserFacade.checkType(data);

    checkAdminPermission = (data: any) :boolean => UserFacade.checkAdminPermission(data);

    checkOrg = (data:any): boolean => OrgFacade.checkType(data);
}

const arController = new Controller();
export default arController;
