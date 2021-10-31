import { IImage } from '@interfaces/Image';

export class CreateImageDTO implements IImage {
    src: string;
    product_id: string;

    constructor(productId: string, imgUrl: string) {
        this.product_id = productId;
        this.src = imgUrl;
    }
}
