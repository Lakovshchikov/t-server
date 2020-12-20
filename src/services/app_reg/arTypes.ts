export enum EStatus {
    SUCCESS = 1,
    PROCESSING = 2,
    REJECTED = 3
}

export type TResponse = {
    isSuccess: boolean,
    error?: {
        message: string,
        data?: any
    },
    data?: any
};

export type TAppRegReqData = {
    id?: string,
    id_org: string,
    doc_id?: string,
    status?: number,
    desc?:string
};

export interface IAppOrg {

    id: string;

    id_org: string;

    doc_id: string | null;

    status: number;

    desc: string | null;
}
