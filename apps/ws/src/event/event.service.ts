import { EventGateway } from './event.gateway';

import { EventHistoryProductPushDTO } from '@core/event/event.dto';
import { Event } from '@core/event/event.enum';

export class EventService extends EventGateway {
    public async pushToProductHistory({ userId, product }: EventHistoryProductPushDTO<any>): Promise<void> {
        const userSocket = await this.findSocketByUserId(userId);

        if (userSocket) this.server.to(userSocket).emit(Event.HISTORY_PRODUCT_PUSH, product);
    }
}
