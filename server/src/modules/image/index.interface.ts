import { IProduct } from "@modules/product/index.interface";

export interface IImage<TProduct = IProduct> {
    id?: string | number
    src: string
    product?: TProduct | null
}
