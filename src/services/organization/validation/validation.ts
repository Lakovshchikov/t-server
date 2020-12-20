// https://github.com/Kholenkov/js-data-validation/blob/master/data-validation.js

import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { EOrgForm } from '@services/organization/orgTypes';
import { AbstractOrgDataV } from './abstractOrgDataV';

const checkDigit = function (inn: string, coefficients: number[]): number {
    let n = 0;

    coefficients.forEach((value, index) => {
        n += value * parseInt(inn[index], 10);
    });
    return parseInt(String(n % 11 % 10), 10);
};

export function IsOGRN(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsOGRN',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    let result = false;
                    const orgData: AbstractOrgDataV = <AbstractOrgDataV>args.object;
                    const orgForm = parseInt(orgData.org_form.toString(), 10);

                    if (value.length === 13 && orgForm === EOrgForm.OOO) {
                        let n13 = parseInt((parseInt(value.slice(0, -1), 10) % 11).toString().slice(-1), 10);
                        result = n13 === parseInt(value[12], 10);
                    } else if (value.length === 15 && orgForm === EOrgForm.IP) {
                        let n15 = parseInt((parseInt(value.slice(0, -1), 10) % 13).toString().slice(-1), 10);
                        result = n15 === parseInt(value[14], 10);
                    }

                    return result;
                }
            }
        });
    };
}

export function IsINN(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsINN',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    let result = false;
                    const orgData: AbstractOrgDataV = <AbstractOrgDataV>args.object;
                    const orgForm = parseInt(orgData.org_form.toString(), 10);

                    if (value.length === 10 && orgForm === EOrgForm.OOO) {
                        let n10 = checkDigit(value, [ 2, 4, 10, 3, 5, 9, 4, 6, 8 ]);
                        result = n10 === parseInt(value[9], 10);
                    } else if (value.length === 12 && orgForm === EOrgForm.IP) {
                        let n11 = checkDigit(value, [ 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 ]);
                        let n12 = checkDigit(value, [ 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 ]);
                        if ((n11 === parseInt(value[10], 10)) && (n12 === parseInt(value[11], 10))) {
                            result = true;
                        }
                    }
                    return result;
                }
            }
        });
    };
}

export function IsCheckingAccount(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsCheckingAccount',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    let result = false;

                    if (value.length === 20) {
                        const orgData: AbstractOrgDataV = <AbstractOrgDataV>args.object;
                        const bic = orgData.bank_id;
                        const bicRs = bic.toString().slice(-3) + value;
                        let checksum = 0;
                        const coefficients = [ 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1 ];

                        coefficients.forEach((v, i) => {
                            checksum += v * (parseInt(bicRs[i], 10) % 10);
                        });

                        if (checksum % 10 === 0) {
                            result = true;
                        }
                    }

                    return result;
                }
            }
        });
    };
}

export function IsCorrespondentAccount(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsCorrespondentAccount',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    let result = false;

                    if (value.length === 20) {
                        const orgData: AbstractOrgDataV = <AbstractOrgDataV>args.object;
                        const bic = orgData.bank_id;
                        const bicKs = `0${bic.toString().slice(4, 6)}${value}`;
                        let checksum = 0;
                        const coefficients = [ 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1 ];

                        coefficients.forEach((v, i) => {
                            checksum += v * (parseInt(bicKs[i], 10) % 10);
                        });

                        if (checksum % 10 === 0) {
                            result = true;
                        }
                    }
                    return true;
                }
            }
        });
    };
}
