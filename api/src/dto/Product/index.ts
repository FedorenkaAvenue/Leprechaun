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
import { ProductI } from '@interfaces/Product';
import { PriceI } from '@interfaces/Price';
import { ProductStatusE } from '@enums/Product';
import { PropertyI } from '@interfaces/Property';
import { ImageI } from '@interfaces/Image';
import { TransDTO } from '@dto/Trans';

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
