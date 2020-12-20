import arController from '@services/app_reg/arController';
import { TAppRegReqData } from '@services/app_reg/arTypes';
import { Organization } from '@services/organization/org';
import { TResponse } from '@services/organization/orgTypes';

class OrgFacade {
    static async createAppReg(data: TAppRegReqData):Promise<TResponse> {
        return arController.createAppReg(data);
    }

    static checkType(object: any): boolean {
        return object instanceof Organization;
    }
}

export default OrgFacade;
