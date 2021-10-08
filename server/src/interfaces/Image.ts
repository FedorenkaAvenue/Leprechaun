import { IProduct } from '@interfaces/Product';

export type TImageId = string

export interface IImage<TProduct = IProduct> {
    id?: TImageId
    src: string
    product_id?: TProduct | null
}
