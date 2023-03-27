import { ApiProperty } from '@nestjs/swagger';

import { CategoryI, CategoryPublicI, CategorySearchI } from '@interfaces/Category';
import { CreateCategoryDTO } from '.';
import { QueriesCommon, QueriesSearch } from '@dto/Queries/constructor';

export class Category extends CreateCategoryDTO {
    constructor({ url, title, is_public, propertygroups, comment }: CreateCategoryDTO) {
        super();
        this.url = url;
        this.title = title;
        this.is_public = is_public;
        this.comment = comment || null;
        // TODO
        // @ts-ignore for table relations
        this.propertygroups = propertygroups ? propertygroups.map(groupId => ({ id: Number(groupId) })) : null;
    }
}

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

export class CategorySearch implements CategorySearchI {
    @ApiProperty({ type: 'string' })
    url: CategoryI['url'];

    @ApiProperty({ type: 'string' })
    title: CategoryI['title'];

    @ApiProperty({ type: 'string' })
    icon: string;

    constructor({ url, title, icon }, lang: QueriesSearch['lang']) {
        this.url = url;
        this.title = title[lang];
        this.icon = icon;
    }
}
