import { TReqComment } from '@services/comment/commentTypes';
import NnModuleApi from '@services/comment/providers/nnModuleApi';

export default abstract class NNProvider {
    static predictComments = async (data: TReqComment[]): Promise<gt.TResponse> => {
        const response: gt.TResponse = await NnModuleApi.getPrediction(data);
        return response;
    };
}
