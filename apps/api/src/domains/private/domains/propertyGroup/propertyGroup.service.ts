import { ClientGrpc } from '@nestjs/microservices';
import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import {
    PROPERTY_GROUP_SERVICE_NAME, PropertyGroup, PropertyGroupCU, PropertyGroupServiceClient,
    PropertyGroupUpdateParams,
} from '@gen/prop_group';
import { Empty } from '@gen/google/protobuf/empty';
import { PROP_GROUP_PACKAGE } from './propertyGroup.constants';

@Injectable()
export default class PropertyGroupPrivateService implements OnModuleInit {
    private propGroupClient: PropertyGroupServiceClient;

    constructor(@Inject(PROP_GROUP_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.propGroupClient = this.client.getService<PropertyGroupServiceClient>(PROPERTY_GROUP_SERVICE_NAME);
    }

    public async createGroup(newGroup: PropertyGroupCU): Promise<PropertyGroup> {
        return lastValueFrom(
            this.propGroupClient.createGroup(newGroup).pipe(
                catchError(({ details }) => throwError(() => new BadRequestException(details)))
            )
        );
    }

    public async getGroupPrivate(id: PropertyGroup['id']): Promise<PropertyGroup> {
        return await lastValueFrom(
            this.propGroupClient.getGroupPrivate({ id }).pipe(
                catchError(({ details }) => throwError(() => new NotFoundException(details)))
            )
        );
    }

    public async getGroupListPrivate(): Promise<PropertyGroup[]> {
        const { items } = await lastValueFrom(this.propGroupClient.getGroupListPrivate({}));

        return items || [];
    }

    // public async getGroupListByCategoryID(id: CategoryI['id']): Promise<PropertyGroupPreviewI[]> {
    //     return await this.propertyGroupRepo.find({
    //         where: { categories: { id } },
    //     });
    // }

    async updateGroup(updates: PropertyGroupUpdateParams): Promise<Empty> {
        return await lastValueFrom(this.propGroupClient.updateGroup(updates));
    }

    // public async deleteGroup(groupId: number): Promise<DeleteResult> {
    //     return await this.propertyGroupRepo.delete({ id: groupId });
    // }
}
