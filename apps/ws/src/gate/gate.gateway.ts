
import { Server, Socket } from 'socket.io';
// import { createClient } from 'redis';
// import { signedCookie } from 'cookie-parser';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { EventHistoryProduct } from '@fedorenkaavenue/leprechaun_lib_entities/types/events';
import { WSEvents } from '@fedorenkaavenue/leprechaun_lib_entities/enums/events';

@WebSocketGateway(80, {
    cors: { origin: '*', credentials: true },
    namespace: 'user',
    transports: ['websocket'],
})
export class GateGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    connections: Map<string, Socket>;

    constructor() {
        // this.redisClient.connect();
        this.connections = new Map(); // [userID: { socker: id, sockerId: number }]
    }

    public async pushToProductHistory({ user, product }: EventHistoryProduct): Promise<void> {
        const userSocket = this.findSocketByUserId(user);

        if (userSocket) this.server.to(userSocket.id).emit(WSEvents.PRODUCT_HISTORY_PUSH, product);
    }

    private findSocketByUserId(userId: string): Socket | undefined {
        return this.connections.get(userId);
    }

    private findUserIdBySocketId(socketId: string): string | undefined {
        return [...this.connections.entries()].find(([userId, socket]) => socket.id === socketId)?.[0];
    }

    public handleConnection(client: Socket): void {
        const sessionCookie = client.handshake.headers.cookie?.
            split('; ').
            find((cookie: string) => cookie.startsWith('session'))?.
            split('=')[1];

        if (sessionCookie) {
            this.connections.set(sessionCookie, client);
        } else {
            client.disconnect();
        }
    }

    public handleDisconnect(client: Socket): void {
        const userId = this.findUserIdBySocketId(client.id);

        if (userId) this.connections.delete(userId);
    }
}
