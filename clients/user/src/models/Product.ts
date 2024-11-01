import { ImageModel } from "./Image"

enum ProductStatus {
    AVAILABLE = 1,
    OUT_OF_STOCK,
}

export interface PriceModel {
    current: number
    old?: number
}

export enum Label {
    DISCOUNT = 'discount',
    NEW = 'new',
    POPULAR = 'popular',
}

export interface LabelModel {
    type: Label
    value: string
}

interface OptionModel {
    id: number
    title: string,
    alt_name: string
    properties: OptionProperty[]
}

interface OptionProperty {
    id: number
    title: string
    alt_name: string
}

export enum ProductSort {
    POPULAR = 1,
    PRICE_UP,
    PRICE_DOWN,
    NEW,
}

export interface ProductPreviewModel {
    id: string
    title: string
    description: string
    status: ProductStatus
    price: PriceModel
    labels: LabelModel[]
    images: ImageModel[]
    options: OptionModel[]
}
