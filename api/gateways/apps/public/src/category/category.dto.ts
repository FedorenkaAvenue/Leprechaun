import { ApiProperty } from '@nestjs/swagger';

import { CategoryPublicI } from './category.interface';
import { CategoryI } from '@core/category/category.interface';
import { QueriesCommonI } from '@core/queries/queries.interface';

export class CategoryPublic implements CategoryPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    icon: string | null;

    constructor({ id, title, url, icon }: CategoryI, lang: QueriesCommonI['lang']) {
        this.id = id;
        this.title = title[lang];
        this.url = url;
        this.icon = icon;
    }
}
