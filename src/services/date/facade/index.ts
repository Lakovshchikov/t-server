import dateController from '@services/date/dateController';
import { IEventDate } from '@services/date/dateTypes';

class DataFacade {
    static async getDateById(id: string): Promise<IEventDate> {
        const date = dateController.getDateById(id);
        return date;
    }
}

export default DataFacade;
