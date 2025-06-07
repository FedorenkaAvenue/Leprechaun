import { ValidationPipe } from "@nestjs/common";
import { plainToInstance } from 'class-transformer';
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

import {
    PropertyGroup,
    PropertyGroupListPreview,
    PropertyGroupServiceController,
    PropertyGroupServiceControllerMethods,
    PropertyGroupCU,
    PropertyGroupSearchParams,
    PropertyGroupUpdateParams,
} from "gen/ts/prop_group";
import PropertyGroupService from "./propertyGroup.service";
import { PropertyGroupCreateDTO } from "./propertyGroup.dto";

@PropertyGroupServiceControllerMethods()
export default class PropertyGroupController implements PropertyGroupServiceController {
    private readonly validationPipe = new ValidationPipe({ transform: true });

    constructor(
        private readonly propertyGroupService: PropertyGroupService,
    ) { }

    async createGroup(body: PropertyGroupCU): Promise<PropertyGroup> {
        const dto = plainToInstance(PropertyGroupCreateDTO, body);

        try {
            await this.validationPipe.transform(dto, {
                type: 'body',
                metatype: PropertyGroupCreateDTO,
            });
        } catch (err: any) {
            throw new RpcException({ status: status.INVALID_ARGUMENT, message: err.response.message })
        }

        return this.propertyGroupService.createGroup(body);
    }

    async getGroupPrivate({ id }: PropertyGroupSearchParams): Promise<PropertyGroup> {
        return this.propertyGroupService.getGroup(id);
    }

    async getGroupListPrivate(): Promise<PropertyGroupListPreview> {
        const res = await this.propertyGroupService.getGroupList(true);

        return { items: res };
    }

    updateGroup({ id, data }: PropertyGroupUpdateParams): Promise<void> {
        return this.propertyGroupService.updateGroup(id, data);
    }
}
