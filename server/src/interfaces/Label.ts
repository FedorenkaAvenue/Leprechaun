import { IProduct } from '@interfaces/Product';

export interface ILabel {
    id?: number
    value: string
    type: string
    products?: Array<IProduct>
}
