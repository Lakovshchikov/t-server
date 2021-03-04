export type TInfo = {
    value: string
};

export type TReqInfo = {
    comments: TComment[]
};

export type TCommentReqData = {
    id_ev: string;
    info: TReqInfo;
};

export type TConfirmCommentReqData = {
    comments: TConfirmComment[]
};

export interface IComment {

    id: string;

    id_ev: string;

    info: TInfo | null;

    content: string;

    correct?: boolean | null;
}

export type TComment = {
    content: string
};

export type TReqComment = TComment & {
    id: string
};

export type TNNComment = TReqComment & {
    value: number
    content?: string
};

export type TConfirmComment = {
    id: string,
    correct: boolean
};
