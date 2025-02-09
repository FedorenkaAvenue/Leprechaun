
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
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
export class EventService implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private redisClient = createClient(config.getSocketStoreConfig());

    constructor() {
        this.redisClient.connect();
    }

    public async pushToProductHistory(userId: string, product: any): Promise<void> {
        const userSocket = await this.findSocketByUserId(userId);

        if (userSocket) this.server.to(userSocket).emit('push_product_history', product);
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

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(): Promise<void> {
        const pubClient = createClient(config.getSocketStoreConfig());
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);

        server.adapter(this.adapterConstructor);

        return server;
    }
}