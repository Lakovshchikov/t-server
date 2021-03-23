import { ILocation, TLocationData, TGetLocationsParam } from '@services/location/types';
import { plainToClass } from 'class-transformer';
import validate, { NewLocsDataV, EditLocsDataV } from '@services/location/validation';
import { getValidationErrors } from 'validation/dist';
import { api as OrgFacade } from '@services/organization';
import { api as DataFacade } from '@services/date/';
import createHttpError from 'http-errors';
import { DbProvider } from './providers/dbProvider';

class LocController {
    createLocations = async (data: TLocationData[]): Promise<ILocation[]> => {
        const locData = plainToClass(NewLocsDataV, { items: data });
        const errors = await validate(locData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const locations = await DbProvider.createLocations(locData.items);
        return locations;
    };

    updateLocations = async (data: TLocationData[]): Promise<ILocation[]> => {
        const locData = plainToClass(EditLocsDataV, { items: data });
        const errors = await validate(locData);
        if (errors.length) {
            throw createHttpError(400, 'Validation errors', getValidationErrors(errors));
        }
        const locations = await DbProvider.updateLocations(locData.items);
        return locations;
    };

    getLocationById = async (id: string, id_sh: string): Promise<ILocation> => {
        const location = await DbProvider.getLocations([ id ], [ id_sh ]);
        return location[0];
    };

    deleteLocation = async (id: string, idSh: string): Promise<boolean> => {
        const result = await await DbProvider.deleteLocation(id, idSh);
        return result;
    };

    checkUser = (data: any): boolean => OrgFacade.checkType(data);

    checkPermission = async (id_d: string, user_id: string, id_loc?: string, id_sh?: string): Promise<boolean> => {
        let hasPermission = false;
        const date = await DataFacade.getDateById(id_d);
        // @ts-ignore
        const userPerm = date.event.id_org === user_id;
        // @ts-ignore
        const locPerm = date.event.id_loc === id_loc;
        // @ts-ignore
        const shPerm = date.event.id_sh === id_sh;

        if (userPerm) {
            if (id_sh && id_loc) {
                if (locPerm && shPerm) {
                    hasPermission = true;
                }
            } else {
                hasPermission = true;
            }
        }

        return hasPermission;
    };
}

const locController = new LocController();
export default locController;
