import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import WithLabels from '@decorators/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import {
    CreateProductDTO,
    ProductPreviewDTO,
    ProductCardDTO,
    ProductPublicDTO,
    ProductSearchDTO,
    ProductLightCardDTO,
} from '.';
import { Price } from '@dto/Price/constructor';
import configService from '@services/Config';
import { ProductEntity } from '@entities/Product';
import { CategoryPublic } from '@dto/Category/constructor';
import { QueriesProductListI } from '@interfaces/Queries';
import { QueriesCommon } from '@dto/Queries/constructor';
import { OptionPublic } from '@dto/PropertyGroup/constructor';

const PRODUCT_PUBLIC_IMAGE_AMOUNT = configService.getVal('PRODUCT_PUBLIC_IMAGE_AMOUNT');

export class Product extends CreateProductDTO {
    price: PriceI;

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
        rating,
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = new Price({ current: price_current, old: price_old });
        this.is_public = ((<unknown>is_public) as string) === 'true';
        this.status = status || ProductStatusE.AVAILABLE;
        this.rating = rating || 0;
        this.is_new = typeof is_new === 'boolean' ? is_new : true;
        this.category = category;
        this.description = description || null;
        this.comment = comment || null;
        // TODO
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

@WithLabels(LabelType.DISCOUNT)
export class ProductPreview extends ProductPreviewDTO {
    constructor({ id, title, price, status, images }: ProductEntity, { lang }: QueriesCommon) {
        super();
        this.id = id;
        this.title = title[lang];
        this.price = price;
        this.status = status;
        this.image = (images[0] as ImageEntity).src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductLightCard extends ProductLightCardDTO {
    constructor({ id, title, price, status, images }: ProductEntity, { lang }: QueriesCommon) {
        super();
        this.id = id;
        this.title = title[lang];
        this.price = price;
        this.status = status;
        this.images = images.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductCard extends ProductCardDTO {
    constructor({ id, title, price, status, images, options, description }: ProductEntity, { lang }: QueriesCommon) {
        super();
        this.id = id;
        this.title = title[lang];
        this.description = description?.[lang];
        this.price = price;
        this.status = status;
        this.images = images.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.options = options.filter(({ is_primary }) => is_primary).map(opt => new OptionPublic(opt, lang));
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductPublic extends ProductPublicDTO {
    constructor(
        { id, title, price, status, images, category, wishlistCount, orderCount, description, options }: ProductEntity,
        { lang }: QueriesProductListI,
    ) {
        super();
        this.id = id;
        this.title = title[lang];
        this.description = description?.[lang];
        this.price = price;
        this.status = status;
        this.images = images.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.category = new CategoryPublic(category, lang);
        this.orderCount = orderCount;
        this.wishlistCount = wishlistCount.length;
        this.options = options.map(opt => new OptionPublic(opt, lang));
    }
}

export class ProductSearch extends ProductSearchDTO {
    constructor({ p_id, title_en, img }) {
        super();
        this.id = p_id;
        this.title = title_en;
        this.image = img;
    }
}
