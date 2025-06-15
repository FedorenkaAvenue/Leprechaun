import { ReactNode } from "react";

import { Category } from "@gen/category";
import { ProductPreview } from "@gen/product";
import { PropertyGroupPreview } from "@gen/property_group";

interface Props {
    category: Category | undefined
    renderPropertyGroups?: (p: PropertyGroupPreview[] | undefined) => ReactNode
    renderProducts?: (p: ProductPreview[] | undefined) => ReactNode
}

const CategoryEntity = ({ category, renderPropertyGroups, renderProducts }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap">
                <div className="flex-1">
                    <div className="p-2">id: <b>{category?.id}</b></div>
                    <div className="p-2">url: <b>{category?.url}</b></div>
                    <div className="p-2 flex items-center gap-2">
                        icon: {category?.icon ? <img src={category.icon} /> : <b>no</b>}
                    </div>
                    <div className="p-2">comment: <b>{category?.comment}</b></div>
                    <div className="p-2">is public: <b>{category?.isPublic ? 'yes' : 'no'}</b></div>
                </div>
                <div className="flex-1">
                    title:
                    <ul>
                        <li><b>{category?.title.en}</b></li>
                        <li><b>{category?.title.ua}</b></li>
                        <li><b>{category?.title.ru}</b></li>
                    </ul>
                </div>
            </div>
            {renderPropertyGroups?.call(null, category?.propertyGroups)}
            {renderProducts?.call(null, category?.products)}
        </div>
    );
};

export default CategoryEntity;
