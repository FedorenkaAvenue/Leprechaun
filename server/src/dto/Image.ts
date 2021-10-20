import { IImage } from '@interfaces/Image';

export class CreateImageDTO implements IImage {
    src: string;
    product: string;

    constructor(productId: string, imgUrl: string) {
        this.product = productId;
        this.src = imgUrl;
    }
}
