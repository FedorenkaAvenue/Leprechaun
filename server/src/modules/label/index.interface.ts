import { IProduct } from "@modules/product/index.interface";

export interface ILabel {
    id?: number
    value: string
    products?: Array<IProduct>
}
