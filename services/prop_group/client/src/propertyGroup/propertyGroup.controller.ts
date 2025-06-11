import { firstValueFrom, map, Observable } from "rxjs";

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

    public getGroupListPrivate({ ids }: PropertyGroupListSearchParams): Observable<PropertyGroupList> {
        return this.propertyGroupService.getGroupList(ids).pipe(
            map(res => ({ items: res }))
        );
    }

    @ValidateDTO(PropertyGroupCreateDTO)
    public async createGroup(body: PropertyGroupCU): Promise<PropertyGroup> {
        return firstValueFrom(this.propertyGroupService.createGroup(body));
    }

    public getGroupPrivate({ id }: PropertyGroupSearchParams): Observable<PropertyGroup> {
        return this.propertyGroupService.getGroup(id);
    }

    @ValidateDTO(PropertyGroupUpdateDTO, 'data')
    public updateGroup({ id, data }: PropertyGroupUpdateParams): Observable<void> {
        return this.propertyGroupService.updateGroup(id, data);
    }

    deleteGroup({ id }: PropertyGroupSearchParams): Observable<void> {
        return this.propertyGroupService.deleteGroup(id);
    }
}
