import { ApiProperty } from "@nestjs/swagger";
import { IProduct } from "./index.interface";

export class CreateProductDTO implements IProduct {
    @ApiProperty({ required: true })
    title: string;

    @ApiProperty({ required: true })
    price: number;

    @ApiProperty({ required: true })
    categoryId: number;
    
    // labels: Array<IProductLabel> | null;
    // properties: Array<IProductProperty>;
    // images: Array<string>;
}
