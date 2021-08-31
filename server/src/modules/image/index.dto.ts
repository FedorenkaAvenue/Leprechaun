import { IImage } from "./index.interface";

export class CreateImageDTO implements IImage<string> {
    src: string;
    product: string;

    constructor(productId: string, imgUrl: string) {
        this.product = productId;
        this.src = imgUrl;
    }
}
