import { WebSocketGateway, WsResponse } from '@nestjs/websockets';

import { ProductPreviewPublic } from '@dto/Product/public';
import { EventService } from '.';

@WebSocketGateway(81, {
    cors: { origin: '*', credentials: true },
    namespace: 'user',
    transports: ['websocket'],
})
export class EventPublicService extends EventService {
    public async pushToProductHistory(userId: string, product: ProductPreviewPublic): Promise<void> {
        const userSocket = await this.findSocketByUserId(userId);

        if (userSocket) this.server.to(userSocket).emit('push_product_history', product);
    }
}
