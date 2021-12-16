import { Cookie } from 'express-session';
import { IProduct } from './Product';

export interface ISession {
    cookie: Cookie
    history: Array<IProduct['id']>
}
