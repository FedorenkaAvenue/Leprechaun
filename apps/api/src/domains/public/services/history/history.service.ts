import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import {
    HISTORY_SERVICE_NAME, HistoryPublic, HistoryServiceClient,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/history';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';
import { QueryCommonParams } from '@fedorenkaavenue/leprechaun_lib_entities/server/common';

import { HISTORY_PACKAGE } from './wishlist.constants';
import { catchResponceError } from '@pipes/operators';

@Injectable()
export default class HistoryPublicService implements OnModuleInit {
    private historyClient: HistoryServiceClient;

    constructor(@Inject(HISTORY_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.historyClient = this.client.getService<HistoryServiceClient>(HISTORY_SERVICE_NAME);
    }

    public async getHistoryList(user: User['id'], queries: QueryCommonParams): Promise<HistoryPublic[]> {
        return lastValueFrom(
            this.historyClient.getHistoryListPublic({ user, queries }).pipe(
                map(res => res.items),
                catchResponceError,
            )
        );
    }
}
