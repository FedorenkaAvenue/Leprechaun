import { ApiProperty } from '@nestjs/swagger';
import {
    IsBooleanString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString
} from 'class-validator';

import { ICategory } from '@interfaces/Category';
import { IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';
import { IPrice } from '@interfaces/Price';
import { ProductStatus } from '@enums/Product';
import { IProperty } from '@interfaces/Property';
import { IImage } from '@interfaces/Image';
import { BaseProductEntity, PublicProductEntity } from '@entities/Product';
import WithLabels from '@decorators/Label';
import { LabelDTO } from './Label';
import { ILabel } from '@interfaces/Label';
import { LabelType } from '@enums/Label';
import { ImageEntity } from '@entities/Image';
import { Price } from './Price/constructor';

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
        default: ProductStatus.AVAILABLE
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
        description: 'category id'
    })
    category: ICategory;

    @IsOptional()
    @ApiProperty({
        description: 'array of binary files',
        type: 'file',
        isArray: true,
        required: false,
        default: []
    })
    images: IImage[];

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        description: 'array of properties',
        isArray: true,
        required: false,
        default: []
    })
    properties: IProperty[];

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({
        required: false,
        default: true,
        description: 'novelty status'
    })
    is_new: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CreateProductDTOConstructor extends CreateProductDTO implements IProduct {
    price?: IPrice;

    constructor({
        title, price_current, price_old, is_public, category, properties, status, description, comment, is_new
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = new Price({ current: price_current, old: price_old });
        this.is_public = typeof is_public === 'string' ? is_public : undefined;
        this.status = status || ProductStatus.AVAILABLE;
        this.is_new = typeof is_new === 'boolean' ? is_new : true;
        this.category = category;
        this.description = description || null;
        this.comment = comment || null;
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

@WithLabels(LabelType.DISCOUNT)
export class ProductPreviewDTO extends BaseProductEntity implements IProductPreview {
    @ApiProperty({ required: false })
    image: string;

    @ApiProperty({ type: LabelDTO, isArray: true, required: false })
    labels: ILabel[];

    constructor({ id, title, price, status, images }: IProduct) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.image = (images[0] as ImageEntity).src;
    }
}

@WithLabels(LabelType.NEW, LabelType.POPULAR, LabelType.DISCOUNT)
export class PublicProductDTO extends PublicProductEntity implements IPublicProduct {
    @ApiProperty({ type: LabelDTO, isArray: true, required: false })
    labels: ILabel[];

    constructor({ id, title, price, status, images, properties, category }: IProduct) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.status = status;
        this.images = images as ImageEntity[];
        this.properties = properties;
        this.category = category;
    }
}
