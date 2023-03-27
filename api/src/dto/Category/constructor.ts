import { ApiProperty } from '@nestjs/swagger';

import { CategoryI, CategoryPublicI } from '@interfaces/Category';
import { CreateCategoryDTO } from '.';
import { QueriesCommon } from '@dto/Queries/constructor';

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
