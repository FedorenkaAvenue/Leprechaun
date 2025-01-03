import { ImageI } from '@interfaces/Image';

export class Image implements ImageI {
    src: string;
    product_id: string;
    is_main: boolean;

    constructor(productId: string, imgUrl: string, isMain: boolean) {
        this.product_id = productId;
        this.src = imgUrl;
        this.is_main = isMain;
    }
}
