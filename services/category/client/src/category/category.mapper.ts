import { TransMap } from "gen/ts/trans";
import CategoryEntity from "./category.entity";
import { Category } from "gen/ts/category";
import { PropertyGroupPreview } from "gen/ts/prop_group";
import { CategoryPreview } from "gen/ts/category_preview";

export default class CategoryMapper {
    static toPreview(category: CategoryEntity, transMap: TransMap['items']): CategoryPreview {
        return {
            ...category,
            title: transMap[category.title],
            icon: `http://localhost:9010${category.icon}`,
        }
    }

    static toView(
        category: CategoryEntity,
        transMap: TransMap['items'],
        propertyGroups?: PropertyGroupPreview[],
    ): Category {
        return {
            ...this.toPreview(category, transMap),
            propertyGroups: propertyGroups || [],
        };
    }
}
