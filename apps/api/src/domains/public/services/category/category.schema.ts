import { ApiProperty } from "@nestjs/swagger";

import { CategoryPreviewPublic } from "@gen/_category_preview";
import { CategoryPublic } from "@gen/category";

export class CategoryPreviewPublicSchema implements CategoryPreviewPublic {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    icon?: string;
}

export class CategoryPublicSchema implements CategoryPublic {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    icon: string;
}
