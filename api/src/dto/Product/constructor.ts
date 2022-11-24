import { ProductI } from '@interfaces/Product';
import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import WithLabels from '@decorators/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import { CreateProductDTO, ProductPreviewDTO, ProductCardDTO } from '.';
import { Price } from '@dto/Price/constructor';
import configService from '@services/Config';

const PRODUCT_PUBLIC_IMAGE_AMOUNT = configService.getVal('PRODUCT_PUBLIC_IMAGE_AMOUNT');

export class Product extends CreateProductDTO {
    price?: PriceI;

    constructor({
        title,
        price_current,
        price_old,
        is_public,
        category,
        properties,
        status,
        description,
        comment,
        is_new,
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = new Price({ current: price_current, old: price_old });
        this.is_public = ((<unknown>is_public) as string) === 'true';
        this.status = status || ProductStatusE.AVAILABLE;
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
    constructor({ id, title, price, status, images }: ProductI) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.image = (images[0] as ImageEntity).src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductCard extends ProductCardDTO {
    constructor({ id, title, price, status, images, properties }: ProductI) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.images = images.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.properties = properties;
    }
}
