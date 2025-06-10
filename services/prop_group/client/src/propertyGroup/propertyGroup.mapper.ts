import { PropertyGroup, PropertyGroupPreview } from "gen/ts/prop_group";
import { PropertyGroupEntity } from "./propertyGroup.entity";
import { TransMap } from "gen/ts/trans";

export default class PropertyGroupMapper {
    static toPreview(group: PropertyGroupEntity, transMap: TransMap['items']): PropertyGroupPreview {
        return {
            ...group,
            title: transMap[group.title],
        };
    }

    static toView(group: PropertyGroupEntity, transMap: TransMap['items']): PropertyGroup {
        return {
            ...this.toPreview(group, transMap),
            properties: group.properties.map(prop => ({ ...prop, title: transMap[prop.title] }))
        };
    }
}
