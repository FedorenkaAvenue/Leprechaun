import { ApiProperty } from '@nestjs/swagger';

import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import { ImageEntity } from '@entities/Image';
import { Price } from '@dto/Price';
import { ProductEntity } from '@entities/Product';
import { PriceEntity } from '@entities/_Price';
import { ProductBaseI, ProductI, ProductPreviewI } from '@interfaces/Product';
import { TransI } from '@interfaces/Trans';
import {
    IsBooleanString,
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
import { PropertyI } from '@interfaces/Property';
import { ImageI } from '@interfaces/Image';
import { TransDTO } from '@dto/Trans';

export class CreateProductDTO {
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
    @IsNumberString()
    @ApiProperty({ required: true })
    price_current: PriceI['current'];

    @IsOptional()
    @ApiProperty({ required: false, default: null })
    price_old: PriceI['old'];

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @ApiProperty({
        enum: ProductStatusE,
        required: false,
        default: ProductStatusE.AVAILABLE,
    })
    status: ProductStatusE;

    @IsOptional()
    @IsNumberString()
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

export class Product implements Omit<ProductI, 'orderCount' | 'wishlistCount' | 'created_at' | 'id'> {
    price: PriceI;
    properties: PropertyI[];
    description: TransI;
    title: TransI;
    is_public: boolean;
    category: CategoryI;
    status: ProductStatusE;
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
    }: CreateProductDTO) {
        this.title = title;
        this.price = new Price({ current: price_current, old: price_old });
        this.is_public = ((<unknown>is_public) as string) === 'true';
        this.status = status;
        this.rating = rating;
        this.is_new = typeof is_new === 'boolean' ? is_new : true;
        this.category = category;
        this.description = description;
        this.comment = comment;
        // TODO
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

class Base implements ProductBaseI {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: TransI;

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

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
    description: TransI;

    @ApiProperty()
    comment: string;

    constructor(p: ProductBaseI) {
        this.id = p.id;
        this.title = p.title;
        this.price = p.price;
        this.status = p.status;
        this.price = p.price;
        this.category = p.category;
        this.rating = p.rating;
        this.created_at = p.created_at;
        this.is_public = p.is_public;
        this.is_new = p.is_new;
        this.comment = p.comment;
    }
}

export class ProductPreview extends Base implements ProductPreviewI {
    @ApiProperty()
    image: string;

    constructor({ images, ...base }: ProductEntity) {
        super(base);
        this.image = (images[0] as ImageEntity)?.src;
    }
}
