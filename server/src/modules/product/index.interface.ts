import { ICategory } from "@modules/category/index.interface";

interface IProductBase {
    id?: string
    category: ICategory
    title: string
    price: number
    // labels: Array<IProductLabel> | null
    // properties: Array<IProductProperty>
}

export interface IProduct extends IProductBase {
    // images: Array<string>
}

interface IProductShortInfo extends IProductBase {
    image: string
}

export interface IProductProperty {
    property: string
    value: string
}
