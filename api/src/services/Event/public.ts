import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createClient } from 'redis';

import { ProductPreviewPublic } from '@dto/Product/public';
import { singleConfigService } from '@services/Config';

@WebSocketGateway(81, {
    cors: { origin: '*', credentials: true },
    namespace: 'user',
    transports: ['websocket'],

})
export class EventPublicService implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private redisClient = createClient(singleConfigService.getSocketStoreConfig());

    constructor() {
        this.redisClient.connect();
    }

    public async pushToProductHistory(userId: string, product: ProductPreviewPublic): Promise<void> {
        const userSocket = await this.findSocketByUserId(userId);

        if (userSocket) this.server.to(userSocket).emit('push_product_history', product);
    }

    // tools

    private async findSocketByUserId(userId: string): Promise<string | undefined> {
        const connections = await this.redisClient.hGetAll('user_sockets');

        return connections[userId];
    }

    private async findUserIdBySocketId(socketId: string): Promise<string | undefined> {
        const users = await this.redisClient.hGetAll('user_sockets');

        return Object.keys(users).find((userId) => users[userId] === socketId);
    }

    async handleConnection(client: Socket): Promise<void> {
        // const cookie = client.handshake.headers.cookie;

        // console.log(cookie);

        // if (cookie) {
        //     await this.redisClient.hSet('user_sockets', 100, client.id);
        //     console.log(`Created user ${cookie} with ${client.id} socket`);
        // } else {
        //     console.log('force disconnecting...');

        //     client.disconnect();
        // }
    }

    async handleDisconnect(client: Socket): Promise<void> {
        const userId = await this.findUserIdBySocketId(client.id);

        if (userId) this.redisClient.hDel('user_sockets', userId);
    }
}
