import { CreatePropertyGroupDTO, PropertyGroupPublicDTO } from '@dto/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

export class PropertyGroup extends CreatePropertyGroupDTO {
    constructor({ title, alt_name, comment, is_primary }: CreatePropertyGroupDTO) {
        super();
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
        this.is_primary = is_primary;
    }
}

export class PropertyGroupPublic extends PropertyGroupPublicDTO {
    constructor({ id, title, alt_name }: PropertyGroupEntity) {
        super();
        this.id = id;
        this.title = title;
        this.alt_name = alt_name;
    }
}
