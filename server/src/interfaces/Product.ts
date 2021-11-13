import { ICategory } from '@interfaces/Category';
import { IImage } from '@interfaces/Image';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';

export interface IBaseProduct {
    id?: string
    title: string
    is_available: boolean
    price: number
    description: string
    labels: Array<ILabel>
    rating?: number
    created_at?: Date
    is_public?: boolean
    images: Array<IImage> | Array<string>
    comment: string
}

export interface IProduct extends IBaseProduct {
    category?: ICategory
    properties?: Array<IProperty>
}
