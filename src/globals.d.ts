declare namespace gt {
    type TResponse = {
        isSuccess: boolean,
        error?: {
            message: string,
            data?: any
        },
        data?: any
    };
}
