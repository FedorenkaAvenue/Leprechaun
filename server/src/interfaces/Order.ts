import { IProduct } from './Product';
import { IUser } from './User';

export interface IOrder {
    id?: string
    user_id: IUser['id']
    product_id: IProduct['id']
    amount: number
    created_at: Date
    is_bought: boolean
}
