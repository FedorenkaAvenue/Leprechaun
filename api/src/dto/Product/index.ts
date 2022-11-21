import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { CategoryI } from '@interfaces/Category';
import { ProductI, ProductPreviewI, ProductCardI } from '@interfaces/Product';
import { PriceI } from '@interfaces/Price';
import { ProductStatus } from '@enums/Product';
import { PropertyI } from '@interfaces/Property';
import { ImageI } from '@interfaces/Image';
import { LabelI } from '@interfaces/Label';
import { LabelDTO } from '@dto/Label';
import { PriceEntity } from '@entities/_Price';
import { ImageEntity } from '@entities/Image';
import { PropertyEntity } from '@entities/Property';
import { CategoryEntity } from '@entities/Category';

export class CreateProductDTO implements ProductI {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ required: true })
    price_current: PriceI['current'];

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false, default: null })
    price_old: PriceI['old'];

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @IsOptional()
    @IsEnum(ProductStatus)
    @ApiProperty({
        enum: ProductStatus,
        required: false,
        default: ProductStatus.AVAILABLE,
    })
    status: ProductStatus;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    description: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'category id',
    })
    category: CategoryI;

    @IsOptional()
    @ApiProperty({
        description: 'array of binary files',
        type: 'file',
        isArray: true,
        required: false,
        default: [],
    })
    images: ImageI[];

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        description: 'array of properties',
        isArray: true,
        required: false,
        default: [],
    })
    properties: PropertyI[];

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({
        required: false,
        default: true,
        description: 'novelty status',
    })
    is_new: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class ProductPreviewDTO implements ProductPreviewI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ required: false })
    image: string;

    @ApiProperty({ type: LabelDTO, isArray: true, required: false })
    labels: LabelI[];
}

export class ProductCardDTO implements ProductCardI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ type: PropertyEntity, isArray: true })
    properties: PropertyI[];

    @ApiProperty({ type: LabelDTO, isArray: true, required: false })
    labels: LabelI[];
}
