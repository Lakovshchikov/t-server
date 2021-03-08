export interface IEventDate extends TDateData {
    id: string;

    id_loc: string | null;

    id_sh: string | null;

    date: string;

    serialize: () => Record<string, any>

    getDate: () => Date,

    setProperties: (data: TDateData) => void
}

export type TDateData = {
    id?: string;

    id_ev: string;

    id_loc?: string | null;

    id_sh?: string | null;

    date: string;
};
