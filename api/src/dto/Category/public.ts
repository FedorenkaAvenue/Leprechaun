import { ApiProperty } from '@nestjs/swagger';

import { CategoryI, CategoryPublicI } from '@interfaces/Category';
import { QueriesCommon } from '@dto/Queries/constructor';

export class CategoryPublic implements CategoryPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    icon: string;

    constructor({ id, title, url, icon }: CategoryI, lang: QueriesCommon['lang']) {
        this.id = id;
        this.title = title[lang];
        this.url = url;
        this.icon = icon;
    }
}
