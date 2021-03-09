export interface IEvent {
    id: string;

    id_org: string;

    name: string;

    age_restr: number;

    add_restr: string | null;

    category: number;

    public: boolean;

    setProperties: (data: TEventData) => void,

    serialize: () => Record<string, any>
}

export type TEventData = {
    id?: string,

    id_org: string;

    name?: string;

    age_restr?: number;

    add_restr?: string;

    category?: number;

    public?: boolean;
};

export enum ETypesEvent {
    CONCERT,
    MEETING,
    THEATRICAL,
    STANDUP
}
