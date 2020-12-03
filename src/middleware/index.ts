import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleSession,
    initConfig,
    handleChangeSessionSettings
} from './common';

import { handleAuth } from './auth';

export async function initMiddleware() {
    const promise = initConfig();
    return promise;
}

export default [ handleCors, handleBodyRequestParsing, handleChangeSessionSettings, handleSession, handleCompression, handleAuth ];
