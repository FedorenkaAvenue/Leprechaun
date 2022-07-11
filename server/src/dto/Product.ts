import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean, IsBooleanString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString
} from 'class-validator';

import { ICategory } from '@interfaces/Category';
import { IPrice, IProduct, IProductPreview, IPublicProduct } from '@interfaces/Product';
import { ProductStatus } from '@enums/Product';
import { IProperty } from '@interfaces/Property';
import { IImage } from '@interfaces/Image';
import { BaseProductEntity, PublicProductEntity } from '@entities/Product';
import WithLabels from '@decorators/Label';
import { LabelDTO } from './Label';
import { ILabel } from '@interfaces/Label';
import { LabelType } from '@enums/Label';

export class CreateProductDTO implements IProduct {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ required: true })
    price_current: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false, default: null })
    price_old: number;

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
    @IsBoolean()
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
        this.price = {
            current: price_current,
            old: price_old
        };
        // @ts-ignore
        this.is_public = is_public === 'true';
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
        this.image = (images[0] as IImage).src;
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
        this.images = images as Array<IImage>;
        this.properties = properties;
        this.category = category;
    }
}
