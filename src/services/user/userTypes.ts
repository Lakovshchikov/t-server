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

export type TNewUserReqBody = {
    email: string,
    name: string,
    second_name: string,
    part_name: string | null,
    pass: string,
    phone: string,
    n_email : boolean | null,
    n_phone : boolean | null,
    n_tg: boolean | null,
    n_browser: boolean | null
    p_email: boolean | null,
    p_phone: boolean | null
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
