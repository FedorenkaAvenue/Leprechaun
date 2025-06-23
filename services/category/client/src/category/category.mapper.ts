import { TransData, TransMap } from "gen/trans";
import CategoryEntity from "./category.entity";
import { Category, CategoryPublic } from "gen/category";
import { PropertyGroupPreview } from "gen/property_group";
import { CategoryPreview, CategoryPreviewPublic } from "gen/_category_preview";
import { ProductPreview } from "gen/product";
import { QueryCommonParams } from "gen/common";

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
