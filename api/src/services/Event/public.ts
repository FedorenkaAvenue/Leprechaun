import { WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ProductPreviewPublic } from '@dto/Product/public';

@WebSocketGateway(8080, {
    cors: { origin: '*', credentials: true },
    namespace: 'user',
    transports: ['websocket'],
})
export class EventPublicService {
    @WebSocketServer()
    server: Server;

    public pushToProductHistory(userId: any, product: ProductPreviewPublic): void {
        this.server
        this.server.emit('push_product_history', product);
    }
}
