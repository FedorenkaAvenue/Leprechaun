import { PropertyGroup, PropertyGroupPreview, PropertyGroupPreviewPublic } from "gen/property_group";
import { PropertyGroupEntity } from "./propertyGroup.entity";
import { TransData, TransMap } from "gen/trans";
import { CategoryPreview } from "gen/_category_preview";
import { QueryCommonParams } from "gen/common";

export default class PropertyGroupMapper {
    static toPreview(group: PropertyGroupEntity, transMap: TransMap['items']): PropertyGroupPreview {
        return {
            ...group,
            title: transMap[group.title],
            properties: group.properties.map(prop => ({ ...prop, title: transMap[prop.title] })),
        };
    }


    static toPreviewPublic(
        this: QueryCommonParams,
        group: PropertyGroupEntity,
        transMap: TransMap['items'],
    ): PropertyGroupPreviewPublic {
        return {
            ...group,
            title: transMap[group.title][this.lang as keyof TransData],
            properties: group.properties.map(prop => ({
                ...prop,
                title: transMap[prop.title][this.lang as keyof TransData],
            })),
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
