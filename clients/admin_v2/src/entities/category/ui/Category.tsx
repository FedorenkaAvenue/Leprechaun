import { ReactNode } from "react";

import { CategoryModel } from "../model/Category";
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import ProductPreviewModel from "@entities/product/model/ProductPreview";

interface Props {
    category: CategoryModel | undefined
    renderPropertyGroups?: (p: PropertyGroupPreviewModel[] | undefined) => ReactNode
    renderProducts?: (p: ProductPreviewModel[] | undefined) => ReactNode
}

const Category = ({ category, renderPropertyGroups, renderProducts }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex">
                <div className="flex-1">
                    <div className="p-2">id: <b>{category?.id}</b></div>
                    <div className="p-2">url: <b>{category?.url}</b></div>
                    <div className="p-2">icon: <b>{category?.icon ? 'yes' : 'no'}</b></div>
                    <div className="p-2">comment: <b>{category?.comment}</b></div>
                    <div className="p-2">is public: <b>{category?.is_public ? 'yes' : 'no'}</b></div>
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
            {renderPropertyGroups?.call(null, category?.propertygroups)}
            {renderProducts?.call(null, category?.products)}
        </div>
    );
};

export default Category;
