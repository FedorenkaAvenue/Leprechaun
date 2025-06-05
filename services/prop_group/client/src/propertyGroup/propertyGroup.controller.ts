import {
    PropertyGroupListPreview, PropertyGroupServiceController, PropertyGroupServiceControllerMethods
} from "gen/ts/prop_group";
import PropertyGroupService from "./propertyGroup.service";

@PropertyGroupServiceControllerMethods()
export default class PropertyGroupController implements PropertyGroupServiceController {
    constructor(
        private readonly propertyGroupService: PropertyGroupService,
    ) { }

    async getGroupListPrivate(): Promise<PropertyGroupListPreview> {
        const res = await this.propertyGroupService.getGroupList(true);

        return { items: res };
    }
}
