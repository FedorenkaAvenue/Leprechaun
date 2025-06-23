import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import {
    PROPERTY_GROUP_SERVICE_NAME, PropertyGroupListPrivate, PropertyGroupListSearchParams, PropertyGroupServiceClient,
} from "gen/property_group";

@Injectable()
export default class PropertyGroupService implements OnModuleInit {
    private propgroupClient: PropertyGroupServiceClient;

    constructor(@Inject('PROP_GROUP_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.propgroupClient = this.client.getService<PropertyGroupServiceClient>(PROPERTY_GROUP_SERVICE_NAME);
    }

    getGroupListPrivate(params: PropertyGroupListSearchParams): Observable<PropertyGroupListPrivate> {
        return this.propgroupClient.getGroupListPrivate(params);
    }
}
