import {registerDecorator, ValidationArguments, ValidationError, ValidationOptions} from 'class-validator';

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

export function getValidationErrors(errors:ValidationError[], _errorTexts: any[] = []): any {
    let errorTexts = [].concat(_errorTexts);
    for (const errorItem of errors) {
        if (errorItem.children.length) {
            errorTexts = getValidationErrors(errorItem.children, errorTexts);
        } else {
            errorTexts = errorTexts.concat(errorItem.constraints);
        }
    }
    return errorTexts;
}
