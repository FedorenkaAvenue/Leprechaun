import { CategoryI } from '@interfaces/Category';
import { CategoryPublicDTO, CreateCategoryDTO } from '.';

export class Category extends CreateCategoryDTO {
    constructor({ url, title, is_public, propertygroups, comment }: CreateCategoryDTO) {
        super();
        this.url = url;
        this.title = title;
        this.is_public = is_public;
        this.comment = comment || null;
        // @ts-ignore for table relations
        this.propertygroups = propertygroups ? propertygroups.map(groupId => ({ id: Number(groupId) })) : null;
    }
}

export class CategoryPublic extends CategoryPublicDTO {
    constructor({ id, title, url, icon }: CategoryI) {
        super();
        this.id = id;
        this.title = title;
        this.url = url;
        this.icon = icon;
    }
}
