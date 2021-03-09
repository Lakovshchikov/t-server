import { TMemberData, IMember } from '@services/member/types';
import { getRepository } from 'typeorm';
import { Member } from '@services/member/member';
import createHttpError from 'http-errors';

export abstract class DbProvider {
    static async createMembers(data: TMemberData[]): Promise<IMember[]> {
        try {
            const memberRepository = await getRepository(Member);
            let members: IMember[] = [];
            data.forEach((item: TMemberData) => {
                members.push(new Member(item));
            });
            members = await memberRepository.save(members);
            return members;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError createMembers', e);
        }
    }

    static async updateMembers(data: TMemberData[]): Promise<IMember[]> {
        try {
            const memberRepository = await getRepository(Member);
            const members: IMember[] = [];
            data.forEach((item: TMemberData) => {
                members.push(new Member(item));
            });
            await memberRepository.save(members);
            return members;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError updateMembers', e);
        }
    }

    static async getMembersByDateId(id: string) : Promise<IMember[]> {
        try {
            const memberRepository = await getRepository(Member);
            const members = await memberRepository
                .createQueryBuilder('member')
                .where('member.id_d = :id', { id: id })
                .getMany();

            return members;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getMemberByEventId', e);
        }
    }
}
