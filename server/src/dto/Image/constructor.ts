import { ImageDTO } from '.';

export class Image extends ImageDTO {
    constructor(productId: string, imgUrl: string) {
        super();
        this.product_id = productId;
        this.src = imgUrl;
    }
}
