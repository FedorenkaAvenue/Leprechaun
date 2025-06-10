import { firstValueFrom } from "rxjs";

import {
    PropertyGroup,
    PropertyGroupServiceController,
    PropertyGroupServiceControllerMethods,
    PropertyGroupCU,
    PropertyGroupSearchParams,
    PropertyGroupUpdateParams,
    PropertyGroupList,
    PropertyGroupListSearchParams,
} from "gen/ts/prop_group";
import PropertyGroupService from "./propertyGroup.service";
import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from "./propertyGroup.dto";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";

@PropertyGroupServiceControllerMethods()
export default class PropertyGroupController implements PropertyGroupServiceController {
    constructor(private readonly propertyGroupService: PropertyGroupService) { }

    public async getGroupListPrivate({ ids }: PropertyGroupListSearchParams): Promise<PropertyGroupList> {
        const res = await this.propertyGroupService.getGroupList(ids);

        return { items: res };
    }

    @ValidateDTO(PropertyGroupCreateDTO)
    public async createGroup(body: PropertyGroupCU): Promise<PropertyGroup> {
        return firstValueFrom(this.propertyGroupService.createGroup(body));
    }

    public async getGroupPrivate({ id }: PropertyGroupSearchParams): Promise<PropertyGroup> {
        return this.propertyGroupService.getGroup(id);
    }

    @ValidateDTO(PropertyGroupUpdateDTO, 'data')
    public async updateGroup({ id, data }: PropertyGroupUpdateParams): Promise<void> {
        return this.propertyGroupService.updateGroup(id, data);
    }
}
