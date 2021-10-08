import { ICategory } from '@interfaces/Category';
import { IImage } from '@interfaces/Image';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';

type TProductID = string

export interface IProduct {
    id?: TProductID
    created_at?: Date
    category?: ICategory
    properties?: Array<IProperty>
    title: string
    is_public: boolean
    is_available: boolean
    rating?: number
    price: number
    images: Array<IImage> | Array<string>
    description: string
    labels: Array<ILabel>
}
