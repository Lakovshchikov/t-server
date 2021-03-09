import dateController from '@services/date/controller';
import { IEventDate } from '@services/date/types';

class DataFacade {
    static async getDateById(id: string): Promise<IEventDate> {
        const date = dateController.getDateById(id);
        return date;
    }
}

export default DataFacade;
