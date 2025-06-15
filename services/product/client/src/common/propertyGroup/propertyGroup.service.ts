import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import {
    PROPERTY_GROUP_SERVICE_NAME, PROPERTY_SERVICE_NAME, PropertyGroupPreview, PropertyGroupServiceClient, PropertyServiceClient,
} from "gen/property_group";
import { Property } from "gen/_property";

@Injectable()
export default class PropertyGroupService implements OnModuleInit {
    private propertyClient: PropertyServiceClient;
    private propertyGroupClient: PropertyGroupServiceClient;

    constructor(
        @Inject('PROP_GROUP_PACKAGE') private client: ClientGrpc,
    ) { }

    onModuleInit() {
        this.propertyClient = this.client.getService<PropertyServiceClient>(PROPERTY_SERVICE_NAME);
        this.propertyGroupClient = this.client.getService<PropertyGroupServiceClient>(PROPERTY_GROUP_SERVICE_NAME);
    }

    getPropertyList(ids: Property['id'][]): Observable<Property[]> {
        return this.propertyClient.getPropertyList({ ids }).pipe(
            map(res => res.items)
        );
    }

    getOptions(properties: Property['id'][]): Observable<PropertyGroupPreview[]> {
        return this.propertyGroupClient.getGroupListPrivateByProperties({ ids: properties }).pipe(
            map(res => res.items)
        )
    }
}
