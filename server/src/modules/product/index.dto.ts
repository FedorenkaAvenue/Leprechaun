import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

import { ICategory } from "@modules/category/index.interface";
import { IProduct } from "./index.interface";
import { ILabel } from "@modules/label/index.interface";
import { IProperty } from "@modules/property/index.interface";

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
    isPublic: boolean;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false })
    isAvailable: boolean;

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
    @IsNumber({}, { each: true })
    @ApiProperty({ description: 'array of label', isArray: true })
    labels: ILabel[];

    @IsOptional()
    @IsNumber({}, { each: true })
    @ApiProperty({ description: 'array of properties', isArray: true })
    properties: IProperty[];
}

export class CreateProductDTOConstructor extends CreateProductDTO {
    constructor({ title, price, isPublic, category, labels, properties }: CreateProductDTO) {
        super();
        this.title = title;
        this.price = price;
        this.isPublic = isPublic;
        this.category = category;
        // @ts-ignore for table relations
        this.labels = labels ? labels.map(label => ({ id: label })) : [];
        // @ts-ignore for properties relation
        this.properties = properties ? properties.map(property => ({ id: property })) : [];
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
