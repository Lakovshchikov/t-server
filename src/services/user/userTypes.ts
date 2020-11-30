export type TConfigNotification = {
    email: boolean,
    phone: boolean,
    tg: boolean,
    browser: boolean
};

export type TConfigPermission = {
    email: boolean,
    phone: boolean,
};

export type TUserReqData = {
    email: string,
    name?: string,
    second_name?: string,
    part_name?: string,
    pass?: string,
    phone?: string,
    n_email?: boolean,
    n_phone?: boolean,
    n_tg?: boolean,
    n_browser?: boolean,
    p_email?: boolean,
    p_phone?: boolean
};

export type TResponse = {
    isSuccess: boolean,
    error?: {
        message: string,
        data?: any
    },
    data?: any
};

export interface IUser {
    email: string;

    name: string;

    second_name: string;

    patr_name: string | null;

    pass: string;

    isAdmin: boolean;

    phone: string | null;

    temp_pass: boolean;

    config_notification: TConfigNotification;

    config_permission: TConfigPermission;
}
