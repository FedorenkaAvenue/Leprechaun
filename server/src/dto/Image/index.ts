import { IImage } from '@interfaces/Image';

export class ImageDTO implements IImage {
    src: string;
    product_id: string;
}
