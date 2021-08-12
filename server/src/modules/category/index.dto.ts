import { ApiProperty } from "@nestjs/swagger";

import { ICategory } from "./index.interface";

export class CreateCategoryDTO implements ICategory {
    @ApiProperty()
    url: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({ required: false })
    icon: string;
}

export class UpdateCategoryDTO implements ICategory {
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: false })
    url: string;

    @ApiProperty({ required: false })
    title: string;

    @ApiProperty({ required: false })
    isPublic: boolean;

    @ApiProperty({ required: false })
    icon: string;
}
