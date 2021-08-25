import { ICategory } from "@modules/category/index.interface";
import { IImage } from "@modules/image/index.interface";

export interface IProduct {
    id?: string
    category?: ICategory
    title: string
    isPublic: boolean
    price: number
    images: Array<IImage> | Array<string>
    // labels: Array<IProductLabel> | null
    // properties: Array<IProductProperty>
}

// export interface IProductProperty {
//     property: string
//     value: string
// }
