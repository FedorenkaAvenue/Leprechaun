import { ApiProperty } from '@nestjs/swagger';

import { ProductLabel, ProductLabelType, ProductPreviewPublic, ProductPrice, ProductStatus } from '@gen/product';
import { ProductPriceSchema } from '@common/product/product.schema';

export class ProductLabelSchema implements ProductLabel {
    @ApiProperty({ enum: () => ProductLabelType, required: false })
    type: ProductLabelType;

    @ApiProperty({ required: false, nullable: true })
    value?: string;
}

export class ProductPreviewPublicSchema implements ProductPreviewPublic {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: ProductPriceSchema })
    price: ProductPrice;

    @ApiProperty({ type: ProductLabelSchema, isArray: true })
    labels: ProductLabel[];

    @ApiProperty()
    image: string;

    @ApiProperty()
    isNew: boolean;
}

// @WithLabelsDecorator(ProductLabel.NEW, ProductLabel.POPULAR, ProductLabel.DISCOUNT)
// export class ProductCardPublic extends Base implements ProductCardPublicI {
//     @ApiProperty({ type: ProductImageEntity, isArray: true })
//     images: ProductImageEntity[];

//     @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
//     options: OptionPublicI[];

//     @ApiProperty()
//     description: string;

//     constructor({ images, options, description, ...base }: ProductEntity, { lang }: QueriesProductListI) {
//         super(base, lang);
//         this.images = images?.
//             sort(({ is_main }) => is_main ? -1 : 1).
//             slice(0, Number(5)) as ProductImageEntity[];
//         this.options = options
//             ? options.filter(({ is_primary }) => is_primary).map(opt => new OptionPublic(opt, lang))
//             : [];
//         this.description = description?.[lang];
//     }
// }

// @WithLabelsDecorator(ProductLabel.NEW, ProductLabel.POPULAR, ProductLabel.DISCOUNT)
// export class ProductPublic extends Base implements ProductPublicI {
//     @ApiProperty({ type: ProductImageEntity, isArray: true })
//     images: ProductImageEntity[];

//     @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
//     options: OptionPublicI[];

//     @ApiProperty()
//     description: string;

//     @ApiProperty({ type: CategoryPublic })
//     category: CategoryPublic;

//     @ApiProperty({ description: 'how many users ordered this product' })
//     orderCount: number;

//     // @ApiProperty({ description: 'how many users added this product to wishlist' })
//     // wishlistCount: number;

//     constructor(
//         { category, images, orderCount, description, options, ...base }: ProductEntity,
//         { lang }: QueriesProductListI,
//     ) {
//         super(base, lang);
//         this.description = description?.[lang];
//         this.images = images;
//         this.category = new CategoryPublic(category, lang);
//         this.orderCount = orderCount;
//         this.options = options ? options.map(opt => new OptionPublic(opt, lang)) : [];
//         // this.wishlistCount = wishlistCount.length;
//     }
// }

// export class OptionPublic extends PropertyGroupPublic implements OptionPublicI {
//     @ApiProperty({ isArray: true })
//     properties: PropertyPublicI[];

//     constructor({ properties, ...propGroup }: OptionI, lang: QueriesCommonI['lang']) {
//         super(propGroup, lang);
//         this.properties = properties.map(prop => new PropertyPublic(prop, lang));
//     }
// }

// export class ProductpublicPreviewFromProductPublic implements ProductPreviewPublicI {
//     id: string;
//     title: string;
//     labels: ProductLabelI[];
//     status: ProductStatus;
//     price: PriceEntity;
//     image: string;

//     constructor({ id, title, labels, status, price, images }: ProductPublic) {
//         this.id = id;
//         this.title = title;
//         this.labels = labels;
//         this.status = status;
//         this.image = images.find(({ is_main }) => is_main)?.src as string;
//         this.price = price;
//     }
// }
