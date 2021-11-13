import { ICategory } from '@interfaces/Category';
import { IImage } from '@interfaces/Image';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';

interface IAdminProduct {
    rating?: number
    created_at?: Date
    is_public?: boolean
}

interface IBaseProduct extends IAdminProduct {
    id?: string
    title: string
    is_available: boolean
    price: number
    description: string
    labels: Array<ILabel>
}

export interface IProductPreview extends IBaseProduct {
    image: IImage
}

export interface IProduct extends IBaseProduct {
    images: Array<IImage> | Array<string>
    category?: ICategory
    properties?: Array<IProperty>
}
