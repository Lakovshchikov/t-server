export function setDefaultValue(newValue: any, currentVal: any, defaultValue: any = false):any {
    let result;
    if (typeof newValue === 'boolean') {
        result = newValue
    } else if (newValue) {
        result = newValue;
    } else {
        result = currentVal !== undefined ? currentVal : defaultValue;
    }
    return result;
};
