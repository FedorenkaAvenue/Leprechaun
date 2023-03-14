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
import {
    ProductI,
    ProductPreviewI,
    ProductCardI,
    ProductPublicI,
    ProductSearchI,
    ProductBaseI,
    ProductLightCardI,
} from '@interfaces/Product';
import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import { PropertyI, PropertyPublicI } from '@interfaces/Property';
import { ImageI } from '@interfaces/Image';
import { LabelI } from '@interfaces/Label';
import { LabelDTO } from '@dto/Label';
import { PriceEntity } from '@entities/_Price';
import { ImageEntity } from '@entities/Image';
import { CategoryPublic } from '@dto/Category/constructor';
import { TransDTO } from '@dto/Trans';
import { OptionPublic } from '@dto/PropertyGroup/constructor';

export class CreateProductDTO implements ProductI {
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty({ required: false })
    description: TransDTO;

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

class ProductBaseDTO implements ProductBaseI<string> {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: ProductStatusE })
    status: ProductStatusE;

    @ApiProperty({ type: PriceEntity })
    price: PriceEntity;

    @ApiProperty({ type: LabelDTO, isArray: true })
    labels: LabelI[];
}

export class ProductPreviewDTO extends ProductBaseDTO implements ProductPreviewI {
    @ApiProperty({ required: false })
    image: string;
}

export class ProductLightCardDTO extends ProductBaseDTO implements ProductLightCardI {
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];
}

export class ProductCardDTO extends ProductBaseDTO implements ProductCardI {
    @ApiProperty()
    description: string;

    @ApiProperty({ type: ImageEntity, isArray: true })
    images: ImageEntity[];

    @ApiProperty({ description: 'mapped properties (into property groups)', isArray: true })
    options: OptionPublic[];
}

export class ProductPublicDTO extends ProductBaseDTO implements ProductPublicI {
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
}

export class ProductSearchDTO implements ProductSearchI {
    @ApiProperty({ type: 'string' })
    id: ProductI['id'];

    @ApiProperty({ type: 'string' })
    title: ProductI['title'];

    @ApiProperty({ type: 'string' })
    image: string;
}
