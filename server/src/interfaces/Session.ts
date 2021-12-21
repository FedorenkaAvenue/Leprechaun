import { IProduct } from './Product';

export interface ISession {
    history: Array<IProduct['id']>
}
