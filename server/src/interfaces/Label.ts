import { IProduct } from '@interfaces/Product';

export type TLabelId = number

export interface ILabel {
    id?: TLabelId
    value: string
    type: string
    products?: Array<IProduct>
}
