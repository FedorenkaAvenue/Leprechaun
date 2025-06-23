import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { Product, ProductCU, ProductPreview, ProductPrice, ProductStatus } from '@gen/product';
import { TransSchema } from '@common/trans/trans.schema';
import { CategoryPreviewSchema } from '../category/category.schema';
import { TransData } from '@gen/trans';
import { Category } from '@gen/category';
import { File } from '@gen/common';
import { PropertyGroupPreviewSchema } from '../propertyGroup/propertyGroup.schema';
import { Property } from '@gen/property';
import { ProductImageSchema, ProductPriceSchema } from '@common/product/product.schema';

export class ProductPreviewSchema implements ProductPreview {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: TransSchema;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: ProductPriceSchema })
    price: ProductPriceSchema;

    @ApiProperty()
    category: CategoryPreviewSchema;

    @ApiProperty()
    rating: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    isPublic: boolean;

    @ApiProperty()
    isNew: boolean;

    @ApiProperty()
    comment: string;

    @ApiProperty()
    image: string;
}

export class ProductSchema implements Product {
    @ApiProperty()
    id: string;

    @ApiProperty({ type: TransSchema })
    title: TransSchema;

    @ApiProperty({ type: TransSchema, nullable: true, default: null })
    description: TransSchema;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: ProductPriceSchema })
    price: ProductPriceSchema;

    @ApiProperty({ type: () => CategoryPreviewSchema })
    category: CategoryPreviewSchema;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    isPublic: boolean;

    @ApiProperty({ default: 0, description: 'product rating by sellering' })
    rating: number;

    @ApiProperty({ description: 'novelty status' })
    isNew: boolean;

    @ApiProperty()
    comment: string;

    @ApiProperty({ type: ProductImageSchema, isArray: true })
    images: ProductImageSchema[];

    @ApiProperty({ type: PropertyGroupPreviewSchema, isArray: true })
    options: PropertyGroupPreviewSchema[];
}

export class ProductCreateSchema implements ProductCU {
    @ApiProperty()
    title: TransData;

    @ApiProperty()
    description: TransData;

    @ApiProperty({ required: true })
    priceCurrent: ProductPrice['current'];

    @ApiProperty({ required: false, default: null })
    priceOld: ProductPrice['old'];

    @Transform(({ value }) => value === 'true')
    @ApiProperty({ required: false, default: false })
    isPublic: boolean;

    @Transform(({ value }) => Number(value))
    @ApiProperty({
        enum: ProductStatus,
        required: false,
        default: ProductStatus.AVAILABLE_STATUS,
    })
    status: ProductStatus;

    @ApiProperty({ required: false, default: 0 })
    rating: number;

    @Transform(({ value }) => Number(value))
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'category id',
    })
    category: Category['id'];

    @ApiProperty({
        description: 'array of binary files',
        type: 'array',
        isArray: true,
        required: false,
        default: [],
    })
    images: File[];

    @ApiProperty({
        description: 'array of properties',
        isArray: true,
        required: false,
        default: [],
    })
    properties: Property['id'][];

    @Transform(({ value }) => value === 'true')
    @ApiProperty({
        required: false,
        default: true,
        description: 'novelty status',
    })
    isNew: boolean;

    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class ProductUpdateSchema implements ProductCU {
    @ApiProperty({ required: false })
    title: TransData;

    @ApiProperty({ required: false })
    description: TransData;

    @ApiProperty({ required: false })
    priceCurrent: ProductPrice['current'];

    @ApiProperty({ required: false })
    priceOld: ProductPrice['old'];

    @Transform(({ value }) => value === 'true')
    @ApiProperty({ required: false, default: false })
    isPublic: boolean;

    @Transform(({ value }) => Number(value))
    @ApiProperty({
        enum: ProductStatus,
        required: false,
        default: ProductStatus.AVAILABLE_STATUS,
    })
    status: ProductStatus;

    @ApiProperty({ required: false, default: 0 })
    rating: number;

    @Transform(({ value }) => Number(value))
    @ApiProperty({
        required: false,
        type: 'number',
        description: 'category id',
    })
    category: Category['id'];

    @ApiProperty({
        description: 'array of binary files',
        type: 'array',
        isArray: true,
        required: false,
        default: [],
    })
    images: File[];

    @ApiProperty({
        description: 'array of properties',
        isArray: true,
        required: false,
        default: [],
    })
    properties: Property['id'][];

    @Transform(({ value }) => value === 'true')
    @ApiProperty({
        required: false,
        default: true,
        description: 'novelty status',
    })
    isNew: boolean;

    @ApiProperty({ required: false, default: null })
    comment: string;
}
