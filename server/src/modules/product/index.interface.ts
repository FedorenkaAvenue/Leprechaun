export interface IProduct extends IProductBase {
    // images: Array<string>
}

interface IProductShortInfo extends IProductBase {
    image: string
}

interface IProductBase {
    id?: string
    categoryId: number
    title: string
    price: number
    // labels: Array<IProductLabel> | null
    // properties: Array<IProductProperty>
}

export interface IProductProperty {
    property: string
    value: string
}
