import { ApiProperty } from '@nestjs/swagger';
import {
    ProductCardPublic, ProductLabel, ProductLabelType, ProductPreviewPublic, ProductPrice, ProductStatus,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/product';
import { PropertyGroupPreviewPublic } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';

import { ProductImageSchema, ProductPriceSchema } from '@common/product/product.schema';

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
    image: ProductImageSchema;
}

export class ProductCardPublicSchema implements ProductCardPublic {
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

    @ApiProperty({ type: ProductImageSchema, isArray: true })
    images: ProductImageSchema[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: PropertyGroupPreviewPublic[];

    @ApiProperty()
    description: string;
}

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
