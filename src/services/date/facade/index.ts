import dateController from '@services/date/controller';
import { IEventDate, TDateData } from '@services/date/types';

class DataFacade {
    static async getDateById(id: string): Promise<IEventDate> {
        const date = await dateController.getDateById(id);
        return date;
    }

    static async updateDate(data: TDateData): Promise<IEventDate> {
        const date = await dateController.updateDate(data);
        return date;
    }
}

export default DataFacade;
