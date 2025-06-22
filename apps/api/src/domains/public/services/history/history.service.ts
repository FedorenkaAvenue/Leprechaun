import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

import { catchResponceError } from '@pipes/operators';
import { User } from '@gen/user';
import { QueryCommonParams } from '@gen/common';
import { HISTORY_PACKAGE } from './wishlist.constants';
import { HISTORY_SERVICE_NAME, HistoryPublic, HistoryServiceClient } from '@gen/history';

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
