import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsInEnum(property: any, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsInEnum',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [ property ],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const constraintsEnum = args.constraints[0];
                    return value in constraintsEnum;
                }
            }
        });
    };
}
