export type TTicketCatData = {
    id?: string;

    id_d?: string;

    description?: string | null;

    price?: number;

    type?: ETicketCatTypes;

    count?: number;

    name?: string;
};

export interface ITicketCat extends TTicketCatData{
    id: string;

    id_d: string;

    price: number;

    type: ETicketCatTypes;

    count: number;

    name: string;

    serialize: () => Record<string, any>;

    setProperties: (data: TTicketCatData) => void;
}

export enum ETicketCatTypes {
    RUB
}
