export type TResponse = {
    isSuccess: boolean,
    error?: {
        message: string,
        data?: any
    },
    data?: any
};

export type TInfo = {
    [key: string] :any
};

export interface IComment {

    id: string;

    id_ev: string;

    info: {} | null;

    content: string;

    event: Event;
}
