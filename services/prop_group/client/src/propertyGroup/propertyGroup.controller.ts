import { firstValueFrom, map, Observable, switchMap } from "rxjs";

import {
    PropertyGroup,
    PropertyGroupServiceController,
    PropertyGroupServiceControllerMethods,
    PropertyGroupCU,
    PropertyGroupSearchParams,
    PropertyGroupUpdateParams,
    PropertyGroupListPrivate,
    PropertyGroupListSearchParams,
    PropertyGroupListByCategorySearchParams,
    PropertyGroupMapPublicSearchParams,
    PropertyGroupPublicMap,
    PropertyGroupListPublic,
} from "gen/property_group";
import PropertyGroupService from "./propertyGroup.service";
import { PropertyGroupCreateDTO, PropertyGroupUpdateDTO } from "./propertyGroup.dto";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { PropertyListPrivateSearchParams, PropertyListPublicSearchParams } from "gen/property";

@PropertyGroupServiceControllerMethods()
export default class PropertyGroupController implements PropertyGroupServiceController {
    constructor(private readonly propertyGroupService: PropertyGroupService) { }

    @ValidateDTO(PropertyGroupCreateDTO)
    public async createGroup(body: PropertyGroupCU): Promise<PropertyGroup> {
        return firstValueFrom(this.propertyGroupService.createGroup(body));
    }

    public getGroupPrivate({ id }: PropertyGroupSearchParams): Observable<PropertyGroup> {
        return this.propertyGroupService.getGroupPrivate(id);
    }

    public getGroupListPrivate({ ids }: PropertyGroupListSearchParams): Observable<PropertyGroupListPrivate> {
        return this.propertyGroupService.getGroupListPrivate(ids).pipe(
            map(res => ({ items: res }))
        );
    }

    public getGroupListByPropertiesPrivate(
        { ids }: PropertyListPrivateSearchParams,
    ): Observable<PropertyGroupListPrivate> {
        return this.propertyGroupService.getGroupListPrivateByProperties(ids).pipe(
            map(res => ({ items: res }))
        );
    }

    getGroupListByPropertiesPublic({ ids, queries }: PropertyListPublicSearchParams): Observable<PropertyGroupListPublic> {
        return this.propertyGroupService.getGroupListPublicByProperties(ids, queries).pipe(
            map(res => ({ items: res }))
        )
    }

    public getGroupListByCategoryPrivate(
        { id }: PropertyGroupListByCategorySearchParams,
    ): Observable<PropertyGroupListPrivate> {
        return this.propertyGroupService.getGroupListPrivateByCategoryId(id).pipe(
            map(res => ({ items: res }))
        );
    }

    @ValidateDTO(PropertyGroupUpdateDTO, 'data')
    public updateGroup({ id, data }: PropertyGroupUpdateParams): Observable<void> {
        return this.propertyGroupService.updateGroup(id, data);
    }

    public deleteGroup({ id }: PropertyGroupSearchParams): Observable<void> {
        return this.propertyGroupService.deleteGroup(id);
    }

    public getGroupMapByPropertiesPublic(
        { entities, queries }: PropertyGroupMapPublicSearchParams,
    ): Observable<PropertyGroupPublicMap> {
        return this.propertyGroupService.getGroupMapPublicByProperties(entities, queries).pipe(
            map(res => res.reduce((acc, { product, options }) => ({
                ...acc,
                [product]: options,
            }), {})),
            map(res => ({ items: res }))
        );
    }
}
