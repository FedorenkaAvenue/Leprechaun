import { ICategory } from '@interfaces/Category';
import { IImage } from '@interfaces/Image';
import { IProperty } from '@interfaces/Property';
import { ILabel } from '@interfaces/Label';
import { ProductStatus } from '@enums/Product';
import { IPrice } from './Price';

export interface IBaseProduct {
    id?: string
    title: string
    status: ProductStatus
    price?: IPrice
    labels?: Array<ILabel>
}

export interface IProductPreview extends IBaseProduct {
    image: string
}

export interface IPublicProduct extends IBaseProduct {
    images: Array<IImage>
    category?: ICategory
    properties?: Array<IProperty>
}

export interface IProduct extends IPublicProduct {
    rating?: number
    created_at?: Date
    is_public?: boolean
    comment: string
    is_new: boolean
}
