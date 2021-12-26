import { ICategory } from '@interfaces/Category';
import { IImage } from '@interfaces/Image';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';

export enum ProductStatus {
    AVAILABLE = 1,  // в наличии
    OUT_OF_STOCK    // распродан
}

export interface IPrice {
    current: number
    old: number | null
}

export interface IBaseProduct {
    id?: string
    title: string
    status: ProductStatus
    price?: IPrice
}

export interface IProductPreview extends IBaseProduct {
    image: string
}

export interface IPublicProduct extends IBaseProduct {
    images: Array<IImage> | Array<string>
    labels: Array<ILabel>
    category?: ICategory
    properties?: Array<IProperty>
}

export interface IProduct extends IPublicProduct {
    rating?: number
    created_at?: Date
    is_public?: boolean
    comment: string
}
