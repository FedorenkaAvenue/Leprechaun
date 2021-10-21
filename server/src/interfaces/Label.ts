import { IProduct } from '@interfaces/Product';

export interface ILabel {
    id?: number
    value: string
    type: LabelType
    products?: Array<IProduct>
}

export enum LabelType {
    DISCOUNT = 'discount',
    NEW = 'new'
}
