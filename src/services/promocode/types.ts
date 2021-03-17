export type TPromoCodeData = {
    id?: string;

    code?: string;

    id_cat?: string;

    date?: string;

    count?: number;

    discount?: number;

    type?: EPromoCodeTypes;
};

export enum EPromoCodeTypes {
    PERCENT,
    RUB
}

export interface IPromoCode extends TPromoCodeData{
    id: string;

    code: string;

    id_cat: string;

    date: string;

    count: number;

    discount: number;

    type: EPromoCodeTypes;

    serialize: () => Record<string, any>

    setProperties: (data: TPromoCodeData) => void
}
