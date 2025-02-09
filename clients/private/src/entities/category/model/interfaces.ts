import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces"
import { Trans } from "@shared/models/interfaces"

export interface CategoryPreview {
    id: number,
    url: string,
    title: Trans,
    icon: string,
    comment: string,
    is_public: boolean,
    created_at: Date;
    updated_at: Date;
}

export interface Category extends CategoryPreview {
    propertygroups: PropertyGroupPreview[]
    products: any[]
}
