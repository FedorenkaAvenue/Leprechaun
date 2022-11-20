import { ProductI } from '@interfaces/Product';
import { SessionI } from '@interfaces/Session';

export class UserSessionDTO implements SessionI {
    ip: string;
    url: string;
    productHistory: Array<ProductI['id']>;
}
