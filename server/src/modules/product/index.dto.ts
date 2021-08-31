import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { ICategory } from "@modules/category/index.interface";
import { IProduct } from "./index.interface";
import { ILabel } from "@modules/label/index.interface";

export class CreateProductDTO implements IProduct {
    @ApiProperty({ required: true })
    title: string;

    @ApiProperty({ required: true })
    price: number;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({
        required: true,
        type: 'number',
        description: 'category id'
    })
    category: ICategory;

    @ApiProperty({
        description: 'array of binary files',
        type: 'file',
        isArray: true
    })
    images: string[];

    @ApiProperty({ description: 'array of label', isArray: true })
    //! хуйня
    labels: ILabel[] | any;

    constructor({ title, price, isPublic, category, labels }: CreateProductDTO) {
        if (!title || !category) throw new BadRequestException();

        this.title = title;
        this.price = price;
        this.isPublic = isPublic;
        this.category = category;
        this.labels = labels ? labels.map(label => ({ id: label })) : [];
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
