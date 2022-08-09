import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ICategory } from '@interfaces/Category';
import { IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';
import { IPrice } from '@interfaces/Price';
import { ProductStatus } from '@enums/Product';
import { IProperty } from '@interfaces/Property';
import { IImage } from '@interfaces/Image';
import { BaseProductEntity, PublicProductEntity } from '@entities/Product';
import { ILabel } from '@interfaces/Label';
import { LabelDTO } from '@dto/Label';

export class CreateProductDTO implements IProduct {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ required: true })
    price_current: IPrice['current'];

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false, default: null })
    price_old: IPrice['old'];

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
    category: ICategory;

    @IsOptional()
    @ApiProperty({
        description: 'array of binary files',
        type: 'file',
        isArray: true,
        required: false,
        default: [],
    })
    images: IImage[];

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        description: 'array of properties',
        isArray: true,
        required: false,
        default: [],
    })
    properties: IProperty[];

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

export class ProductPreviewDTO extends BaseProductEntity implements IProductPreview {
    @ApiProperty({ required: false })
    image: string;

    @ApiProperty({ type: LabelDTO, isArray: true, required: false })
    labels: ILabel[];
}

export class PublicProductDTO extends PublicProductEntity implements IPublicProduct {
    @ApiProperty({ type: LabelDTO, isArray: true, required: false })
    labels: ILabel[];
}
