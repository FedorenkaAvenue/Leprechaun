import { IProduct } from '@interfaces/Product';

export interface IImage {
    id?: string;
    src: string;
    product_id: IProduct['id'];
}
