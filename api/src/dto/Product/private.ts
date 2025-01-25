import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsObject, IsOptional, IsString, ValidateNested, IsBoolean,
    IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { PriceI } from '@interfaces/Price';
import { ProductStatus } from '@enums/Product';
import { ImageEntity } from '@entities/Image';
import { PriceDTO } from '@dto/Price';
import { ProductEntity } from '@entities/Product';
import { PriceEntity } from '@entities/_Price';
import { ProductI, ProductPreviewI } from '@interfaces/Product';
import { TransI } from '@interfaces/Trans';
import { CategoryI } from '@interfaces/Category';
import { PropertyI } from '@interfaces/Property';
import { ImageI } from '@interfaces/Image';
import { TransDTO } from '@dto/Trans';

export class ProductCreateDTO {
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    description: TransDTO;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiProperty({ required: true })
    price_current: PriceI['current'];

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value === '' ? null : Number(value))
    @ApiProperty({ required: false, default: null })
    price_old: PriceI['old'];

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, default: false })
    @Transform(({ value }) => value === 'true')
    is_public: boolean;

    @IsOptional()
    @IsEnum(ProductStatus)
    @Transform(({ value }) => Number(value))
    @ApiProperty({
        enum: ProductStatus,
        required: false,
        default: ProductStatus.AVAILABLE,
    })
    status: ProductStatus;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiProperty({ required: false, default: 0 })
    rating: number;

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
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
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

export class ProductUpdateDTO implements ProductCreateDTO {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    description: TransDTO;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiProperty({ required: true })
    price_current: PriceI['current'];

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value === '' ? null : Number(value))
    @ApiProperty({ required: false, default: null })
    price_old: PriceI['old'];

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, default: false })
    @Transform(({ value }) => value === 'true')
    is_public: boolean;

    @IsOptional()
    @IsEnum(ProductStatus)
    @Transform(({ value }) => Number(value))
    @ApiProperty({
        enum: ProductStatus,
        required: false,
        default: ProductStatus.AVAILABLE,
    })
    status: ProductStatus;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @ApiProperty({ required: false, default: 0 })
    rating: number;

    @IsOptional()
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
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
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

export class Product implements Omit<ProductI, 'orderCount' | 'wishlistCount' | 'created_at' | 'id'> {
    price: PriceI;
    properties: PropertyI[];
    description: TransI;
    title: TransI;
    is_public: boolean;
    category: CategoryI;
    status: ProductStatus;
    comment: string;
    is_new: boolean;
    rating: number;
    images: ImageI[];

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
    }: ProductCreateDTO) {
        this.title = title;
        this.price = new PriceDTO({ current: price_current, old: price_old });
        this.is_public = is_public;
        this.status = status;
        this.rating = rating;
        this.is_new = is_new;
        this.category = category;
        this.description = description;
        this.comment = comment;
        // TODO
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

export class ProductPreview implements ProductPreviewI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: TransI;

    @ApiProperty({ enum: ProductStatus })
    status: ProductStatus;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty()
    category: CategoryI;

    @ApiProperty()
    rating: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    is_public: boolean;

    @ApiProperty()
    is_new: boolean;

    @ApiProperty()
    comment: string;

    @ApiProperty()
    image: string | null;

    constructor({
        images, id, title, price, status, category, rating, created_at, is_public, is_new, comment,
    }: ProductEntity) {
        this.image = (images[0] as ImageEntity)?.src || null;
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.price = price;
        this.category = category;
        this.rating = rating;
        this.created_at = created_at;
        this.is_public = is_public;
        this.is_new = is_new;
        this.comment = comment;
    }
}
