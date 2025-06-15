import { ReactNode } from "react";

import { CategoryPreview } from "@gen/_category_preview";
import { Property } from "@gen/_property";
import { PropertyGroup } from "@gen/property_group";

interface Props {
    group: PropertyGroup | undefined
    renderCategories?: (c: CategoryPreview[] | undefined) => ReactNode
    renderProperties?: (c: Property[] | undefined) => ReactNode
}

const PropertyGroupEntity = ({ group, renderCategories, renderProperties }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap">
                <div className="flex-1">
                    <div>id: <b>{group?.id}</b></div>
                    <div>alt name: <b>{group?.altName}</b></div>
                    <div>is primary: <b>{group?.isPrimary ? 'yes' : 'no'}</b></div>
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

export default PropertyGroupEntity;
