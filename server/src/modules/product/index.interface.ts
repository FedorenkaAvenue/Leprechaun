import { ICategory } from "@modules/category/index.interface";

interface IProductBase {
    id?: string
    category: ICategory
    title: string
    isPublic: boolean
    price: number
    // labels: Array<IProductLabel> | null
    // properties: Array<IProductProperty>
}

export interface IProduct extends IProductBase {
    images: Array<string> | null
}

// interface IProductShortInfo extends IProductBase {
//     image: string
// }

// export interface IProductProperty {
//     property: string
//     value: string
// }
