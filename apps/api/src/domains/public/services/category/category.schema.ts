import { ApiProperty } from "@nestjs/swagger";
import { CategoryPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/_category_preview";
import { CategoryPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/category";

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
