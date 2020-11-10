import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleSession,
    initConfig
} from './common';

import { handleAuth } from './auth';

export async function initMiddleware() {
    const promise = initConfig();
    return promise;
}

export default [ handleCors, handleBodyRequestParsing, handleSession, handleCompression, handleAuth ];
