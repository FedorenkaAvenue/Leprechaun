import { TransData, TransMap } from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";
import {
    PropertyGroup, PropertyGroupPreview, PropertyGroupPreviewPublic,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { CategoryPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";

import { PropertyGroupEntity } from "./propertyGroup.entity";

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
