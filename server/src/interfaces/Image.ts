import { IProduct } from '@interfaces/Product';

export interface IImage<TProduct = IProduct> {
    id?: string | number
    src: string
    product_id?: TProduct | null
}
