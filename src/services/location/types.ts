export type TLocationData = {
    id?: string;

    id_sh?: string;

    name?: string;

    address?: string;

    description?: string;
};

export interface ILocation extends TLocationData{
    id: string;

    id_sh: string;

    name: string;

    address: string;

    serialize: () => Record<string, any>

    setProperties: (data: TLocationData) => void
}

export type TGetLocationsParam = {
    id: string;

    id_sh: string;
};
