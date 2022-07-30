import { IProduct } from '@interfaces/Product';
import { IPrice } from '@interfaces/Price';
import { ProductStatus } from '@enums/Product';
import WithLabels from '@decorators/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import { CreateProductDTO, ProductPreviewDTO, PublicProductDTO } from '.';
import { Price } from '@dto/Price/constructor';

export class Product extends CreateProductDTO {
    price?: IPrice;

    constructor({
        title, price_current, price_old, is_public, category, properties, status, description, comment, is_new
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = new Price({ current: price_current, old: price_old });
        this.is_public = <unknown>is_public as string === 'true';
        this.status = status || ProductStatus.AVAILABLE;
        this.is_new = typeof is_new === 'boolean' ? is_new : true;
        this.category = category;
        this.description = description || null;
        this.comment = comment || null;
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

@WithLabels(LabelType.DISCOUNT)
export class ProductPreview extends ProductPreviewDTO {
    constructor({ id, title, price, status, images }: IProduct) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.image = (images[0] as ImageEntity).src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductPublic extends PublicProductDTO {
    constructor({ id, title, price, status, images, properties, category }: IProduct) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.images = images as ImageEntity[];
        this.properties = properties;
        this.category = category;
    }
}
