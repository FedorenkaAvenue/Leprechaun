import { ICategory } from "@modules/category/index.interface";
import { IImage } from "@modules/image/index.interface";
import { ILabel } from "@modules/label/index.interface";
import { IFilter } from "@modules/filter/index.interface";

export interface IProduct {
    id?: string
    category?: ICategory
    properties?: Array<IFilter>
    title: string
    isPublic: boolean
    price: number
    images: Array<IImage> | Array<string>
    labels: Array<ILabel>
}
