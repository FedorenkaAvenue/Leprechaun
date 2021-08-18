import { ApiProperty } from "@nestjs/swagger";

import { ICategory } from "@modules/category/index.interface";
import { IProduct } from "./index.interface";

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

    @ApiProperty({ type: 'file', isArray: true })
    images: string[];
}

export class UpdateProductDTO implements IProduct {
    @ApiProperty({ type: 'number', required: true })
    id: string;

    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    price: number;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({
        required: false,
        type: 'number',
        description: 'category id'
    })
    category: ICategory;

    @ApiProperty({ type: 'file', isArray: true, required: false })
    images: string[];
}

export class RemoveStaticImageDTO {
    @ApiProperty()
    productId: string;

    @ApiProperty({ description: 'file url' })
    fileSrc: string;
}
