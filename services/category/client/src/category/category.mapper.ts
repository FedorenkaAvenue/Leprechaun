import { TransData, TransMap } from "gen/trans";
import CategoryEntity from "./category.entity";
import { Category } from "gen/category";
import { PropertyGroupPreview } from "gen/property_group";
import { CategoryPreview } from "gen/category_preview";
import { ProductPreview } from "gen/product";
import { CategoryPreviewPublic } from "gen/_category_preview";
import { QueryCommonParams } from "gen/common";

interface CategoryViewPayload {
    transMap: TransMap['items'],
    propertyGroups?: PropertyGroupPreview[],
    products: ProductPreview[]
}

export default class CategoryMapper {
    static toPreview(category: CategoryEntity, transMap: TransMap['items']): CategoryPreview {
        return {
            ...category,
            title: transMap[category.title],
            icon: category.icon && `http://localhost:9010${category.icon}`,
        }
    }

    static toPreviewPublic(
        this: QueryCommonParams,
        category: CategoryEntity,
        transMap: TransMap['items'],
    ): CategoryPreviewPublic {
        return {
            ...category,
            title: transMap[category.title][this.lang as keyof TransData],
            icon: category.icon && `http://localhost:9010${category.icon}`,
        }
    }

    static toView(
        category: CategoryEntity,
        { transMap, propertyGroups, products }: CategoryViewPayload,
    ): Category {
        return {
            ...this.toPreview(category, transMap),
            propertyGroups: propertyGroups || [],
            products,
        };
    }
}
