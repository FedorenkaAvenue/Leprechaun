import { PropertyGroupPublicDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import { QueriesProductT } from '@interfaces/Queries';

export class PropertyGroupPublic extends PropertyGroupPublicDTO {
    constructor({ id, title, alt_name }: PropertyGroupEntity, { lang }: QueriesProductT) {
        super();
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}
