import {ValidationArguments, ValidationError, ValidationOptions} from 'class-validator';

export function IsInEnum(property: any, validationOptions?: ValidationOptions);
export function getValidationErrors(errors:ValidationError[], _errorTexts: any[] = []): any
