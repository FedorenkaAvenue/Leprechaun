import { firstValueFrom } from "rxjs";

import {
    PropertyGroup,
    PropertyGroupServiceController,
    PropertyGroupServiceControllerMethods,
    PropertyGroupCU,
    PropertyGroupSearchParams,
    PropertyGroupUpdateParams,
    PropertyGroupList,
} from "gen/ts/prop_group";
import PropertyGroupService from "./propertyGroup.service";
import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from "./propertyGroup.dto";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";

@PropertyGroupServiceControllerMethods()
export default class PropertyGroupController implements PropertyGroupServiceController {
    constructor(
        private readonly propertyGroupService: PropertyGroupService,
    ) { }

    @ValidateDTO(PropertyGroupCreateDTO)
    public async createGroup(body: PropertyGroupCU): Promise<PropertyGroup> {
        return firstValueFrom(this.propertyGroupService.createGroup(body));
    }

    public async getGroupPrivate({ id }: PropertyGroupSearchParams): Promise<PropertyGroup> {
        return this.propertyGroupService.getGroup(id);
    }

    public async getGroupListPrivate(): Promise<PropertyGroupList> {
        const res = await this.propertyGroupService.getGroupList(true);

        return { items: res };
    }

    @ValidateDTO(PropertyGroupUpdateDTO, 'data')
    public async updateGroup({ id, data }: PropertyGroupUpdateParams): Promise<void> {
        return this.propertyGroupService.updateGroup(id, data);
    }
}
