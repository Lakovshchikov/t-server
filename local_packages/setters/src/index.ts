export function setDefaultValue(newValue: any, currentVal: any, defaultValue?: any):any {
    let result;
    if (typeof newValue === 'boolean' || typeof newValue === 'number') {
        result = newValue
    } else if (newValue) {
        result = newValue;
    } else {
        result = currentVal !== undefined ? currentVal : defaultValue;
    }
    return result;
};
