export interface IMember extends TMemberData{
    name: string;

    type: EMemberTypes;

    setProperties: (data: TMemberData) => void

    serialize: () => Record<string, any>
}

export type TMemberData = {
    id_d: string;

    name?: string;

    type?: EMemberTypes;
};

export enum EMemberTypes {
    ARTIST,
    SPEAKER,
    ORGANIZER,
    ASSISTANT
}
