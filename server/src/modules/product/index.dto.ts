import { IProduct } from "./index.interface";

export class CreateProductDTO implements IProduct {
    id: number;
    title: string;
    price: number;
    // labels: Array<IProductLabel> | null;
    // properties: Array<IProductProperty>;
    // images: Array<string>;
}
