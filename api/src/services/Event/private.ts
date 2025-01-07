import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Server } from 'socket.io';
import { instrument } from "@socket.io/admin-ui";

import { singleConfigService } from '@services/Config';

@WebSocketGateway(81, {
    cors: { origin: '*' },
    namespace: 'admin',
    transports: ['websocket'],
})
export class EventPrivateService implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    afterInit(nameSpace: Namespace) {
        instrument(nameSpace.server, {
            auth: false,
            mode: "development",
            readonly: !singleConfigService.isDev,
        });
    }
}
