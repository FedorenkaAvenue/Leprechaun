import { ApiProperty } from "@nestjs/swagger";
import { ICategory } from "./index.interface";

export class CreateCategoryDTO implements ICategory {
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    url: string;

    @ApiProperty({ required: false })
    icon: string;

    @ApiProperty({ required: false })
    parentCategoryId: number;

    @ApiProperty({ required: false })
    children: string;
}
