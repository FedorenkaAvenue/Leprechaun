import { PropertyGroupPublicDTO } from '@dto/PropertyGroup';
import { QueriesCommon } from '@dto/Queries/constructor';
import { PropertyGroupEntity } from '@entities/PropertGroup';

export class PropertyGroupPublic extends PropertyGroupPublicDTO {
    constructor({ id, title, alt_name }: PropertyGroupEntity, { lang }: QueriesCommon) {
        super();
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}
