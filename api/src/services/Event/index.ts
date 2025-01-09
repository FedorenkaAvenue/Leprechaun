
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

import { singleConfigService } from '@services/Config';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { signedCookie } from 'cookie-parser';

const SESSION_SECRET_KEY = singleConfigService.getSessionSecretKey();

export class EventService implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private redisClient = createClient(singleConfigService.getSocketStoreConfig());

    constructor() {
        this.redisClient.connect();
    }

    protected async findSocketByUserId(userId: string): Promise<string | undefined> {
        const connections = await this.redisClient.hGetAll('user_sockets');

        return connections[userId];
    }

    protected async findUserIdBySocketId(socketId: string): Promise<string | undefined> {
        const users = await this.redisClient.hGetAll('user_sockets');

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

            this.redisClient.hSet('user_sockets', sessionId, client.id);
        } else {
            client.disconnect();
        }
    }

    public async handleDisconnect(client: Socket): Promise<void> {
        const userId = await this.findUserIdBySocketId(client.id);

        if (userId) await this.redisClient.hDel('user_sockets', userId);
    }
}

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(): Promise<void> {
        const pubClient = createClient(singleConfigService.getSocketStoreConfig());
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
