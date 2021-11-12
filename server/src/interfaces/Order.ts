import { IProduct } from './Product';
import { IUser } from './User';

export interface IOrder {
    id?: number
    user_id: IUser['id']
    product_id: IProduct['id']
    amount: number
}
