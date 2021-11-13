import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ICategory } from '@interfaces/Category';
import { IProduct } from '@interfaces/Product';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';

export class CreateProductDTO implements IProduct {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    title: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty({ required: true })
    price: number;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, default: false })
    is_public: boolean;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, default: true })
    is_available: boolean;

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
    images: string[];

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({
        description: 'array of label',
        isArray: true, required: false,
        default: []
    })
    labels: ILabel[];

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
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class CreateProductDTOConstructor extends CreateProductDTO {
    constructor({
        title, price, is_public, category, labels, properties, is_available, description, comment
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = price;
        this.is_public = is_public;
        this.is_available = is_available;
        this.category = category;
        this.description = description || null;
        this.comment = comment || null;
        // @ts-ignore for table relations
        this.labels = labels ? labels.map(label => ({ id: Number(label) })) : [];
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}
