export type TPricePolicyData = {
    id_cat?: string;

    days?: number;

    percent?: number;
};

export interface IPricePolicy extends TPricePolicyData{
    id_cat: string;

    days: number;

    percent: number;

    serialize: () => Record<string, any>

    setProperties: (data: TPricePolicyData) => void
}
