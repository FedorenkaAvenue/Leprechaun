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
    @ApiProperty({ required: false })
    is_public: boolean;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false })
    is_available: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
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
        isArray: true
    })
    images: string[];

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({ description: 'array of label', isArray: true })
    labels: ILabel[];

    @IsOptional()
    @IsNumberString({}, { each: true })
    @ApiProperty({ description: 'array of properties', isArray: true })
    properties: IProperty[];
}

export class CreateProductDTOConstructor extends CreateProductDTO {
    constructor({
        title, price, is_public, category, labels, properties, is_available, description
    }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = price;
        this.is_public = is_public;
        this.is_available = is_available;
        this.category = category;
        this.description = description || null;
        // @ts-ignore for table relations
        this.labels = labels ? labels.map(label => ({ id: Number(label) })) : [];
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: Number(property) })) : [];
    }
}

// export class UpdateProductDTO implements IProduct {
//     @ApiProperty({ type: 'number', required: true })
//     id: string;

//     @ApiProperty({ required: false })
//     title: string;

//     @ApiProperty({ required: false })
//     price: number;

//     @ApiProperty({ required: false })
//     isPublic: boolean;

//     @ApiProperty({
//         required: false,
//         type: 'number',
//         description: 'category id'
//     })
//     category: ICategory;

//     @ApiProperty({
//         description: 'array of the new images as binary files',
//         type: 'file',
//         isArray: true,
//         required: false
//     })
//     images: string[];

//     @ApiProperty({
//         description: 'array of the removed images urls',
//         isArray: true,
//         required: false
//     })
//     removedImages: string[];

//     @ApiProperty({
//         required: false,
//         description: 'index of primary image url'
//     })
//     mainImg: number;
// }
