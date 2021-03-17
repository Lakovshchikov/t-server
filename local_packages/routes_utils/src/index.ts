export function getSerializedArray(array: {serialize: () => Record<string, any>}[]): Record<string, any>[] {
    const result: (Record<string, any>)[] = [];
    array.forEach((c) => {
        result.push(c.serialize());
    });
    return result;
};
