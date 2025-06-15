import { TransMap } from "gen/trans";
import CategoryEntity from "./category.entity";
import { Category } from "gen/category";
import { PropertyGroupPreview } from "gen/property_group";
import { CategoryPreview } from "gen/category_preview";
import { ProductPreview } from "gen/product";

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
