import { ApiProperty } from '@nestjs/swagger';

import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import WithLabels from '@decorators/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import { CreateProductDTO } from '.';
import { Price } from '@dto/Price/constructor';
import { singleConfigService } from '@services/Config';
import { ProductEntity } from '@entities/Product';
import { CategoryPublic } from '@dto/Category/constructor';
import { QueriesProductListI } from '@interfaces/Queries';
import { QueriesCommon } from '@dto/Queries/constructor';
import { OptionPublic } from '@dto/PropertyGroup/constructor';
import {
    ProductBaseI, ProductCardI, ProductLightCardI, ProductPreviewPublicI, ProductPublicI
} from '@interfaces/Product';
import { PriceEntity } from '@entities/_Price';
import { LabelI } from '@interfaces/Label';
import { Label } from '@dto/Label/constructor';

const PRODUCT_PUBLIC_IMAGE_AMOUNT = singleConfigService.getVal('PRODUCT_PUBLIC_IMAGE_AMOUNT');

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

class ProductBase implements ProductBaseI<string> {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: Label, isArray: true })
    labels: LabelI[];

    constructor({ id, title, price, status }: ProductBaseI, lang: QueriesCommon['lang']) {
        this.id = id;
        this.title = title[lang];
        this.price = price;
        this.status = status;
    }
}

@WithLabels(LabelType.DISCOUNT)
export class ProductPreview extends ProductBase implements ProductPreviewPublicI {
    @ApiProperty({ required: false })
    image: string;

    constructor({ images, ...base }: ProductEntity, lang: QueriesCommon['lang']) {
        super(base, lang);
        this.image = (images[0] as ImageEntity)?.src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductLightCard extends ProductBase implements ProductLightCardI {
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    constructor({ images, ...base }: ProductEntity, { lang }: QueriesCommon) {
        super(base, lang);
        this.images = images?.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductCard extends ProductBase implements ProductCardI {
    @ApiProperty()
    description: string;

    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublic[];

    constructor({ images, options, description, ...base }: ProductEntity, { lang }: QueriesCommon) {
        super(base, lang);
        this.description = description?.[lang];
        this.images = images?.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.options = options.filter(({ is_primary }) => is_primary).map(opt => new OptionPublic(opt, lang));
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class ProductPublic extends ProductBase implements ProductPublicI {
    @ApiProperty()
    description: string;

    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ type: CategoryPublic })
    category: CategoryPublic;

    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    @ApiProperty({ description: 'how many users added this product to wishlist' })
    wishlistCount: number;

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublic[];

    constructor(
        { images, category, wishlistCount, orderCount, description, options, ...base }: ProductEntity,
        { lang }: QueriesProductListI,
    ) {
        super(base, lang);
        this.description = description?.[lang];
        this.images = images?.slice(0, Number(PRODUCT_PUBLIC_IMAGE_AMOUNT)) as ImageEntity[];
        this.category = new CategoryPublic(category, lang);
        this.orderCount = orderCount;
        this.wishlistCount = wishlistCount.length;
        this.options = options.map(opt => new OptionPublic(opt, lang));
    }
}
