
import { Server, Socket } from 'socket.io';
import { createClient } from 'redis';
import { signedCookie } from 'cookie-parser';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import ConfigService from '@core/config/config.service';

const config = new ConfigService();

const SESSION_SECRET_KEY = config.getSessionSecretKey();
const USER_SOCKETS_KEY = 'user_sockets';

@WebSocketGateway(80, {
    cors: { origin: '*', credentials: true },
    namespace: 'user',
    transports: ['websocket'],
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private redisClient = createClient(config.getSocketStoreConfig());

    constructor() {
        this.redisClient.connect();
    }

    protected async getAllConnections(): Promise<Record<string, string>> {
        return await this.redisClient.hGetAll(USER_SOCKETS_KEY);
    }

    protected async findSocketByUserId(userId: string): Promise<string | undefined> {
        const connections = await this.getAllConnections();

        return connections[userId];
    }

    protected async findUserIdBySocketId(socketId: string): Promise<string | undefined> {
        const users = await this.getAllConnections();

        return Object.keys(users).find((userId) => users[userId] === socketId);
    }

    public handleConnection(client: Socket): void {
        const sessionCookie = client.handshake.headers.cookie?.
            split('; ').
            find((cookie: string) => cookie.startsWith('session'))?.
            split('=')[1];

        if (sessionCookie) {
            const sessionId = signedCookie(
                decodeURIComponent(decodeURIComponent(sessionCookie)),
                SESSION_SECRET_KEY,
            ) as string;

            this.redisClient.hSet(USER_SOCKETS_KEY, sessionId, client.id);
        } else {
            client.disconnect();
        }
    }

    public async handleDisconnect(client: Socket): Promise<void> {
        const userId = await this.findUserIdBySocketId(client.id);

        if (userId) await this.redisClient.hDel(USER_SOCKETS_KEY, userId);
    }
}
