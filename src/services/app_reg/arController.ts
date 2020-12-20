import { AppReg } from '@services/app_reg/app_reg';
import { DbProvider } from '@services/app_reg/providers/dbProvider';
import { plainToClass } from 'class-transformer';
import { NewAppRegDataV } from '@services/app_reg/validation/newAppRegDataV';
import { ValidationError } from 'class-validator';
import UserFacade from '@services/user/facade/userFacade';
import OrgFacade from '@services/organization/facade/orgFacade';
import { EditAppRegDataV } from '@services/app_reg/validation/editAppRegDataV';
import { AbstractAppRegDataV } from '@services/app_reg/validation/abstractAppRegDataV';
import { TResponse } from './arTypes';

class ArController {
    createAppReg = async (data: AbstractAppRegDataV): Promise<TResponse> => {
        const arData = plainToClass(NewAppRegDataV, data);
        const errors:ValidationError[] = await AppReg.validate(arData);
        let response: TResponse;
        if (errors.length) {
            response = this.sendValidationError(errors);
        } else {
            response = await DbProvider.createAppReg(data);
        }
        return response;
    };

    editAppReg = async (data: AbstractAppRegDataV) : Promise<TResponse> => {
        const arData = plainToClass(EditAppRegDataV, data);
        const errors:ValidationError[] = await AppReg.validate(arData);
        let response: TResponse;
        if (errors.length) {
            response = this.sendValidationError(errors);
        } else {
            response = await DbProvider.editAppReg(data);
        }
        return response;
    };

    getAppRegByOrgId = async (id: string) :Promise<TResponse> => {
        const appReg = await DbProvider.getAppRegByOrgId(id);
        return appReg;
    };

    checkUser = (data: any): boolean => UserFacade.checkType(data);

    checkAdminPermission = (data: any) :boolean => UserFacade.checkAdminPermission(data);

    checkOrg = (data:any): boolean => OrgFacade.checkType(data);

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

const arController = new ArController();
export default arController;
