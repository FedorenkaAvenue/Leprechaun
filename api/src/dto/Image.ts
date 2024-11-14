import { ImageI } from '@interfaces/Image';

export class Image implements ImageI {
    src: string;
    product_id: string;

    constructor(productId: string, imgUrl: string) {
        this.product_id = productId;
        this.src = imgUrl;
    }
}
