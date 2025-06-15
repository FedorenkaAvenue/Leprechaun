import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import {
    Trans,
    TRANS_SERVICE_NAME,
    TransData,
    TransList,
    TransListSearchParams,
    TransMap,
    TransSearchParams,
    TransServiceClient,
    TransUpdateParams,
} from "gen/trans";
import { Empty } from "gen/google/protobuf/empty";
import { TRANS_PACKAGE } from "./trans.constants";

@Injectable()
export default class TransService implements OnModuleInit {
    private transClient: TransServiceClient;

    constructor(@Inject(TRANS_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.transClient = this.client.getService<TransServiceClient>(TRANS_SERVICE_NAME);
    }

    getTrans(data: TransSearchParams): Observable<Trans> {
        return this.transClient.getTrans(data);
    }

    getTransList(data: TransListSearchParams): Observable<TransList> {
        return this.transClient.getTransList(data);
    }

    getTransMap(data: TransListSearchParams): Observable<TransMap> {
        return this.transClient.getTransMap(data);
    }

    createTrans(data: TransData): Observable<Trans> {
        return this.transClient.createTrans(data);
    }

    updateTrans(data: TransUpdateParams): Observable<Empty> {
        return this.transClient.updateTrans(data);
    }

    deleteTrans(data: TransSearchParams): Observable<Empty> {
        return this.transClient.deleteTrans(data);
    }
}
