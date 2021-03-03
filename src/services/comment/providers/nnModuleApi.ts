import fetch, { RequestInit, Response } from 'node-fetch';
import { TResponse, TReqComment, TNNComment } from '@services/comment/commentTypes';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = `${process.env.NN_SERVER_PROTOCOL}://${
    process.env.NN_SERVER_HOST}:${process.env.NN_SERVER_PORT}`;

export default abstract class NnModuleApi {
    static async getPrediction(data: TReqComment[]): Promise<TResponse> {
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
            return {
                isSuccess: true,
                data: respJson
            };
        } catch (e) {
            return this.sendError('NNModule Request error', e);
        }
    }

    private static sendError(message: string, e: any): TResponse {
        return {
            isSuccess: false,
            error: {
                message: message,
                data: e
            }
        };
    }
}
