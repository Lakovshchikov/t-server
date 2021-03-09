import { TMemberData } from '@services/member/types';
import { validate, ValidationError } from 'class-validator';

export * from './abstractMemberV';
export * from './editMemberDataV';
export * from './newMemberDataV';
export * from './newMembersDataV';
export * from './editMembersDataV';

type TValidData = {members: TMemberData[]} | TMemberData;

export default function (data: TValidData): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
