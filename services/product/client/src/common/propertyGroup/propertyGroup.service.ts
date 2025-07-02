import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";
import {
    PROPERTY_GROUP_SERVICE_NAME,
    PROPERTY_SERVICE_NAME,
    PropertyGroupPreview,
    PropertyGroupPublicMap,
    PropertyGroupServiceClient,
    PropertyServiceClient,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";
import { Property } from "@fedorenkaavenue/leprechaun_lib_entities/server/property";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

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

    public getPropertyList(ids: Property['id'][]): Observable<Property[]> {
        return this.propertyClient.getPropertyList({ ids }).pipe(
            map(res => res.items)
        );
    }

    public getProductPrivateOptions(properties: Property['id'][]): Observable<PropertyGroupPreview[]> {
        return this.propertyGroupClient.getGroupListByPropertiesPrivate({ ids: properties }).pipe(
            map(res => res.items)
        )
    }

    public getProductOptionsPublicMap(
        entities: Array<{ product: Product['id']; properties: Property['id'][] }>,
        queries: QueryCommonParams,
    ): Observable<PropertyGroupPublicMap['items']> {
        return this.propertyGroupClient.getGroupMapByPropertiesPublic({ entities, queries }).pipe(
            map(res => res.items)
        );
    }
}
