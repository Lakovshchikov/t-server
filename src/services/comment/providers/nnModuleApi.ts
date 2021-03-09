import fetch, { RequestInit, Response } from 'node-fetch';
import { TReqComment, TNNComment } from '@services/comment/types';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

dotenv.config();

const baseUrl = `${process.env.NN_SERVER_PROTOCOL}://${
    process.env.NN_SERVER_HOST}:${process.env.NN_SERVER_PORT}`;

export default abstract class NnModuleApi {
    static async getPrediction(data: TReqComment[]): Promise<TNNComment[]> {
        try {
            const opt: RequestInit = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response: Response = await fetch(`${baseUrl}/prediction`, opt);
            const respJson = await response.json() as TNNComment[];
            return respJson;
        } catch (e) {
            throw createHttpError(500, 'NNModule Request error', e);
        }
    }
}
