import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces"
import { Trans } from "@shared/models/interfaces"

export interface CategoryPreview {
    id: number,
    url: string,
    title: Trans,
    icon: string,
    comment: string,
    is_public: boolean,
}

export interface Category extends CategoryPreview {
    propertygroups: PropertyGroupPreview[]
    products: any[]
}
