import { getRepository } from 'typeorm';
import createHttpError from 'http-errors';
import { ILocation, TLocationData, TGetLocationsParam } from '@services/location/types';
import { Location } from '@services/location/';

export abstract class DbProvider {
    static async createLocations(data: TLocationData[]): Promise<ILocation[]> {
        try {
            const locRepository = await getRepository(Location);
            let locations: ILocation[] = [];
            data.forEach((item: ILocation) => {
                locations.push(new Location(item));
            });
            locations = await locRepository.save(locations);
            return locations;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError createLocations', e);
        }
    }

    static async updateLocations(data: TLocationData[]): Promise<ILocation[]> {
        try {
            const locRepository = await getRepository(Location);
            let locations: ILocation[] = [];
            data.forEach((item: ILocation) => {
                locations.push(new Location(item));
            });
            locations = await locRepository.save(locations);
            if (locations.length) {
                const ids = locations.map(item => item.id);
                const idSh = locations.map(item => item.id_sh);
                return DbProvider.getLocations(ids, idSh);
            }
            throw createHttpError(404, 'Locations with such IDs were not found');
        } catch (e) {
            throw createHttpError(500, 'InternalServerError updateLocations', e);
        }
    }

    static async getLocations(ids: string[], ids_sh: string[]): Promise<ILocation[]> {
        try {
            const locRepository = await getRepository(Location);
            const locations = await locRepository
                .createQueryBuilder('location')
                .where('location.id IN (:...ids)', { ids })
                .andWhere('location.id_sh IN (:....ids_sh)', { ids_sh })
                .getMany();

            return locations;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError getLocations', e);
        }
    }

    static async deleteLocation(id: string, idSh: string): Promise<boolean> {
        try {
            const locRepository = await getRepository(Location);
            await locRepository
                .createQueryBuilder('location')
                .delete()
                .where('location.id = :id', { id })
                .andWhere('location.id_sh = :idSh', { idSh })
                .execute();

            return true;
        } catch (e) {
            throw createHttpError(500, 'InternalServerError deleteLocation', e);
        }
    }
}
