import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces"
import { Trans } from "@shared/models/interfaces"

export interface CategoryPreview {
    id: number,
    url: string,
    title: Trans,
    icon: string,
    comment: string,
    isPublic: boolean,
    createdAt: Date;
    updatedAt: Date;
}

export interface Category extends CategoryPreview {
    propertyGroups: PropertyGroupPreview[]
    products: any[]
}
