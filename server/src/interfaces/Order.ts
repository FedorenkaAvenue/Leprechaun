import { IProduct } from './Product';

export interface IOrder {
    id?: string
    product_id: IProduct['id']
    amount: number
    created_at: Date
    is_bought: boolean
}
