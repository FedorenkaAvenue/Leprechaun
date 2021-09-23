import { ICategory } from "@modules/category/index.interface";
import { IImage } from "@modules/image/index.interface";
import { ILabel } from "@modules/label/index.interface";
import { IProperty } from "@modules/property/index.interface";

export interface IProduct {
    id?: string
    createdAt?: Date
    category?: ICategory
    properties?: Array<IProperty>
    title: string
    isPublic: boolean
    isAvailable: boolean
    rating?: number // count of solded items
    price: number
    images: Array<IImage> | Array<string>
    labels: Array<ILabel>
}
