import { ProductPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { PropertyGroupPreview } from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";
import { TransData, TransMap } from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";
import { CategoryPreview, CategoryPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";
import { QueryCommonParams } from "@fedorenkaavenue/leprechaun_lib_entities/server/common";
import { Category, CategoryPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/category";

import CategoryEntity from "./category.entity";

interface CategoryViewPrivatePayload {
    transMap: TransMap['items'],
    propertyGroups?: PropertyGroupPreview[],
    products: ProductPreview[]
}

interface CategoryViewPublicPayload {
    transMap: TransMap['items'],
}

export default class CategoryMapper {
    static toPreviewPrivate(
        category: CategoryEntity,
        transMap: TransMap['items'],
    ): CategoryPreview {
        return {
            ...category,
            title: transMap[category.title],
            icon: category.icon && `http://localhost:9010${category.icon}`,
        }
    }

    static toPreviewPublic(
        this: QueryCommonParams,
        { id, url, ...category }: CategoryEntity,
        transMap: TransMap['items'],
    ): CategoryPreviewPublic {
        return {
            id, url,
            title: transMap[category.title][this.lang as keyof TransData],
            icon: category.icon && `http://localhost:9010${category.icon}`,
        }
    }

    static toViewPrivate(
        category: CategoryEntity,
        { transMap, propertyGroups, products }: CategoryViewPrivatePayload,
    ): Category {
        return {
            ...category,
            title: transMap[category.title],
            propertyGroups: propertyGroups || [],
            products,
        };
    }

    static toViewPublic(
        this: QueryCommonParams,
        { id, icon, url, ...category }: CategoryEntity,
        { transMap }: CategoryViewPublicPayload,
    ): CategoryPublic {
        return {
            id, url, icon,
            title: transMap[category.title][this.lang as keyof TransData],
        };
    }
}
