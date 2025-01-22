import { CategoryPreview } from "@entities/category/model/interfaces"
import { Property } from "@entities/property/model/interfaces"
import { Trans } from "@shared/models/interfaces"

export interface PropertyGroupPreview {
    id: number
    title: Trans
    alt_name: string
    is_primary: boolean
    properties: Property[]
    comment: string
}

export interface PropertyGroup extends PropertyGroupPreview {
    categories: CategoryPreview[]
}
