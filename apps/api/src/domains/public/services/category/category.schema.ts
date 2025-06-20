import { ApiProperty } from "@nestjs/swagger";

import { CategoryPreviewPublic } from "@gen/_category_preview";

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
