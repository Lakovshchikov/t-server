import { TReqComment, TResponse } from '@services/comment/commentTypes';
import NnModuleApi from '@services/comment/providers/nnModuleApi';

export default abstract class NNProvider {
    static predictComments = async (data: TReqComment[]): Promise<TResponse> => {
        const response: TResponse = await NnModuleApi.getPrediction(data);
        return response;
    };
}
