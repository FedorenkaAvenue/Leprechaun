import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
    PROPERTY_GROUP_SERVICE_NAME, PropertyGroup, PropertyGroupCU, PropertyGroupPreview, PropertyGroupServiceClient,
    PropertyGroupUpdateParams,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';
import { Empty } from '@fedorenkaavenue/leprechaun_lib_entities/server/google/protobuf/empty';
import { Category } from '@fedorenkaavenue/leprechaun_lib_entities/server/category';

import { PROPERTY_GROUP_PACKAGE } from './propertyGroup.constants';
import { catchResponceError } from '@pipes/operators';

@Injectable()
export default class PropertyGroupPrivateService implements OnModuleInit {
    private propGroupClient: PropertyGroupServiceClient;

    constructor(@Inject(PROPERTY_GROUP_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.propGroupClient = this.client.getService<PropertyGroupServiceClient>(PROPERTY_GROUP_SERVICE_NAME);
    }

    public async createGroup(newGroup: PropertyGroupCU): Promise<PropertyGroup> {
        return lastValueFrom(this.propGroupClient.createGroup(newGroup).pipe(catchResponceError));
    }

    public async getGroupPrivate(id: PropertyGroup['id']): Promise<PropertyGroup> {
        return await lastValueFrom(this.propGroupClient.getGroupPrivate({ id }).pipe(catchResponceError));
    }

    public async getGroupListPrivate(): Promise<PropertyGroupPreview[]> {
        const { items } = await lastValueFrom(
            this.propGroupClient.getGroupListPrivate({ ids: [] }).pipe(catchResponceError)
        );

        return items;
    }

    public async getGroupListByCategoryID(id: Category['id']): Promise<PropertyGroupPreview[]> {
        const { items } = await lastValueFrom(
            this.propGroupClient.getGroupListByCategoryPrivate({ id }).pipe(catchResponceError)
        );

        return items;
    }

    async updateGroup(updates: PropertyGroupUpdateParams): Promise<Empty> {
        return await lastValueFrom(this.propGroupClient.updateGroup(updates).pipe(catchResponceError));
    }

    public async deleteGroup(groupId: number): Promise<Empty> {
        return this.propGroupClient.deleteGroup({ id: groupId }).pipe(catchResponceError);
    }
}
