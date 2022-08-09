import { IProduct } from './Product';

export interface ISession {
    id?: string;
    history: Array<IProduct['id']>;
}
