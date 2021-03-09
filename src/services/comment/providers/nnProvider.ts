import { TNNComment, TReqComment } from '@services/comment/types';
import NnModuleApi from '@services/comment/providers/nnModuleApi';

export default abstract class NNProvider {
    static predictComments = async (data: TReqComment[]): Promise<TNNComment[]> => {
        const comments = await NnModuleApi.getPrediction(data);
        return comments;
    };
}
