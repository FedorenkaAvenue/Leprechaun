import { IProduct } from './Product';

export interface ISession {
    visit: Array<IProduct['id']>
}
