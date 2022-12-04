import { PropertyGroupPublic } from '@dto/PropertyGroup/constructor';
import { PropertyEntity } from '@entities/Property';
import { CreatePropertyDTO, PropertyPublicDTO } from '.';

export class Property extends CreatePropertyDTO {
    constructor({ title, alt_name, comment, property_group }: CreatePropertyDTO) {
        super();
        this.property_group = property_group;
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}

export class PropertyPublic extends PropertyPublicDTO {
    constructor({ id, title, alt_name, property_group }: PropertyEntity) {
        super();
        this.id = id;
        this.title = title;
        this.alt_name = alt_name;
        this.property_group = new PropertyGroupPublic(property_group);
    }
}
