import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import { PROP_GROUP_PACKAGE } from '../propertyGroup/propertyGroup.constants';
import { Property, PROPERTY_SERVICE_NAME, PropertyCU, PropertyServiceClient } from '@gen/prop_group';
import { Empty } from '@gen/google/protobuf/empty';

@Injectable()
export default class PropertyPrivateService implements OnModuleInit {
    private propertyClient: PropertyServiceClient;

    constructor(@Inject(PROP_GROUP_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.propertyClient = this.client.getService<PropertyServiceClient>(PROPERTY_SERVICE_NAME);
    }

    public async createProperty(property: PropertyCU): Promise<Property> {
        return lastValueFrom(
            this.propertyClient.createProperty(property).pipe(
                catchError(({ details }) => throwError(() => new BadRequestException(details)))
            )
        );
    }

    public async deleteProperty(id: Property['id']): Promise<Empty> {
        return await lastValueFrom(
            this.propertyClient.deleteProperty({ id }).pipe(
                catchError(({ details }) => throwError(() => new NotFoundException(details)))
            )
        );
    }
}
