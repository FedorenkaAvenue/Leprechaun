import { PropertyGroup, PropertyGroupPreview } from "gen/property_group";
import { PropertyGroupEntity } from "./propertyGroup.entity";
import { TransMap } from "gen/trans";
import { CategoryPreview } from "gen/category_preview";

export default class PropertyGroupMapper {
    static toPreview(group: PropertyGroupEntity, transMap: TransMap['items']): PropertyGroupPreview {
        return {
            ...group,
            title: transMap[group.title],
            properties: group.properties.map(prop => ({ ...prop, title: transMap[prop.title] })),
        };
    }

    static toView(group: PropertyGroupEntity, transMap: TransMap['items'], categories: CategoryPreview[]): PropertyGroup {
        return {
            ...this.toPreview(group, transMap),
            properties: group.properties.map(prop => ({
                ...prop,
                title: transMap[prop.title],
            })),
            categories,
        };
    }
}
