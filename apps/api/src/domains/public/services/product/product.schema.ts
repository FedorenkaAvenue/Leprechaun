import { ApiProperty } from '@nestjs/swagger';
import {
    ProductCardPublic, ProductLabel, ProductLabelType, ProductPreviewPublic, ProductPrice, ProductPublic, ProductStatus,
} from '@fedorenkaavenue/leprechaun_lib_entities/server/product';
import { PropertyGroupPreviewPublic } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';

import { ProductImageSchema, ProductPriceSchema } from '@common/product/product.schema';
import { CategoryPublicSchema } from '../category/category.schema';
import { CategoryPublic } from '@fedorenkaavenue/leprechaun_lib_entities/server/category';

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

export class ProductPublicSchema implements ProductPublic {
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

    @ApiProperty({ type: CategoryPublicSchema })
    category: CategoryPublic;

    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    // @ApiProperty({ description: 'how many users added this product to wishlist' })
    // wishlistCount: number;
}

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
