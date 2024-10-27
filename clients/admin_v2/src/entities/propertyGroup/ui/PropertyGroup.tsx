import { ReactNode } from "react";
import PropertyGroupModel from "../model/PropertyGroupPreview";
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";
import PropertyModel from "@entities/property/model/Property";

interface Props {
    group: PropertyGroupModel | undefined
    renderCategories?: (c: CategoryPreviewModel[] | undefined) => ReactNode
    renderProperties?: (c: PropertyModel[] | undefined) => ReactNode
}

const PropertyGroup = ({ group, renderCategories, renderProperties }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex">
                <div className="flex-1">
                    <div>id: <b>{group?.id}</b></div>
                    <div>alt name: <b>{group?.alt_name}</b></div>
                    <div>is primary: <b>{group?.is_primary ? 'yes' : 'no'}</b></div>
                    <div>comment: <b>{group?.comment}</b></div>
                </div>
                <div className="flex-1">
                    title
                    <ul>
                        <li>en: <b>{group?.title.en}</b></li>
                        <li>ru: <b>{group?.title.ru}</b></li>
                        <li>ua: <b>{group?.title.ua}</b></li>
                    </ul>
                </div>
            </div>
            {renderCategories?.call(null, group?.categories)}
            {renderProperties?.call(null, group?.properties)}
        </div>
    );
};

export default PropertyGroup;
