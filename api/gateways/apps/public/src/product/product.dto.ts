import { ApiProperty } from '@nestjs/swagger';

import { CategoryPublic } from '../category/category.dto';
import {
    OptionPublicI, ProductCardPublicI, ProductLabelI, ProductPreviewPublicI, ProductPublicBaseI, ProductPublicI
} from './product.interface';
import WithLabelsDecorator from './product.decorator';
import { ProductLabel } from './product.enum';
import { PropertyGroupPublic } from '../propertyGroup/propertyGroup.dto';
import { PropertyPublic } from '../property/property.dto';
import { PropertyPublicI } from '../property/property.interface';
import { ImageEntity } from '@core/image/image.entity';
import { PriceEntity, ProductEntity } from '@core/product/product.entity';
import { ProductStatus } from '@core/product/product.enum';
import { QueriesCommonI, QueriesProductListI } from '@core/queries/queries.interface';
import { OptionI } from '@core/product/product.interface';
import { PriceDTO } from '@shared/dto/price.dto';

export class Label implements ProductLabelI {
    @ApiProperty({ enum: () => ProductLabel, required: false })
    type: ProductLabel;

    @ApiProperty({ required: false, nullable: true })
    value: string | null;

    constructor(type: ProductLabelI['type'], value?: ProductLabelI['value']) {
        this.type = type;
        this.value = value || null;
    }
}

class Base implements ProductPublicBaseI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: Label, isArray: true })
    labels: ProductLabelI[];

    constructor({
        id, title, price, status,
    }: Pick<ProductEntity, 'id' | 'title' | 'price' | 'status'>, lang: QueriesProductListI['lang']) {
        this.id = id;
        this.title = title[lang];
        this.price = new PriceDTO({ ...price });
        this.status = status;
    }
}

@WithLabelsDecorator(ProductLabel.DISCOUNT)
export class ProductPreviewPublic extends Base implements ProductPreviewPublicI {
    @ApiProperty()
    image: string;

    constructor({ images, ...base }: ProductEntity, lang: QueriesProductListI['lang']) {
        super(base, lang);
        this.image = images.find(({ is_main }) => is_main)?.src as string;
    }
}

@WithLabelsDecorator(ProductLabel.NEW, ProductLabel.POPULAR, ProductLabel.DISCOUNT)
export class ProductCardPublic extends Base implements ProductCardPublicI {
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublicI[];

    @ApiProperty()
    description: string;

    constructor({ images, options, description, ...base }: ProductEntity, { lang }: QueriesProductListI) {
        super(base, lang);
        this.images = images?.
            sort(({ is_main }) => is_main ? -1 : 1).
            slice(0, Number(5)) as ImageEntity[];
        this.options = options
            ? options.filter(({ is_primary }) => is_primary).map(opt => new OptionPublic(opt, lang))
            : [];
        this.description = description?.[lang];
    }
}

@WithLabelsDecorator(ProductLabel.NEW, ProductLabel.POPULAR, ProductLabel.DISCOUNT)
export class ProductPublic extends Base implements ProductPublicI {
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublicI[];

    @ApiProperty()
    description: string;

    @ApiProperty({ type: CategoryPublic })
    category: CategoryPublic;

    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    // @ApiProperty({ description: 'how many users added this product to wishlist' })
    // wishlistCount: number;

    constructor(
        { category, images, orderCount, description, options, ...base }: ProductEntity,
        { lang }: QueriesProductListI,
    ) {
        super(base, lang);
        this.description = description?.[lang];
        this.images = images;
        this.category = new CategoryPublic(category, lang);
        this.orderCount = orderCount;
        this.options = options ? options.map(opt => new OptionPublic(opt, lang)) : [];
        // this.wishlistCount = wishlistCount.length;
    }
}

export class OptionPublic extends PropertyGroupPublic implements OptionPublicI {
    @ApiProperty({ isArray: true })
    properties: PropertyPublicI[];

    constructor({ properties, ...propGroup }: OptionI, lang: QueriesCommonI['lang']) {
        super(propGroup, lang);
        this.properties = properties.map(prop => new PropertyPublic(prop, lang));
    }
}
