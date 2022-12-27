import { ApiProperty } from '@nestjs/swagger';
import {
    IsBooleanString,
    IsEnum,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumberString,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CategoryI } from '@interfaces/Category';
import { ProductI, ProductPreviewI, ProductCardI, ProductPublicI } from '@interfaces/Product';
import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import { PropertyI, PropertyPublicI } from '@interfaces/Property';
import { ImageI } from '@interfaces/Image';
import { LabelI } from '@interfaces/Label';
import { LabelDTO } from '@dto/Label';
import { PriceEntity } from '@entities/_Price';
import { ImageEntity } from '@entities/Image';
import { PropertyPublic } from '@dto/Property/constructor';
import { CategoryPublic } from '@dto/Category/constructor';
import { TransDTO } from '@dto/Trans';

export class CreateProductDTO implements ProductI {
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

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
    @IsEnum(ProductStatusE)
    @ApiProperty({
        enum: ProductStatusE,
        required: false,
        default: ProductStatusE.AVAILABLE,
    })
    status: ProductStatusE;

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

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ required: false })
    image: string;

    @ApiProperty({ type: LabelDTO, isArray: true })
    labels: LabelI[];
}

export class ProductCardDTO implements ProductCardI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ type: PropertyPublic, isArray: true })
    properties: PropertyPublicI[];

    @ApiProperty({ type: LabelDTO, isArray: true })
    labels: LabelI[];
}

export class ProductPublicDTO implements ProductPublicI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ type: PropertyPublic, isArray: true })
    properties: PropertyPublicI[];

    @ApiProperty({ type: LabelDTO, isArray: true })
    labels: LabelI[];

    @ApiProperty({ type: CategoryPublic })
    category: CategoryPublic;

    @ApiProperty({ description: 'how many users ordered this product' })
    orderCount: number;

    @ApiProperty({ description: 'how many users added this product to wishlist' })
    wishlistCount: number;
}
