import { IProduct } from "@modules/product/index.interface";

export interface ICategory {
    id?: number;
    url: string;
    title: string;
    icon: string | null;
    products?: Array<IProduct> | null;
}
