import { IMember, TMemberData } from '@services/member/memberTypes';
import OrgFacade from '@services/organization/facade/orgFacade';
import createHttpError from 'http-errors';
import { plainToClass } from 'class-transformer';
import validate, { NewMembersDataV, EditMembersDataV } from '@services/member/validation';
import { getValidationErrors } from 'validation/dist';
import { DbProvider } from '@services/member/providers/dbProvider';
import DateFacade from '@services/date/facade';

class MemberController {
    createMembers = async (data: TMemberData[]): Promise<IMember[]> => {
        const membersData = plainToClass(NewMembersDataV, { members: data });
        const errors = await validate(membersData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const members = await DbProvider.createMembers(membersData.members);
        return members;
    };

    updateMember = async (data: TMemberData[]): Promise<IMember[]> => {
        const membersData = plainToClass(EditMembersDataV, { members: data });
        const errors = await validate(membersData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const members = await DbProvider.updateMembers(membersData.members);
        return members;
    };

    getMembersByDateId = async (id: string): Promise<IMember[]> => {
        const member = await DbProvider.getMembersByDateId(id);
        return member;
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);

    checkPermission = async (date_id: string, user_id: string) :Promise<boolean> => {
        let hasPermission = false;
        const date = await DateFacade.getDateById(date_id);
        // @ts-ignore
        if (date.event.org.id === user_id) {
            hasPermission = true;
        }
        return hasPermission;
    };
}

const memberController = new MemberController();
export default memberController;
