import { ICategory } from '@interfaces/Category';
import { IImage } from '@interfaces/Image';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';

export interface IProduct {
    id?: string
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

export enum DASHBOARD_LIST {
    POPULAR,
    NEW
}
