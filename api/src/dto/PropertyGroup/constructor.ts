import { CreatePropertyGroupDTO, PropertyGroupPublicDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

export class PropertyGroupPublic extends PropertyGroupPublicDTO {
    constructor({ id, title, alt_name }: PropertyGroupEntity) {
        super();
        this.id = id;
        this.title = title.en;
        this.alt_name = alt_name;
    }
}
