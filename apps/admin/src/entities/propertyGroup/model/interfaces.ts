import { CategoryPreview } from "@entities/category/model/interfaces"
import { Property } from "@entities/property/model/interfaces"
import { Trans } from "@shared/models/interfaces"

export interface PropertyGroupPreview {
    id: number
    title: Trans
    altName: string
    isPrimary: boolean
    comment: string
}

export interface PropertyGroup extends PropertyGroupPreview {
    properties: Property[]
    categories: CategoryPreview[]
}
