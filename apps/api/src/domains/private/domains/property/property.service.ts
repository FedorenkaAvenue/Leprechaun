import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { property_group_PACKAGE } from '../propertyGroup/propertyGroup.constants';
import { PROPERTY_SERVICE_NAME, PropertyServiceClient } from '@gen/property_group';
import { Empty } from '@gen/google/protobuf/empty';
import { catchResponceError } from '@pipes/operators';
import { Property, PropertyCU } from '@gen/_property';

@Injectable()
export default class PropertyPrivateService implements OnModuleInit {
    private propertyClient: PropertyServiceClient;

    constructor(@Inject(property_group_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.propertyClient = this.client.getService<PropertyServiceClient>(PROPERTY_SERVICE_NAME);
    }

    public async createProperty(property: PropertyCU): Promise<Property> {
        return lastValueFrom(this.propertyClient.createProperty(property).pipe(catchResponceError));
    }

    public async deleteProperty(id: Property['id']): Promise<Empty> {
        return await lastValueFrom(this.propertyClient.deleteProperty({ id }).pipe(catchResponceError));
    }
}
