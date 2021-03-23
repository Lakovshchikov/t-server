import { TLocationData } from '@services/location/types';
import { validate, ValidationError } from 'class-validator';

export * from './abstractLocDataV';
export * from './editLocDataV';
export * from './editLocsDataV';
export * from './newLocDataV';
export * from './newLocsDataV';

export default function (data: {items: TLocationData[]}): Promise<ValidationError[]> {
    return validate(data, { skipMissingProperties: true })
        .then((errors: ValidationError[]) => errors);
}
