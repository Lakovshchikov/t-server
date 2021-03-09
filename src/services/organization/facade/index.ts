import arController from '@services/app_reg/controller';
import { TAppRegReqData, IAppOrg } from '@services/app_reg/types';
import { Organization } from '@services/organization/org';

class OrgFacade {
    static async createAppReg(data: TAppRegReqData):Promise<IAppOrg> {
        return arController.createAppReg(data);
    }

    static checkType(object: any): boolean {
        return object instanceof Organization;
    }
}

export default OrgFacade;
