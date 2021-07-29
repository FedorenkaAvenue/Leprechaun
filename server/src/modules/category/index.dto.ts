import { ApiProperty } from "@nestjs/swagger";

import { ICategory } from "./interface";

export class CreateCategoryDTO implements ICategory {
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    url: string;
}
